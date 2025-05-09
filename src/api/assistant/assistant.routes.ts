import { Router } from 'express';
import { assistantController } from './assistant.controller';
import { validate } from '../../middlewares/validation.middleware';

const router = Router();

// Chat endpoints
router.post('/chat', validate('chat'), assistantController.sendMessage);

// Conversation endpoints
router.get('/conversations', assistantController.getConversationSummaries);
router.get('/conversations/:conversationId', validate('conversationDetails'), assistantController.getConversationDetails);
router.delete('/conversations/:conversationId', validate('deleteConversation'), assistantController.deleteConversation);

export default router; 