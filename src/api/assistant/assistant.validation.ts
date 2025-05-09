import { z } from 'zod';

// Request body for sending a message
export const sendMessageSchema = z.object({
  conversationId: z.string().optional(),
  message: z.object({
    content: z.string().min(1, 'Message content is required'),
  }),
});

// Path parameters for conversation operations
export const conversationIdSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required'),
}); 