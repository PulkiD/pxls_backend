export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string,
    public details: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
} 