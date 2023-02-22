import {
  VERIFY_OTP_API_REQUEST,
  VERIFY_OTP_SUCCESS_RESPONSE,
  VERIFY_OTP_FAILURE_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  message: "",
  loading: false,
  disable: false,
};

const verifyOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_API_REQUEST:
      return {
        ...state,
        isWarning: false,
        loading: true,
        disable: true,
        message: "",
      };
    case VERIFY_OTP_SUCCESS_RESPONSE:
      return {
        ...state,
        isWarning: false,
        loading: false,
        disable: false,
        message: action.payload,
      };
    case VERIFY_OTP_FAILURE_RESPONSE:
      return {
        ...state,
        isWarning: true,
        loading: false,
        disable: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default verifyOtpReducer;
