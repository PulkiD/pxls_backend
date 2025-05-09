# API Documentation

This directory contains detailed documentation for each service in the Pxls Backend API.

## Services

- [Knowledge Graph Service](./knowledge-graph.md)
- [Chat Assistant Service](./assistant.md)
- [Error Reporting Service](./error-reporting.md)

## General Information

### API Prefix
All API endpoints are prefixed with `/api` (configurable via the `API_PREFIX` environment variable). For example, an endpoint `/chat` in the Chat Assistant service will be accessible at `/api/assistant/chat`.

### Authentication
Currently, authentication is not implemented. This will be added in a future iteration.

### Error Handling
Errors are returned in a consistent JSON format:
```json
{
  "success": false,
  "message": "Error message describing the issue",
  "errorCode": "UNIQUE_ERROR_CODE", // e.g., VALIDATION_ERROR, NOT_FOUND, INTERNAL_SERVER_ERROR
  "details": { /* Optional additional details about the error */ }
}
```
Common HTTP status codes used:
- `200 OK`: Request successful.
- `201 Created`: Resource created successfully.
- `202 Accepted`: Request accepted for processing (used in async operations like error reporting).
- `400 Bad Request`: Invalid request payload or parameters (often due to validation errors).
- `401 Unauthorized`: Authentication required or failed. (To be implemented)
- `403 Forbidden`: Authenticated user does not have permission. (To be implemented)
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Unexpected server error.
- `501 Not Implemented`: Feature or endpoint is not yet implemented (used when `USE_MOCK_DATA` is false).

### Rate Limiting
Currently, rate limiting is not implemented. This is a crucial aspect for production APIs and should be considered.

### `USE_MOCK_DATA` Environment Variable
- If `USE_MOCK_DATA` is set to `true` in your `.env` file, the API will return predefined mock responses for most endpoints. This is useful for frontend development and testing without a live database or external services.
- If `USE_MOCK_DATA` is `false` or not set, endpoints that rely on data persistence or external calls will return a `501 Not Implemented` error, indicating that the actual business logic needs to be implemented. 