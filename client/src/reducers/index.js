import { combineReducers } from "redux";

import posts from "./posts";
import signupReducer from "./signup";
import loginReducer from "./login";
import verifyOtpReducer from "./verifyOtp";
import sendOtpReducer from "./sendOtp";
import resendOtpReducer from "./resendOtp";

import updatePasswordReducer from "./updatePassword";

const rootReducer = combineReducers({
  posts,
  signupReducer,
  loginReducer,
  verifyOtpReducer,
  sendOtpReducer,
  resendOtpReducer,
  updatePasswordReducer,
});

export default rootReducer;
