# PXLS Backend

A Backend for Frontend (BFF) API service built with Express.js and TypeScript.

## Features

- TypeScript for type safety and better developer experience
- Express.js for handling HTTP requests
- Zod for request validation
- Winston for logging
- Morgan for HTTP request logging
- CORS support for cross-origin requests
- Helmet for security headers
- Environment-based configuration
- Error handling middleware
- API response standardization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pxls_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration values.

## Development

Start the development server:
```bash
npm run dev
```

The server will start on the configured port (default: 5000) with hot-reloading enabled.

## Building for Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Documentation

The API documentation is available in the `API.md` file. It includes detailed information about:

- Knowledge Graph Service
- Chat Assistant Service
- Error Reporting Service

## Project Structure

```
src/
├── api/                    # API routes and controllers
│   ├── knowledge-graph/    # Knowledge Graph service
│   ├── assistant/         # Chat Assistant service
│   └── index.ts           # Main API router
├── config/                # Configuration
├── middlewares/           # Express middlewares
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── app.ts                 # Express app setup
└── server.ts             # Server entry point
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint errors
- `npm run format`: Format code with Prettier

## Error Handling

The application uses a centralized error handling system that:

- Catches and formats all errors
- Provides consistent error responses
- Logs errors appropriately
- Handles different types of errors (validation, application, server)

## Logging

The application uses Winston for logging with:

- Different log levels (error, warn, info, etc.)
- Console and file transports
- Request logging with Morgan
- Structured logging in production

## Security

- CORS configuration
- Helmet security headers
- Environment variable management
- Request validation
- Error handling that doesn't leak sensitive information

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.
