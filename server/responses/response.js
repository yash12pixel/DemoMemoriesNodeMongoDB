const responseWithData = (res, status, message, data, statusCode) => {
  return res.status(statusCode).json({
    Success: status,
    message: message,
    data: data,
  });
};

const successResponse = (res, message, statusCode) => {
  res.status(statusCode).json({
    Success: true,
    message: message,
  });
};

const errorResponse = (res, message, statusCode) => {
  res.status(statusCode).json({
    Success: false,
    error: message,
  });
};

module.exports = {
  responseWithData: responseWithData,
  successResponse: successResponse,
  errorResponse: errorResponse,
};
