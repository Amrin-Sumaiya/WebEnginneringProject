// This function takes another function (a controller) as an argument.
// It returns a new function that executes the original controller
// and chains a .catch() to it, passing any errors to next().
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };