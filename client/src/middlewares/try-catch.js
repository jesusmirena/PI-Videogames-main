const tryCatch = (errorHandler) => () => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    return errorHandler(error);
  }
};
export default tryCatch;
