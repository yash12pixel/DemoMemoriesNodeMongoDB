import {
  FETCH_ALL_POST_API_REQUEST,
  FETCH_ALL_POST_SUCCESS_RESPONSE,
  FETCH_ALL_POST_FAILURE_RESPONSE,
  CREATE_POST_API_REQUEST,
  CREATE_POST_SUCCESS_RESPONSE,
  CREATE_POST_FAILURE_RESPONSE,
  DELETE_POST_API_REQUEST,
  DELETE_POST_FAILURE_RESPONSE,
  DELETE_POST_SUCCESS_RESPONSE,
  UPDATE_POST_API_REQUEST,
  UPDATE_POST_SUCCESS_RESPONSE,
  UPDATE_POST_FAILURE_RESPONSE,
  // LIKE_POST_API_REQUEST,
  LIKE_POST_FAILURE_RESPONSE,
  LIKE_POST_SUCCESS_RESPONSE,
} from "../constants/actionTypes";
import { apiClient, apiClientPost } from "../utils/request";

// import * as api from "../api/index.js";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_POST_API_REQUEST });

    const { data } = await apiClient
      .get("/posts/getPostsByUser")
      .then((response) => {
        return response;
      });
    // console.log("data_get:::", data.data.post.posts);
    dispatch({
      type: FETCH_ALL_POST_SUCCESS_RESPONSE,
      payload: data.data.post.posts,
    });
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: FETCH_ALL_POST_FAILURE_RESPONSE,
      payload: error.message,
    });
  }
};

export const createPost = (postsData, postData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_API_REQUEST,
      payload: {},
    });

    postsData.append("file", postData.selectedFile);
    postsData.append("creator", postData.creator);
    postsData.append("message", postData.message);
    postsData.append("tags", postData.tags);
    postsData.append("title", postData.title);

    const { data } = await apiClientPost
      .post("/posts/createPost", postsData)
      .then((response) => {
        return response;
      });
    // console.log("data_create:::", data);
    dispatch({ type: CREATE_POST_SUCCESS_RESPONSE, payload: data.data.user });
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: CREATE_POST_FAILURE_RESPONSE,
      payload: error.message,
    });
  }
};

export const updatePost = (id, postsData, postData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POST_API_REQUEST,
      payload: {},
    });
    if (postData.selectedFile) {
      postsData.append("file", postData.selectedFile);
    }
    if (postData.creator) {
      postsData.append("creator", postData.creator);
    }
    if (postData.message) {
      postsData.append("message", postData.message);
    }
    if (postData.tags) {
      postsData.append("tags", postData.tags);
    }
    if (postData.title) {
      postsData.append("title", postData.title);
    }
    // console.log("id::", id);
    const { data } = await apiClient
      .patch(`/posts/updatePost/${id}`, postsData)
      .then((response) => {
        return response;
      });
    // console.log("data update::", data.data.post);
    dispatch({ type: UPDATE_POST_SUCCESS_RESPONSE, payload: data.data.post });
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: UPDATE_POST_FAILURE_RESPONSE,
      payload: error.message,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // dispatch({
    //   type: LIKE_POST_API_REQUEST,
    //   payload: {},
    // });
    const { data } = await apiClient
      .patch(`/posts/likePost/${id}`)
      .then((response) => {
        return response;
      });
    // console.log("data like::", data.data.post);

    dispatch({ type: LIKE_POST_SUCCESS_RESPONSE, payload: data.data.post });
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: LIKE_POST_FAILURE_RESPONSE,
      payload: error.message,
    });
  }
};

export const deletePost = (id, post) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST_API_REQUEST,
      payload: {},
    });
    console.log("publicid::", post.selectedFile.public_id);
    const public_id = post.selectedFile.public_id;
    const { data } = await apiClient
      .delete(`/posts/deletePost/${id}`, public_id)
      .then((response) => {
        console.log("response:::", response);
        return response;
      });
    // console.log("data dele::", data.data.user.posts);
    dispatch({
      type: DELETE_POST_SUCCESS_RESPONSE,
      payload: data.data.user.posts,
    });
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: DELETE_POST_FAILURE_RESPONSE,
      payload: error.message,
    });
  }
};
