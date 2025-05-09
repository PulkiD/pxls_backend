# Knowledge Graph Service API

Base Path: `/api/knowledge-graph`

This service provides endpoints for querying the knowledge graph and managing saved queries.

## Endpoints

### 1. Query Knowledge Graph

- **Endpoint:** `POST /query`
- **Description:** Executes a query against the knowledge graph.
- **Request Body:**
  ```json
  {
    "query": "string (your knowledge graph query)"
  }
  ```
- **Validation:** Uses `knowledgeGraphQuerySchema` (`src/api/knowledge-graph/knowledgeGraph.validation.ts`)
  - `query`: required string, min length 1.
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
          "properties": "object"
        }
      ],
      "relationships": [
        {
          "source": "string (nodeId)",
          "target": "string (nodeId)",
          "relation": "string",
          "weight": "number",
          "evolution": "object",
          "properties": "object",
          "isActive": "boolean"
        }
      ]
    }
  }
  ```
- **Mock Response (`USE_MOCK_DATA=true`):** Returns a predefined graph structure (see `KnowledgeGraphService`).
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 2. Get Saved Queries

- **Endpoint:** `GET /saved-queries`
- **Description:** Retrieves a list of all saved queries.
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
- **Mock Response (`USE_MOCK_DATA=true`):** Returns a list of mock saved queries.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 3. Save a New Query

- **Endpoint:** `POST /saved-queries`
- **Description:** Saves a new knowledge graph query.
- **Request Body:**
  ```json
  {
    "name": "string",
    "query": "string",
    "description": "string (optional)"
  }
  ```
- **Validation:** Uses `saveQuerySchema`
  - `name`: required string, min length 1.
  - `query`: required string, min length 1.
  - `description`: optional string.
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* SavedQuery object */ },
    "message": "Query saved successfully"
  }
  ```
- **Mock Response (`USE_MOCK_DATA=true`):** Adds the query to an in-memory map and returns it.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 4. Delete a Saved Query

- **Endpoint:** `DELETE /saved-queries/:queryId`
- **Description:** Deletes a specific saved query by its ID.
- **URL Parameters:**
  - `queryId`: string (ID of the query to delete)
- **Validation:** Uses `queryIdSchema` for `queryId`.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Query deleted successfully"
  }
  ```
- **Error Response (404 Not Found):** If the query ID does not exist (when `USE_MOCK_DATA=true`).
- **Mock Response (`USE_MOCK_DATA=true`):** Deletes the query from an in-memory map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 5. Update a Saved Query

- **Endpoint:** `PATCH /saved-queries/:queryId`
- **Description:** Updates an existing saved query.
- **URL Parameters:**
  - `queryId`: string (ID of the query to update)
- **Request Body:**
  ```json
  {
    "name": "string (optional)",
    "description": "string (optional)"
  }
  ```
- **Validation:** Uses `updateQuerySchema` for the body and `queryIdSchema` for `queryId`.
  - `name`: optional string.
  - `description`: optional string.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { /* Updated SavedQuery object */ },
    "message": "Query updated successfully"
  }
  ```
- **Error Response (404 Not Found):** If the query ID does not exist (when `USE_MOCK_DATA=true`).
- **Mock Response (`USE_MOCK_DATA=true`):** Updates the query in an in-memory map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented. 