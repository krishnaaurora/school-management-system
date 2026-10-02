import { ApiResponse } from '../utils/apiResponse.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error Handler] ${req.method} ${req.url} -> [${statusCode}] ${message}`);
  if (process.env.NODE_ENV === 'development' && statusCode === 500) {
    console.error(err.stack);
  }

  return ApiResponse.error(res, message, statusCode, err.details || null);
};
