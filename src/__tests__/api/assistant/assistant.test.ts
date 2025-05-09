import { assistantController } from '../../../api/assistant/assistant.controller';
import { mockRequest, mockResponse, mockNext, expectSuccessResponse, expectErrorResponse } from '../../utils/testUtils';
import { Request } from 'express';

describe('Chat Assistant Controller', () => {
  describe('sendMessage', () => {
    it('should send a message and get a response', async () => {
      const req = mockRequest({
        message: 'Hello, how are you?',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.sendMessage(req, res, next);

      expectSuccessResponse(res, {
        conversationId: expect.any(String),
        botResponse: expect.any(String),
      });
    });

    it('should handle empty message', async () => {
      const req = mockRequest({
        message: '',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.sendMessage(req, res, next);

      expectErrorResponse(res, 'Message is required', 400, 'VALIDATION_ERROR');
    });

    it('should continue existing conversation', async () => {
      const req = mockRequest({
        message: 'Follow up question',
        conversationId: 'existing-conversation-id',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.sendMessage(req, res, next);

      expectSuccessResponse(res, {
        conversationId: 'existing-conversation-id',
        botResponse: expect.any(String),
      });
    });
  });

  describe('getConversationSummaries', () => {
    it('should return conversation summaries', async () => {
      const req = mockRequest() as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.getConversationSummaries(req, res, next);

      expectSuccessResponse(res, expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          lastMessage: expect.any(String),
          timestamp: expect.any(String),
        }),
      ]));
    });
  });

  describe('getConversationDetails', () => {
    it('should return conversation details', async () => {
      const req = mockRequest({}, { conversationId: 'test-conversation' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.getConversationDetails(req, res, next);

      expectSuccessResponse(res, expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: expect.any(String),
            content: expect.any(String),
            timestamp: expect.any(String),
          }),
        ]),
      }));
    });

    it('should handle non-existent conversation', async () => {
      const req = mockRequest({}, { conversationId: 'non-existent' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.getConversationDetails(req, res, next);

      expectErrorResponse(res, 'Conversation not found', 404, 'NOT_FOUND');
    });
  });

  describe('deleteConversation', () => {
    it('should delete a conversation', async () => {
      const req = mockRequest({}, { conversationId: 'test-conversation' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.deleteConversation(req, res, next);

      expectSuccessResponse(res, null, 'Conversation deleted successfully');
    });

    it('should handle non-existent conversation', async () => {
      const req = mockRequest({}, { conversationId: 'non-existent' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await assistantController.deleteConversation(req, res, next);

      expectErrorResponse(res, 'Conversation not found', 404, 'NOT_FOUND');
    });
  });
}); 