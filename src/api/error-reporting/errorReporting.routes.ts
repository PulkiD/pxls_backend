import { Router } from 'express';
import { errorReportingController } from './errorReporting.controller';
import { validate } from '../../middlewares/validation.middleware';
import { reportErrorSchema } from './errorReporting.validation';

const router = Router();

// Report frontend error
router.post(
  '/report-error',
  validate(reportErrorSchema),
  errorReportingController.reportError
);

export default router; 