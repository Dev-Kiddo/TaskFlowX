export const asyncHandler = function (handlerFn) {
  return function (req, res, next) {
    Promise.resolve(handlerFn(req, res, next)).catch(next);
  };
};
