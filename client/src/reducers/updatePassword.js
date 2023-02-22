import {
  UPDATE_PASSWORD_API_REQUEST,
  UPDATE_PASSWORD_SUCCESS_RESPONSE,
  UPDATE_PASSWORD_FAILURE_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  message: "",
  loading: false,
  disable: false,
};

const updatePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_API_REQUEST:
      return {
        ...state,
        isWarning: false,
        message: "",
        loading: true,
        disable: true,
      };
    case UPDATE_PASSWORD_SUCCESS_RESPONSE:
      return {
        ...state,
        isWarning: false,
        message: action.payload,
        loading: false,
        disable: false,
      };
    case UPDATE_PASSWORD_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        message: action.payload,
        loading: false,
        disable: false,
      };
    default:
      return state;
  }
};

export default updatePasswordReducer;
