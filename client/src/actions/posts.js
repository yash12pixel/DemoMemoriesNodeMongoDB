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
import { apiClient } from "../utils/request";

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

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_API_REQUEST,
      payload: {},
    });

    const { data } = await apiClient
      .post("/posts/createPost", postData)
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

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POST_API_REQUEST,
      payload: {},
    });
    // console.log("id::", id);
    const { data } = await apiClient
      .patch(`/posts/updatePost/${id}`, post)
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

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST_API_REQUEST,
      payload: {},
    });
    const { data } = await apiClient
      .delete(`/posts/deletePost/${id}`)
      .then((response) => {
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
