import { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';
import { AppError } from './errorHandler';
import { logger } from '../utils/logger';

// Validation schemas
const schemas = {
  // Chat message schema
  chat: z.object({
    body: z.object({
      message: z.object({
        content: z.string().min(1),
      }),
      conversationId: z.string().optional(),
    }),
  }),

  // Conversation details schema
  conversationDetails: z.object({
    params: z.object({
      conversationId: z.string(),
    }),
  }),

  // Delete conversation schema
  deleteConversation: z.object({
    params: z.object({
      conversationId: z.string(),
    }),
  }),
};

// Validation middleware
export const validate = (schema: keyof typeof schemas | AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationSchema = typeof schema === 'string' ? schemas[schema] : schema;
      await validationSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error:', {
          path: req.path,
          method: req.method,
          body: req.body,
          errors: error.errors,
        });
        next(new AppError(400, 'Validation error', 'VALIDATION_ERROR'));
      } else {
        next(error);
      }
    }
  };
}; 