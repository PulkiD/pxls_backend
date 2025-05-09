import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errorCode = 'INTERNAL_SERVER_ERROR',
    details: Record<string, unknown> = {}
  ): Response {
    return res.status(statusCode).json({
      success: false,
      status: 'error',
      errorCode,
      message,
      details,
    });
  }

  static notFound(
    res: Response,
    message = 'Resource not found',
    errorCode = 'NOT_FOUND'
  ): Response {
    return this.error(res, message, 404, errorCode);
  }

  static badRequest(
    res: Response,
    message = 'Bad request',
    errorCode = 'BAD_REQUEST',
    details: Record<string, unknown> = {}
  ): Response {
    return this.error(res, message, 400, errorCode, details);
  }

  static unauthorized(
    res: Response,
    message = 'Unauthorized',
    errorCode = 'UNAUTHORIZED'
  ): Response {
    return this.error(res, message, 401, errorCode);
  }

  static forbidden(
    res: Response,
    message = 'Forbidden',
    errorCode = 'FORBIDDEN'
  ): Response {
    return this.error(res, message, 403, errorCode);
  }
} 