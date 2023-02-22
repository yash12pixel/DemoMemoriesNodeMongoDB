import {
  RESEND_OTP_API_REQUEST,
  RESEND_OTP_SUCCESS_RESPONSE,
  RESEND_OTP_FAILURE_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  message: false,
  loading: false,
  disable: false,
};

const resendOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESEND_OTP_API_REQUEST:
      return {
        ...state,
        isWarning: false,
        message: "",
        loading: true,
        disable: true,
      };
    case RESEND_OTP_SUCCESS_RESPONSE:
      return {
        ...state,
        isWarning: false,
        message: action.payload,
        loading: false,
        disable: false,
      };
    case RESEND_OTP_FAILURE_RESPONSE:
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

export default resendOtpReducer;
