# Error Reporting Service API

Base Path: `/api/error-reporting`

This service allows client applications (e.g., the frontend) to report errors to the backend.

## Endpoints

### 1. Report Frontend Error

- **Endpoint:** `POST /report-error`
- **Description:** Reports an error that occurred on the client-side.
- **Request Body:**
  ```json
  {
    "message": "string (error message)",
    "stack": "string (optional, stack trace)",
    "info": "object (optional, additional information)",
    "errorCode": "string (optional, client-defined error code)",
    "context": "object (optional, client-defined context)",
    "timestamp": "string (ISO 8601 datetime, when the error occurred)",
    "severity": "'error' | 'warning' | 'info'"
  }
  ```
- **Validation:** Uses `reportErrorSchema` (`src/api/error-reporting/errorReporting.validation.ts`)
  - `message`: required string, min length 1.
  - `stack`: optional string.
  - `info`: optional record of unknown values.
  - `errorCode`: optional string.
  - `context`: optional record of unknown values.
  - `timestamp`: required string, datetime format.
  - `severity`: required enum: 'error', 'warning', 'info'.
- **Success Response (202 Accepted):**
  ```json
  {
    "success": true,
    "message": "Error reported successfully"
  }
  ```
  A `202 Accepted` status is used because the error reporting is typically an asynchronous operation on the backend (logging, sending to an external service). The backend acknowledges receipt of the error report.
- **Mock Response (`USE_MOCK_DATA=true`):** Logs the error and returns success.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented (though in a real scenario, this endpoint would ideally always work to capture errors, or at least log them locally before forwarding). 