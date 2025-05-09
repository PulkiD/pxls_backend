# Backend API Documentation

This document outlines the backend API endpoints required by the frontend application.

## 1. Knowledge Graph Service (`/api/knowledge-graph`)

### 1.1. Fetch Knowledge Graph

- **Endpoint:** `/api/knowledge-graph/query`
- **Method:** `GET`
- **Description:** Retrieves knowledge graph data based on a search query.
- **Query Parameters:**
  - `query` (string, required): The search term or query string.
- **Request Body:** None
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "nodes": [
        {
          "id": "string",
          "name": "string",
          "type": "string",
          "properties": {}
        }
      ],
      "relationships": [
        {
          "source": "string", // Node ID
          "target": "string", // Node ID
          "relation": "string",
          "weight": "number",
          "evolution": { 
            "<year_string>": "number" // e.g. "2023": 0.8
          },
          "properties": {},
          "isActive": "boolean"
        }
      ]
    }
  }
  ```
- **Error Response (e.g., 400, 404, 500):**
  ```json
  {
    "status": "error", // or "failure"
    "errorCode": "string", // e.g., "VALIDATION_ERROR", "NOT_FOUND", "INTERNAL_SERVER_ERROR"
    "message": "string",
    "details": {}
  }
  ```

### 1.2. Get Saved Queries

- **Endpoint:** `/api/knowledge-graph/saved-queries`
- **Method:** `GET`
- **Description:** Retrieves a list of all saved knowledge graph queries for the user.
- **Request Body:** None
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "queryText": "string",
        "description": "string",
        "tags": ["string"],
        "createdAt": "string (ISO 8601 datetime)",
        "updatedAt": "string (ISO 8601 datetime)"
      }
    ]
  }
  ```
- **Error Response:** (Same as 1.1)

### 1.3. Save Query

- **Endpoint:** `/api/knowledge-graph/saved-queries`
- **Method:** `POST`
- **Description:** Saves a new knowledge graph query.
- **Request Body:**
  ```json
  {
    "queryText": "string",
    "description": "string",
    "tags": ["string"]
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "queryText": "string",
      "description": "string",
      "tags": ["string"],
      "createdAt": "string (ISO 8601 datetime)",
      "updatedAt": "string (ISO 8601 datetime)"
    }
  }
  ```
- **Error Response:** (Same as 1.1)

### 1.4. Delete Saved Query

- **Endpoint:** `/api/knowledge-graph/saved-queries/{queryId}`
- **Method:** `DELETE`
- **Description:** Deletes a specific saved query by its ID.
- **Path Parameters:**
  - `queryId` (string, required): The ID of the query to delete.
- **Request Body:** None
- **Success Response (200 OK or 204 No Content):**
  ```json
  {
    "success": true,
    "message": "Query deleted successfully."
  }
  ```
  *(Alternatively, a 204 No Content response with an empty body is also acceptable)*
- **Error Response:** (Same as 1.1, e.g., 404 if queryId not found)

### 1.5. Update Saved Query

- **Endpoint:** `/api/knowledge-graph/saved-queries/{queryId}`
- **Method:** `PATCH` (or `PUT` if full replacement is preferred)
- **Description:** Updates an existing saved query.
- **Path Parameters:**
  - `queryId` (string, required): The ID of the query to update.
- **Request Body (Partial<SavedQuery>):**
  ```json
  {
    "queryText": "string", // optional
    "description": "string", // optional
    "tags": ["string"] // optional
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "queryText": "string",
      "description": "string",
      "tags": ["string"],
      "createdAt": "string (ISO 8601 datetime)",
      "updatedAt": "string (ISO 8601 datetime)"
    }
  }
  ```
- **Error Response:** (Same as 1.1)

## 2. Chat Assistant Service (`/api/assistant`)

### 2.1. Send Message / Continue Conversation

- **Endpoint:** `/api/assistant/chat`
- **Method:** `POST`
- **Description:** Sends a message to the chat assistant. Can be used for starting a new conversation or continuing an existing one.
- **Request Body:**
  ```json
  {
    "conversationId": "string", // Optional: omit for new conversation
    "message": {
      "content": "string"
      // Potentially other message attributes like attachments, etc.
    }
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "conversationId": "string", // ID of the (new or existing) conversation
    "botResponse": {
      "id": "string",
      "content": "string",
      "isUser": false,
      "timestamp": "string (ISO 8601 datetime)"
      // Potentially other bot response attributes like suggestions, actions
    },
    "graphData": { // Optional: if the bot response includes a graph visualization
      "nodes": [/* ... see 1.1 ... */],
      "relationships": [/* ... see 1.1 ... */]
    }
  }
  ```
- **Error Response:** (Similar to 1.1, specific error codes for chat issues)

### 2.2. Get Conversation Summaries

- **Endpoint:** `/api/assistant/conversations`
- **Method:** `GET`
- **Description:** Retrieves a list of conversation summaries for the user.
- **Request Body:** None
- **Success Response (200 OK):**
  ```json
  {
    "conversations": [
      {
        "id": "string",
        "title": "string",
        "lastMessage": "string", // Snippet of the last message
        "timestamp": "string (ISO 8601 datetime)" // Timestamp of the last message
      }
    ]
    // Potentially add pagination info if the list can be long
  }
  ```
- **Error Response:** (Similar to 1.1)

### 2.3. Get Conversation Details

- **Endpoint:** `/api/assistant/conversations/{conversationId}`
- **Method:** `GET`
- **Description:** Retrieves the full details of a specific conversation.
- **Path Parameters:**
  - `conversationId` (string, required): The ID of the conversation.
- **Request Body:** None
- **Success Response (200 OK):**
  ```json
  {
    "id": "string",
    "title": "string",
    "messages": [
      {
        "id": "string",
        "content": "string",
        "isUser": "boolean",
        "timestamp": "string (ISO 8601 datetime)"
      }
    ],
    "lastMessage": "string",
    "timestamp": "string (ISO 8601 datetime)",
    "graphData": { // Optional: if the conversation context has an associated graph
      "nodes": [/* ... see 1.1 ... */],
      "relationships": [/* ... see 1.1 ... */]
    }
  }
  ```
- **Error Response:** (Similar to 1.1, e.g., 404 if conversationId not found)

### 2.4. Delete Conversation

- **Endpoint:** `/api/assistant/conversations/{conversationId}`
- **Method:** `DELETE`
- **Description:** Deletes a specific conversation.
- **Path Parameters:**
  - `conversationId` (string, required): The ID of the conversation to delete.
- **Request Body:** None
- **Success Response (200 OK or 204 No Content):**
  ```json
  {
    "success": true,
    "conversationId": "string",
    "message": "Conversation deleted successfully."
  }
  ```
  *(Alternatively, a 204 No Content response with an empty body is also acceptable)*
- **Error Response:** (Similar to 1.1, e.g., 404 if conversationId not found)

## 3. Error Reporting Service (`/api`)

### 3.1. Report Frontend Error

- **Endpoint:** `/api/report-error`
- **Method:** `POST`
- **Description:** Allows the frontend to report client-side errors to the backend for logging and analysis.
- **Request Body:**
  ```json
  {
    "message": "string",
    "stack": "string", // Optional: stack trace
    "info": {}, // Optional: additional info (e.g., component state)
    "errorCode": "string", // Optional: frontend-specific error code
    "context": {}, // Optional: context from where the error occurred (e.g., component name, user actions)
    "timestamp": "string (ISO 8601 datetime)",
    "severity": "string" // e.g., "error", "warning", "info"
  }
  ```
- **Success Response (200 OK or 202 Accepted):**
  ```json
  {
    "success": true,
    "message": "Error reported successfully."
  }
  ```
- **Error Response:** (This endpoint should ideally be very resilient and avoid throwing errors itself, but if it must):
  ```json
  {
    "success": false,
    "message": "Failed to report error."
  }
  ```

``` 