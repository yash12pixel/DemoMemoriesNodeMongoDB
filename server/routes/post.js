const express = require("express");
const mongoose = require("mongoose");
const PostMessage = require("../models/postMessage");
const User = require("../models/user");
const passport = require("passport");
require("../utils/passport")(passport);
const dotenv = require("dotenv");
dotenv.config();
const ErrorMessages = require("../constants/error");
const SuccessMessages = require("../constants/messages");
const {
  successResponse,
  errorResponse,
  responseWithData,
} = require("../responses/response");
const { session } = require("passport");
const cloudinary = require("cloudinary");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// SET STORAGE
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// file type validation
const fileType = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/jpeg") ||
    file.mimetype.startsWith("image/png")
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type should be pdf/jpeg/png and 25MB only!"));
  }
};

const upload = multer({
  storage,
  fileFilter: fileType,
  limits: { fileSize: 3200000 },
});
const uploader = async (path) =>
  await cloudinary.uploader.upload(path, "memories");

router.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  async (req, res) => {
    let id = req.user._id;

    const { title, message, creator, tags } = req.body;
    let url;
    const files = req.file;
    // console.log("file", files);
    // console.log("boddyy::", req.body);
    try {
      if (!creator) {
        return errorResponse(
          res,
          ErrorMessages.COMMON_VALIDATION_ERROR.MISSING("Creator"),
          400
        );
      } else if (!title) {
        return errorResponse(
          res,
          ErrorMessages.COMMON_VALIDATION_ERROR.MISSING("Title"),
          400
        );
      } else if (!message) {
        return errorResponse(
          res,
          ErrorMessages.COMMON_VALIDATION_ERROR.MISSING("Message"),
          400
        );
      } else if (!tags) {
        return errorResponse(
          res,
          ErrorMessages.COMMON_VALIDATION_ERROR.MISSING("Tags"),
          400
        );
      } else if (!files) {
        return errorResponse(
          res,
          ErrorMessages.COMMON_VALIDATION_ERROR.MISSING("Image-File"),
          400
        );
      } else {
        if (files) {
          const { path } = files;
          const newPath = await uploader(path);
          url = {
            public_id: newPath.public_id,
            asset_id: newPath.asset_id,
            version_id: newPath.version_id,
            width: newPath.width,
            height: newPath.height,
            format: newPath.format,
            original_filename: newPath.original_filename,
            url: newPath.url,
          };
          // console.log("urls::", url);
          fs.unlinkSync(path);

          try {
            const postMessage = await PostMessage.create({
              title: title,
              message: message,
              selectedFile: url,
              creator: creator,
              tags: tags,
              user: id,
            });
            // console.log("postmessages::", postMessage);
            await postMessage.save();

            await User.findByIdAndUpdate(
              { _id: id },
              { $push: { posts: postMessage._id } },
              { new: true }
            );
            return responseWithData(
              res,
              true,

              SuccessMessages.POST.POST_CREATED_SUCCESSFULLY,
              { user: postMessage },
              200
            );
            // res.status(201).json(newPostMessage);
          } catch (error) {
            console.log("Error in create post", error);

            return errorResponse(
              res,
              ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
                "Error For Create Post",
                error?.message
              ),
              500
            );
          }
        } else {
          return errorResponse(res, "Please attach file", 400);
        }
      }
    } catch (error) {
      console.log("error===========", error);
      return errorResponse(
        res,
        ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
          "Failed to register",
          error?.message
        ),
        400
      );
    }
    // console.log("file::", files);
  }
);

router.patch(
  "/updatePost/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    // console.log("update_ID::", id);
    const { title, message, creator, tags } = req.body;
    const isPost = await PostMessage.findOne({ _id: id });
    let url;
    const files = req.file;
    console.log("files:::", files);
    console.log("body:::", req.body);
    if (!isPost) {
      return errorResponse(res, ErrorMessages.AUTH.INVALID_ID(id), 404);
    }

    if (files) {
      const post_public_id = isPost?.selectedFile.public_id;
      const delCloud = await cloudinary.v2.uploader.destroy(
        post_public_id,
        (error, result) => {
          console.log("result update---", result);

          if (error) {
            console.log("error delete file on cloud while update---", error);
            return errorResponse(res, "error while deleting file!", 400);
          }
        }
      );
      if (delCloud.result === "not found") {
        return errorResponse(res, "File not found/Already deleted", 400);
      }
      const { path } = files;
      const newPath = await uploader(path);
      url = {
        public_id: newPath.public_id,
        asset_id: newPath.asset_id,
        version_id: newPath.version_id,
        width: newPath.width,
        height: newPath.height,
        format: newPath.format,
        original_filename: newPath.original_filename,
        url: newPath.url,
      };
      // console.log("urls::", url);
      fs.unlinkSync(path);
      try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              title: title,
              creator: creator,
              message: message,
              tags: tags,
              selectedFile: url,
            },
          },
          { new: true }
        );

        return responseWithData(
          res,
          true,
          SuccessMessages.POST.POST_UPDATED_SUCCESSFULLY,
          { post: updatedPost },
          200
        );
      } catch (error) {
        return errorResponse(
          res,
          ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
            "Post Update",
            error?.message
          ),
          500
        );
      }
    } else {
      try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              title: title,
              creator: creator,
              message: message,
              tags: tags,
              selectedFile: isPost.selectedFile,
            },
          },
          { new: true }
        );

        return responseWithData(
          res,
          true,
          SuccessMessages.POST.POST_UPDATED_SUCCESSFULLY,
          { post: updatedPost },
          200
        );
      } catch (error) {
        return errorResponse(
          res,
          ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
            "Post Update",
            error?.message
          ),
          500
        );
      }
    }

    // const updatedPost = {
    //   ...req.body,
    //   creator,
    //   title,
    //   message,
    //   tags,
    //   selectedFile,
    //   _id: id,
    // };
  }
);

router.delete(
  "/deletePost/:post_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { post_id } = req.params;
    const { public_id } = req.body;
    let id = req.user._id;
    const isPost = await PostMessage.findById(post_id);

    const delCloud = await cloudinary.v2.uploader.destroy(
      isPost.selectedFile.public_id,
      (error, result) => {
        console.log("result---", result);

        if (error) {
          console.log("error delete file on cloud---", error);
          return errorResponse(res, "error while deleting file!", 400);
        }
      }
    );

    if (delCloud.result === "not found") {
      return errorResponse(res, "File not found/Already deleted", 400);
    }

    if (!isPost)
      return errorResponse(res, ErrorMessages.AUTH.INVALID_ID(id), 404);

    try {
      await PostMessage.findByIdAndDelete(post_id);
      const findUser = await User.findOne({ _id: id });
      const updatePosts = findUser.posts.filter((posts) => {
        return posts != post_id;
      });

      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { posts: updatePosts } }
      ).populate("posts");
      // res.status(201).json({ message: "Post deleted successfully." });
      return responseWithData(
        res,
        true,
        SuccessMessages.POST.POST_DELETED_SUCCESSFULLY,
        { user: updateUser },
        200
      );
    } catch (error) {
      // res.status(409).json({ message: error });
      return errorResponse(
        res,
        ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
          "Post Delete",
          error?.message
        ),
        500
      );
    }
  }
);

router.patch(
  "/likePost/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    const isPost = await PostMessage.findOne({ _id: id });

    if (!isPost) {
      return errorResponse(res, ErrorMessages.AUTH.INVALID_ID(id), 404);
    }

    // const post = await PostMessage.findById(id);

    try {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: isPost.likeCount + 1 },
        { new: true }
      );

      // res.status(201).json(updatedPost);
      return responseWithData(
        res,
        true,
        SuccessMessages.POST.POST_UPDATED_SUCCESSFULLY,
        { post: updatedPost },
        200
      );
    } catch (error) {
      return errorResponse(
        res,
        ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
          "Post Update like",
          error?.message
        ),
        500
      );
    }
  }
);

router.get(
  "/getPostsByUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let id = req.user._id;
      const userByPost = await User.findById(id).populate("posts");

      // const postMessages = await PostMessage.find();

      // res.status(200).json(postMessages);
      return responseWithData(
        res,
        true,
        SuccessMessages.POST.POST,
        { post: userByPost },
        200
      );
    } catch (error) {
      return errorResponse(
        res,
        ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
          "Post Fetch",
          error?.message
        ),
        500
      );
    }
  }
);

router.get(
  "/getPost/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      // const post = await PostMessage.findById(id);

      const isValidPostId = await PostMessage.findOne({ _id: id });

      if (!isValidPostId) {
        return errorResponse(res, ErrorMessages.AUTH.INVALID_ID(id), 404);
      }

      const post = await PostMessage.findById({ _id: id }).populate("user");

      // res.status(200).json(post);
      return responseWithData(
        res,
        true,
        SuccessMessages.POST.POST,
        {
          post: post,
        },
        200
      );
    } catch (error) {
      return errorResponse(
        res,
        ErrorMessages.GENERIC_ERROR.OPERATION_FAIL(
          "Post Detail",
          error?.message
        ),
        500
      );
    }
  }
);

module.exports = router;
