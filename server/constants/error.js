const ErrorMessages = {
  COMMON_VALIDATION_ERROR: {
    MISSING: (value) => `${value} is missing`,
    KEY_MISSING: (key) => `${key} key is missing`,
    EMPTY_VALUE: (value) => `${value} cannot be empty`,
    VALUE_MUST_BE_STRING: (value) => `The ${value} must be of type string`,
    USER_NOT_FOUND: (value) => `We didn't find any user against these ${value}`,
    ID_NOT_VALID_MONGO_KEY: (key) => `${key} Id not valid key.`,
  },
  AUTH: {
    VALIDATION_FAILED: (value) => `${value} is not valid`,
    INVALID_USERNAME: (value) =>
      `The ${value} is not valid. Username must start with a letter and end with a letter or number and only letter, number, and special character @_-. are allowed`,
    INVALID_PASSWORD: (value) =>
      `Please choose a more secure password. ${value} must be greater than 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character`,
    VALUE_ALREADY_EXIST: (field, value) =>
      `The ${field}: ${value} has already been taken. Please try different ${field}`,
    NETOWRK_PROBLEM_ERROR: `We are facing some network problems to send email.`,
    INVALID_OTP_TOKEN: (min, max) => `Token must be ${max} character long.`,
    INVALID_OTP:
      "The number that you've entered doesn't match your code. Please try again.",
    INVALID_ID: (id) =>
      `The id: ${id} that you've entered is invalid. Please try again.`,
    OTP_CODE_EXPIRED:
      "Your OTP code has been expired. Click on send again to get new code",
    ALREADY_VERIFY: "Your account is already verified",
    ACCOUNT_NOT_FOUND: (value, value1) =>
      `Couldn’t find any account associated with ${value}:${value1.toLowerCase()}`,
    LOGIN_FAIL_MESSAGE:
      " Your account is not verified yet, please verify your account first",
    PASSWORD_NOT_MATCH: `The password and confirm password do not match.Please try again.`,
    WRONG_OLD_PASSWORD: "You entered the wrong old password",
  },
  GENERIC_ERROR: {
    OPERATION_FAIL: (operationName, error) =>
      `${operationName} operation fail.We are facing some internal server issues.Please try again later.${
        error ? error : ""
      }`,
  },
};

module.exports = ErrorMessages;
