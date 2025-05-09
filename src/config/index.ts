import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Define the schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  CORS_ORIGIN: z.string().url(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  API_PREFIX: z.string().default('/api'),
  USE_MOCK_DATA: z.string().transform(val => val === 'true').default('true'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Export typed configuration
export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  corsOrigin: env.CORS_ORIGIN,
  logLevel: env.LOG_LEVEL,
  apiPrefix: env.API_PREFIX,
  useMockData: env.USE_MOCK_DATA,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
} as const;

export type Config = typeof config; 