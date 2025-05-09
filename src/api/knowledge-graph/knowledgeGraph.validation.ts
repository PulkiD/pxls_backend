import { z } from 'zod';

// Query parameters for fetching knowledge graph
export const queryKnowledgeGraphSchema = z.object({
  query: z.string().min(1, 'Query is required'),
});

// Request body for saving a query
export const saveQuerySchema = z.object({
  queryText: z.string().min(1, 'Query text is required'),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Request body for updating a query
export const updateQuerySchema = saveQuerySchema.partial();

// Path parameters for query operations
export const queryIdSchema = z.object({
  queryId: z.string().min(1, 'Query ID is required'),
}); 