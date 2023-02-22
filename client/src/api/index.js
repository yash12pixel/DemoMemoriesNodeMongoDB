import axios from "axios";

const url_user = "http://localhost:5000/user";
const url_post = "http://localhost:5000/posts";

const token = localStorage.getItem("token");

export const signup = (newUser) => axios.post(`${url_user}/register`, newUser);
export const verifyOtp = (otpCode) =>
  axios.post(`${url_user}/verifyOtp`, otpCode);
export const resendOtp = (otpCode) =>
  axios.post(`${url_user}/resendOtp`, otpCode);
export const login = (userData) => axios.post(`${url_user}/login`, userData);

export const fetchPosts = () => axios.get(`${url_post}/getPosts`);
export const createPost = (newPost) =>
  axios.post(
    `${url_post}/createPost`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
    newPost
  );
export const likePost = (id) => axios.patch(`${url_post}/likePost/${id}`);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url_post}/updatePost/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url_post}/deletePost/${id}`);
