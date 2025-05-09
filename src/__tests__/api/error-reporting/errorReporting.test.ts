import { errorReportingController } from '../../../api/error-reporting/errorReporting.controller';
import { mockRequest, mockResponse, mockNext, expectSuccessResponse, expectErrorResponse } from '../../utils/testUtils';
import { Request } from 'express';

describe('Error Reporting Controller', () => {
  describe('reportError', () => {
    it('should report an error successfully', async () => {
      const req = mockRequest({
        message: 'Test error message',
        stack: 'Error stack trace',
        info: { component: 'test-component' },
        errorCode: 'TEST_ERROR',
        context: { userId: '123' },
        timestamp: new Date().toISOString(),
        severity: 'error',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await errorReportingController.reportError(req, res, next);

      expectSuccessResponse(res, null, 'Error reported successfully', 202);
    });

    it('should handle missing required fields', async () => {
      const req = mockRequest({
        message: '',
        timestamp: '',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await errorReportingController.reportError(req, res, next);

      expectErrorResponse(res, 'Message and timestamp are required', 400, 'VALIDATION_ERROR');
    });

    it('should handle invalid severity', async () => {
      const req = mockRequest({
        message: 'Test error message',
        timestamp: new Date().toISOString(),
        severity: 'invalid-severity',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await errorReportingController.reportError(req, res, next);

      expectErrorResponse(res, 'Invalid severity level', 400, 'VALIDATION_ERROR');
    });

    it('should handle invalid timestamp format', async () => {
      const req = mockRequest({
        message: 'Test error message',
        timestamp: 'invalid-timestamp',
        severity: 'error',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await errorReportingController.reportError(req, res, next);

      expectErrorResponse(res, 'Invalid timestamp format', 400, 'VALIDATION_ERROR');
    });
  });
}); 