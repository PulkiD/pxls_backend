import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode: string = 'INTERNAL_SERVER_ERROR',
    public details: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Create structured error log
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    request: {
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      headers: {
        ...req.headers,
        authorization: req.headers.authorization ? '[REDACTED]' : undefined,
      },
    },
    response: {
      statusCode: err instanceof AppError ? err.statusCode : 500,
      errorCode: err instanceof AppError ? err.errorCode : 'INTERNAL_SERVER_ERROR',
    },
  };

  // Log the error with appropriate level
  if (err instanceof ZodError) {
    logger.warn('Validation error:', errorLog);
    ApiResponse.badRequest(
      res,
      'Validation error',
      'VALIDATION_ERROR',
      { errors: err.errors }
    );
    return;
  }

  if (err instanceof AppError) {
    logger.error('Application error:', errorLog);
    ApiResponse.error(
      res,
      err.message,
      err.statusCode,
      err.errorCode,
      err.details
    );
    return;
  }

  // Log unknown errors with full details
  logger.error('Unhandled error:', errorLog);
  ApiResponse.error(
    res,
    'Internal server error',
    500,
    'INTERNAL_SERVER_ERROR'
  );
}; 