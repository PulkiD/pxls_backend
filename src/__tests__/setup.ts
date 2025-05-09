import dotenv from 'dotenv';

// Load test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '5001';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.LOG_LEVEL = 'error';
process.env.API_PREFIX = '/api';

// Load .env file
dotenv.config(); 