import morgan from 'morgan';
import { stream } from '../utils/logger';

// Custom tokens for detailed request logging
morgan.token('body', (req: any) => {
  if (process.env.NODE_ENV === 'development') {
    return JSON.stringify(req.body);
  }
  return '';
});

morgan.token('headers', (req: any) => {
  if (process.env.NODE_ENV === 'development') {
    return JSON.stringify(req.headers);
  }
  return '';
});

// Custom format for development environment
const devFormat = ':method :url :status :response-time ms\nHeaders: :headers\nBody: :body';

// Custom format for production environment
const prodFormat = ':remote-addr - :method :url :status :response-time ms :res[content-length]';

// Create the middleware
export const requestLogger = morgan(
  process.env.NODE_ENV === 'development' ? devFormat : prodFormat,
  { stream }
); 