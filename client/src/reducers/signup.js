import {
  SIGNUP_API_REQUEST,
  SIGNUP_SUCCESS_RESPONSE,
  SIGNUP_FAILURE_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  message: "",
  loading: false,
  disable: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_API_REQUEST:
      return {
        ...state,
        isWarning: false,
        message: "",
        loading: true,
        disable: true,
      };
    case SIGNUP_SUCCESS_RESPONSE:
      return {
        ...state,
        loading: false,
        disable: false,
        isWarning: false,
        message: action.payload,
      };
    case SIGNUP_FAILURE_RESPONSE:
      return {
        ...state,
        loading: false,
        disable: false,
        isWarning: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
