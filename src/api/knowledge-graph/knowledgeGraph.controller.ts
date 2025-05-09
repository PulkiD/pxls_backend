import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../utils/apiResponse';
import { AppError } from '../../middlewares/errorHandler';
import { KnowledgeGraphResponse, SavedQuery } from '../../types/api.types';
import { KnowledgeGraphService } from './knowledgeGraph.service';
import { logger } from '../../utils/logger';

const knowledgeGraphService = KnowledgeGraphService.getInstance();

// Mock data for demonstration - replace with actual service calls
const mockKnowledgeGraphData: KnowledgeGraphResponse = {
  nodes: [
    {
      id: '1',
      name: 'Example Node',
      type: 'concept',
      properties: {},
    },
  ],
  relationships: [
    {
      source: '1',
      target: '2',
      relation: 'related_to',
      weight: 0.8,
      evolution: { '2023': 0.8 },
      properties: {},
      isActive: true,
    },
  ],
};

const mockSavedQueries: SavedQuery[] = [
  {
    id: '1',
    queryText: 'Example query',
    description: 'An example saved query',
    tags: ['example'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const knowledgeGraphController = {
  // Fetch knowledge graph data
  async queryKnowledgeGraph(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await knowledgeGraphService.queryKnowledgeGraph(req.body.query);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get saved queries
  async getSavedQueries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const queries = await knowledgeGraphService.getSavedQueries();
      res.status(200).json({
        success: true,
        data: queries,
      });
    } catch (error) {
      next(error);
    }
  },

  // Save a new query
  async saveQuery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const savedQuery = await knowledgeGraphService.saveQuery(req.body);
      res.status(201).json({
        success: true,
        data: savedQuery,
        message: 'Query saved successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a saved query
  async deleteSavedQuery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await knowledgeGraphService.deleteSavedQuery(req.params.queryId);
      res.status(200).json({
        success: true,
        message: 'Query deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  // Update a saved query
  async updateSavedQuery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedQuery = await knowledgeGraphService.updateSavedQuery(
        req.params.queryId,
        req.body
      );
      res.status(200).json({
        success: true,
        data: updatedQuery,
        message: 'Query updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
}; 