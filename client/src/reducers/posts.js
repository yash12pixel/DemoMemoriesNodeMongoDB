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
  LIKE_POST_API_REQUEST,
  LIKE_POST_FAILURE_RESPONSE,
  LIKE_POST_SUCCESS_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  posts: [],
  loading: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_POST_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_POST_SUCCESS_RESPONSE:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        message: "Posts fetch successfully",
      };
    case FETCH_ALL_POST_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        loading: false,
        message: action.payload,
      };
    case LIKE_POST_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST_SUCCESS_RESPONSE:
      return {
        ...state,
        // isWarning: false,
        // loading: false,
        posts: state.posts.map((post) => {
          // console.log("postid::", post.id);
          // console.log("payloadid::", action.payload.id);
          return post._id === action.payload._id ? action.payload : post;
        }),
        message: "Like count updated",
      };
    case LIKE_POST_FAILURE_RESPONSE:
      return {
        ...state,

        message: action.payload,
      };
    case CREATE_POST_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POST_SUCCESS_RESPONSE:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
        message: "Post created successfully",
      };
    case CREATE_POST_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        loading: false,
        message: action.payload,
      };
    case UPDATE_POST_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_POST_SUCCESS_RESPONSE:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case UPDATE_POST_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        loading: false,
        message: action.payload,
      };
    case DELETE_POST_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_SUCCESS_RESPONSE:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case DELETE_POST_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
