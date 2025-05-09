import { knowledgeGraphController } from '../../../api/knowledge-graph/knowledgeGraph.controller';
import { mockRequest, mockResponse, mockNext, expectSuccessResponse, expectErrorResponse } from '../../utils/testUtils';
import { Request } from 'express';

describe('Knowledge Graph Controller', () => {
  describe('queryKnowledgeGraph', () => {
    it('should return query results', async () => {
      const req = mockRequest({ query: 'test query' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.queryKnowledgeGraph(req, res, next);

      expectSuccessResponse(res, {
        nodes: expect.any(Array),
        edges: expect.any(Array),
      });
    });

    it('should handle empty query', async () => {
      const req = mockRequest({ query: '' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.queryKnowledgeGraph(req, res, next);

      expectErrorResponse(res, 'Query is required', 400, 'VALIDATION_ERROR');
    });
  });

  describe('getSavedQueries', () => {
    it('should return saved queries', async () => {
      const req = mockRequest() as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.getSavedQueries(req, res, next);

      expectSuccessResponse(res, expect.any(Array));
    });
  });

  describe('saveQuery', () => {
    it('should save a new query', async () => {
      const req = mockRequest({
        name: 'Test Query',
        query: 'test query',
        description: 'Test description',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.saveQuery(req, res, next);

      expectSuccessResponse(res, expect.any(Object), 'Query saved successfully', 201);
    });

    it('should handle invalid query data', async () => {
      const req = mockRequest({
        name: '',
        query: '',
      }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.saveQuery(req, res, next);

      expectErrorResponse(res, 'Invalid query data', 400, 'VALIDATION_ERROR');
    });
  });

  describe('deleteSavedQuery', () => {
    it('should delete a saved query', async () => {
      const req = mockRequest({}, { queryId: '123' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.deleteSavedQuery(req, res, next);

      expectSuccessResponse(res, null, 'Query deleted successfully');
    });

    it('should handle non-existent query', async () => {
      const req = mockRequest({}, { queryId: 'non-existent' }) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.deleteSavedQuery(req, res, next);

      expectErrorResponse(res, 'Query not found', 404, 'NOT_FOUND');
    });
  });

  describe('updateSavedQuery', () => {
    it('should update a saved query', async () => {
      const req = mockRequest(
        {
          name: 'Updated Query',
          description: 'Updated description',
        },
        { queryId: '123' }
      ) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.updateSavedQuery(req, res, next);

      expectSuccessResponse(res, expect.any(Object), 'Query updated successfully');
    });

    it('should handle non-existent query', async () => {
      const req = mockRequest(
        {
          name: 'Updated Query',
        },
        { queryId: 'non-existent' }
      ) as Request;
      const res = mockResponse();
      const next = mockNext();

      await knowledgeGraphController.updateSavedQuery(req, res, next);

      expectErrorResponse(res, 'Query not found', 404, 'NOT_FOUND');
    });
  });
}); 