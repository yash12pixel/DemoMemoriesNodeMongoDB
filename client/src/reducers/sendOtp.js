import {
  SEND_OTP_API_REQUEST,
  SEND_OTP_SUCCESS_RESPONSE,
  SEND_OTP_FAILURE_RESPONSE,
} from "../constants/actionTypes";

const initialState = {
  isWarning: false,
  message: "",
  loading: false,
  disable: false,
};

const sendOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_API_REQUEST:
      return {
        ...state,
        isWarning: false,
        message: "",
        loading: true,
        disable: true,
      };
    case SEND_OTP_SUCCESS_RESPONSE:
      return {
        ...state,
        isWarning: false,
        message: action.payload,
        loading: false,
        disable: false,
      };
    case SEND_OTP_FAILURE_RESPONSE:
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

export default sendOtpReducer;
