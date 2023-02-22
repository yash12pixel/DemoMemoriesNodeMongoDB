const validationResult = require("express-validator");
const errorResponse = require("../responses/response");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = errors.array().map((err) => {
      return { message: err.msg, field: err.param };
    });
    return errorResponse(res, error[0].message, 400);
  }
  next();
};

module.exports = validateRequest;
