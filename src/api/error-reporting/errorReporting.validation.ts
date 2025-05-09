import { z } from 'zod';

// Request body for reporting an error
export const reportErrorSchema = z.object({
  message: z.string().min(1, 'Error message is required'),
  stack: z.string().optional(),
  info: z.record(z.unknown()).optional(),
  errorCode: z.string().optional(),
  context: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
  severity: z.enum(['error', 'warning', 'info']),
}); 