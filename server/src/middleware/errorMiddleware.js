/**
 * 404 handler — runs when no route matched.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Centralised error handler. Returns a clean JSON error to the client.
 * Stack traces are logged on the server but never sent to the frontend.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong on our side.';

  // Mongoose: bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier.';
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // MongoDB: duplicate key (e.g. duplicate email)
  if (err.code === 11000) {
    statusCode = 409;
    message = 'A record with these details already exists.';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('🔥  Error:', err);
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = { notFound, errorHandler };
