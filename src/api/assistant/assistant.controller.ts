import { Request, Response, NextFunction } from 'express';
import { AssistantService } from './assistant.service';
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/appError';

const assistantService = AssistantService.getInstance();

export const assistantController = {
  // Send message / Continue conversation
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message = req.body.message?.content;
      logger.info(`📨 Received message: "${message}"`);

      const result = await assistantService.sendMessage(
        message,
        req.body.conversationId
      );

      logger.info(`📤 Sending response: "${result.botResponse.content}"`);

      res.status(200).json({
        conversationId: result.conversationId,
        botResponse: {
          id: result.botResponse.id,
          content: result.botResponse.content,
          isUser: false,
          timestamp: result.botResponse.timestamp
        },
        graphData: result.graphData // Optional graph data
      });
    } catch (error) {
      const err = error as AppError;
      logger.error(`❌ Error in sendMessage: ${err.message}`);
      next(error);
    }
  },

  // Get conversation summaries
  async getConversationSummaries(req: Request, res: Response, next: NextFunction) {
    try {
      const summaries = await assistantService.getConversationSummaries();
      logger.info(`📋 Retrieved ${summaries.length} conversation summaries`);
      res.status(200).json({
        conversations: summaries
      });
    } catch (error) {
      const err = error as AppError;
      logger.error(`❌ Error in getConversationSummaries: ${err.message}`);
      next(error);
    }
  },

  // Get conversation details
  async getConversationDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationId = req.params.conversationId;
      logger.info(`🔍 Getting details for conversation: ${conversationId}`);
      
      const conversation = await assistantService.getConversationDetails(conversationId);
      logger.info(`✅ Found conversation with ${conversation.messages.length} messages`);
      
      res.status(200).json({
        id: conversation.id,
        title: conversation.title,
        messages: conversation.messages.map((msg: { id: string; content: string; role: string; timestamp: string }) => ({
          id: msg.id,
          content: msg.content,
          isUser: msg.role === 'user',
          timestamp: msg.timestamp
        })),
        lastMessage: conversation.messages[conversation.messages.length - 1]?.content || '',
        timestamp: conversation.messages[conversation.messages.length - 1]?.timestamp || conversation.createdAt,
        graphData: conversation.graphData // Optional graph data
      });
    } catch (error) {
      const err = error as AppError;
      logger.error(`❌ Error in getConversationDetails: ${err.message}`);
      next(error);
    }
  },

  // Delete conversation
  async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationId = req.params.conversationId;
      logger.info(`🗑️  Deleting conversation: ${conversationId}`);
      
      await assistantService.deleteConversation(conversationId);
      logger.info(`✅ Successfully deleted conversation: ${conversationId}`);
      
      res.status(200).json({
        success: true,
        conversationId,
        message: 'Conversation deleted successfully'
      });
    } catch (error) {
      const err = error as AppError;
      logger.error(`❌ Error in deleteConversation: ${err.message}`);
      next(error);
    }
  },
}; 