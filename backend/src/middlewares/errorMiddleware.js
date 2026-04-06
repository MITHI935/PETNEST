/**
 * Global error handling middleware for formatting and sending consistent error responses.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';
  const errors = err.errors || undefined;

  // Log the error for debugging
  console.error(`[Error] ${req.method} ${req.url}: ${message}`, {
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    errors,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    errors,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
