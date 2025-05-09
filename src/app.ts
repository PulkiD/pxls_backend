import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';
import apiRouter from './api';

// Create Express app
const app = express();

// Request parsing - should be first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging - after parsing but before routes
app.use(requestLogger);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Debug middleware to log all requests
app.use((req, res, next) => {
  logger.debug('Incoming request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
  });
  next();
});

// API routes
app.use(config.apiPrefix, apiRouter);

// Error handling
app.use(errorHandler);

export default app; 