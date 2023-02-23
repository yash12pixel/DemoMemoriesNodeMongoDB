import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import ErrorMessageAlert from "../Alert/index";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });

  console.log("files::", postData.selectedFile);
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const postState = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: null,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPostData({ ...postData, selectedFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      postData.creator === "" ||
      postData.creator === null ||
      postData.creator === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Creator is missing",
      });
    } else if (
      postData.title === "" ||
      postData.title === null ||
      postData.title === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Title is missing",
      });
    } else if (
      postData.message === "" ||
      postData.message === null ||
      postData.message === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Message is missing",
      });
    } else if (
      postData.tags === "" ||
      postData.tags === null ||
      postData.tags === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Tags is missing",
      });
    } else if (
      postData.selectedFile === "" ||
      postData.selectedFile === null ||
      postData.selectedFile === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Image file is missing",
      });
    } else {
      if (currentId === 0) {
        const formData = new FormData();
        // console.log(("postsData:", formData));
        dispatch(createPost(formData, postData));
        setValidatedObject({
          ...validatedObject,
          isWarning: false,
          message: "",
        });
        clear();
      } else {
        const formData = new FormData();

        dispatch(updatePost(currentId, formData, postData));
        clear();
      }
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        {validatedObject.isWarning && (
          <ErrorMessageAlert
            message={validatedObject.message}></ErrorMessageAlert>
        )}
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          placeholder="Enter Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        {/* <div className={classes.fileInput}> */}
        {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          /> */}
        <Input
          type="file"
          id="file"
          onChange={handleFileChange}
          style={{ margin: "5px 20px 8px 0" }}
        />
        {/* </div> */}
        <Button
          disabled={postState.loading}
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ margin: "8px 0 0 0" }}
          fullWidth>
          {currentId ? "Update" : "Submit"}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="medium"
          style={{ margin: "10px 0 0 0" }}
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
