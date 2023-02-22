const { body, query, check } = require("express-validator");
// const query = require("express-validator");
const ErrorMessages = require("../constants/error");
const constant = require("../constants/constant");

const registerUserValidation = () => [
  body("firstname")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("firstname"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("firstname"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("firstname")
    ),

  body("lastname")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("lastname"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("lastname"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("lastname")
    ),

  body("email")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("email"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("email"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("email")
    )
    .bail()
    .custom((value) => validateEmail(value))
    .withMessage(ErrorMessages.AUTH.VALIDATION_FAILED("Email")),

  body("password")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("password"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("password"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("password")
    )
    .bail()
    .custom((value) => validatePassword(value))
    .withMessage(ErrorMessages.AUTH.INVALID_PASSWORD("password")),
];

const otpVerificationValidation = () => [
  body("otpCode")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("otpCode"))
    .bail()
    .isLength({
      min: constant.otpTokenLength.minLength,
      max: constant.otpTokenLength.maxLength,
    })
    .withMessage(
      ErrorMessages.AUTH.INVALID_OTP_TOKEN(
        constant.otpTokenLength.minLength,
        constant.otpTokenLength.maxLength
      )
    ),

  body("authValue")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("authValue"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("authValue"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("authValue")
    ),
];

const resendOtpVerificationValidation = () => [
  body("authValue")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("authValue"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("authValue"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("authValue")
    ),
];

const loginUserValidation = () => [
  body("email")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("email"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("email"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("email")
    )
    .bail()
    .custom((value) => validateEmail(value))
    .withMessage(ErrorMessages.AUTH.VALIDATION_FAILED("Email")),

  body("password")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("password"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("password"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("password")
    ),
];

const validatePassword = (password) => {
  //const re = /^(?!.*[_\s-]{2,})[a-zA-Z0-9][a-zA-Z0-9_\-]*[a-zA-Z0-9]$/
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,}$/;
  return re.test(String(password));
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const emailValidation = () => [
  body("email")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("email"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("email"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("email")
    )
    .bail()
    .custom((value) => validateEmail(value))
    .withMessage(ErrorMessages.AUTH.VALIDATION_FAILED("email")),
];

const updatePasswordValidation = () => [
  body("password")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("password"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("password"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("password")
    )
    .bail()
    .custom((value) => validatePassword(value))
    .withMessage(ErrorMessages.AUTH.INVALID_PASSWORD("Password")),

  body("confirmPassword")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("password"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("password"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("password")
    ),

  body("otpCode")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("otpCode"))
    .bail()
    .isLength({
      min: constant.otpTokenLength.minLength,
      max: constant.otpTokenLength.maxLength,
    })
    .withMessage(
      ErrorMessages.AUTH.INVALID_OTP_TOKEN(
        constant.otpTokenLength.minLength,
        constant.otpTokenLength.maxLength
      )
    ),
];

const otpVerificationValidationOnProfile = () => [
  body("otpCode")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("otpCode"))
    .bail()
    .isLength({
      min: constant.otpTokenLength.minLength,
      max: constant.otpTokenLength.maxLength,
    })
    .withMessage(
      ErrorMessages.AUTH.INVALID_OTP_TOKEN(
        constant.otpTokenLength.minLength,
        constant.otpTokenLength.maxLength
      )
    ),

  body("authValue")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("authValue"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("authValue"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("authValue")
    )
    .bail()
    .custom((value) => validateEmail(value))
    .withMessage(ErrorMessages.AUTH.VALIDATION_FAILED("authValue")),
];

const updatePasswordValidationOnProfile = () => [
  body("password")
    .exists()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("password"))
    .bail()
    .not()
    .isEmpty()
    .withMessage(ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("password"))
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("password")
    )
    .bail()
    .custom((value) => validatePassword(value))
    .withMessage(ErrorMessages.AUTH.INVALID_PASSWORD("Password")),

  body("confirmPassword")
    .exists()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("confirmPassword")
    )
    .bail()
    .not()
    .isEmpty()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("confirmPassword")
    )
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING(
        "confirmPassword"
      )
    ),

  body("oldPassword")
    .exists()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.KEY_MISSING("oldPassword")
    )
    .bail()
    .not()
    .isEmpty()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.EMPTY_VALUE("oldPassword")
    )
    .bail()
    .isString()
    .withMessage(
      ErrorMessages.COMMON_VALIDATION_ERROR.VALUE_MUST_BE_STRING("oldPassword")
    ),
];

module.exports = {
  registerUserValidation,
  otpVerificationValidation,
  resendOtpVerificationValidation,
  loginUserValidation,
  emailValidation,
  updatePasswordValidation,
  otpVerificationValidationOnProfile,
  updatePasswordValidationOnProfile,
};
