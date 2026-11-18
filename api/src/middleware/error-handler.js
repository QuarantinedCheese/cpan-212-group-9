import { HttpError } from '../utils/http-error.js';
import mongoose from 'mongoose';

// Error handler from week 3 materials for testing purposes

// Express knows this is an error handler because it takes four arguments.
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // express.json() sets type 'entity.parse.failed' when the body is not valid JSON.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: `Request body must be valid JSON (Recieved: ${req.body})` } });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = {};

    for (const field in err.errors) {
      details[field] = err.errors[field].message;
    }

    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details,
      },
    });
  }

  const status = err.status ?? 500;
  // An HttpError was thrown on purpose, so its message is safe to show. Any other 5xx error is a bug:
  // log the details for yourself, and never send the stack trace to the client.
  const expected = err instanceof HttpError || status < 500;
  if (!expected) {
    console.error(err);
  }
  res.status(status).json({
    error: {
      message: expected ? err.message : 'Internal server error',
      details: err.details,
    },
  });
}
