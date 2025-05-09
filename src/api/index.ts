import { Router } from 'express';
import knowledgeGraphRoutes from './knowledge-graph/knowledgeGraph.routes';
import assistantRoutes from './assistant/assistant.routes';
import errorReportingRoutes from './error-reporting/errorReporting.routes';

const router = Router();

// Mount service routes
router.use('/knowledge-graph', knowledgeGraphRoutes);
router.use('/assistant', assistantRoutes);
router.use('/error-reporting', errorReportingRoutes);

export default router; 