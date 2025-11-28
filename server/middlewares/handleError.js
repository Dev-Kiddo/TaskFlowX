import AppError from "../utils/AppError.js";

const handleCastError = function (err) {
  console.log("error from error handler:", err);

  return new AppError("Something Went Wrong!", 404);
};

export const handleError = function (err, req, res, next) {
  console.log("error from error handler:", err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "An error occured";

  let error = { ...err, message: err.message };

  if (err.name === "CastError") {
    error = handleCastError(err);
  }

  res.status(err.statusCode).json({
    success: false,
    message: error.message,
  });
};
