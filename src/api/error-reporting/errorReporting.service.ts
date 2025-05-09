import { AppError } from '../../utils/appError';
import { logger } from '../../utils/logger';
import { config } from '../../config';

export class ErrorReportingService {
  private static instance: ErrorReportingService;
  private useMockData: boolean;

  private constructor() {
    this.useMockData = config.useMockData;
    logger.info(`ErrorReportingService initialized with useMockData: ${this.useMockData}`);
  }

  public static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  async reportError(data: {
    message: string;
    stack?: string;
    info?: Record<string, unknown>;
    errorCode?: string;
    context?: Record<string, unknown>;
    timestamp: string;
    severity: 'error' | 'warning' | 'info';
  }) {
    if (!data.message || !data.timestamp) {
      throw new AppError('Message and timestamp are required', 400, 'VALIDATION_ERROR');
    }

    if (!['error', 'warning', 'info'].includes(data.severity)) {
      throw new AppError('Invalid severity level', 400, 'VALIDATION_ERROR');
    }

    try {
      new Date(data.timestamp);
    } catch {
      throw new AppError('Invalid timestamp format', 400, 'VALIDATION_ERROR');
    }

    // Log the error
    logger.error('Error reported:', {
      severity: data.severity,
      message: data.message,
      stack: data.stack,
      info: data.info,
      errorCode: data.errorCode,
      context: data.context,
      timestamp: data.timestamp,
    });

    if (this.useMockData) {
      return true;
    }

    // TODO: Implement actual error reporting logic (e.g., sending to error tracking service)
    throw new AppError('Error reporting not implemented', 501, 'NOT_IMPLEMENTED');
  }
} 