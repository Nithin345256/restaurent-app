// backend/middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const payload = {
    message: err.message || 'Internal Server Error',
    path: req.originalUrl,
    method: req.method,
  };
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  res.status(statusCode).json(payload);
};

export { errorHandler };