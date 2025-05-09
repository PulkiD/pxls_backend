import { Router } from 'express';
import { knowledgeGraphController } from './knowledgeGraph.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  queryKnowledgeGraphSchema,
  saveQuerySchema,
  updateQuerySchema,
  queryIdSchema,
} from './knowledgeGraph.validation';

const router = Router();

// Query knowledge graph
router.get(
  '/query',
  validate(queryKnowledgeGraphSchema),
  knowledgeGraphController.queryKnowledgeGraph
);

// Get saved queries
router.get('/saved-queries', knowledgeGraphController.getSavedQueries);

// Save a new query
router.post(
  '/saved-queries',
  validate(saveQuerySchema),
  knowledgeGraphController.saveQuery
);

// Delete a saved query
router.delete(
  '/saved-queries/:queryId',
  validate(queryIdSchema),
  knowledgeGraphController.deleteSavedQuery
);

// Update a saved query
router.patch(
  '/saved-queries/:queryId',
  validate(updateQuerySchema),
  validate(queryIdSchema),
  knowledgeGraphController.updateSavedQuery
);

export default router; 