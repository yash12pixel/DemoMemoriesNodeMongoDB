const InfoMessages = {
  AUTH: {
    REGISTER_SUCCESSFULLY: (email) =>
      `Registered Successfully.We have sent the verification OTP code.Please check your Email:${email} and verify the otp code`,
    FOGET_PASSWORD_OTP_SEND_SUCCESSFULLY: (value) =>
      `We've sent you a otpCode in your ${value}.`,
    LOGIN_SUCCESS_MESSAGE: "Login Successfully",
    EMAIL_UPDATE_SUCCESSFULLY: (email) =>
      `Email updated Successfully.We have sent the verification OTP code.Please check your Email:${email} and verify the otp code`,
  },
  GENERIC: {
    ITEM_UPDATED_SUCCESSFULLY: (value) => `${value} updated successfully.`,
    ITEM_CREATED_SUCCESSFULLY: (key) => `${key} is created successfully.`,
    ITEM_GET_SUCCESSFULLY: (key) => `${key} get successfully.`,
    ITEM_DELETED_SUCCESSFULLY: (key) => `${key} deleted successfully.`,
    ITEM_SAVE_SUCCESSFULLY: (key) => `${key} saved successfully.`,
  },
  POST: {
    POST_CREATED_SUCCESSFULLY: "Post Created Successfully",
    POST_UPDATED_SUCCESSFULLY: "Post Updated Successfully",
    POST_DELETED_SUCCESSFULLY: "Post Deleted Successfully",
    POST: "All Post",
  },
  DRIVERMAIL: {
    EMAIL_SEND_SUCCESSFULLY: (email) =>
      `Email sent Successfully with attched tracking ID.`,
  },
};

module.exports = InfoMessages;
