import { Request, Response, NextFunction } from 'express';
import { ErrorReportingService } from './errorReporting.service';
import { logger } from '../../utils/logger';

const errorReportingService = ErrorReportingService.getInstance();

export const errorReportingController = {
  // Report frontend error
  async reportError(req: Request, res: Response, next: NextFunction) {
    try {
      await errorReportingService.reportError(req.body);
      res.status(202).json({
        success: true,
        message: 'Error reported successfully',
      });
    } catch (error) {
      next(error);
    }
  },
}; 