# Chat Assistant Service API

Base Path: `/api/assistant`

This service handles chat conversations with an assistant.

## Endpoints

### 1. Send Message / Continue Conversation

- **Endpoint:** `POST /chat`
- **Description:** Sends a message to the assistant. If `conversationId` is provided, the message is added to an existing conversation. Otherwise, a new conversation is started.
- **Request Body:**
  ```json
  {
    "message": "string (user's message)",
    "conversationId": "string (optional, ID of existing conversation)"
  }
  ```
- **Validation:** Uses `sendMessageSchema` (`src/api/assistant/assistant.validation.ts`)
  - `message`: required string, min length 1.
  - `conversationId`: optional string.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "conversationId": "string",
      "botResponse": "string (assistant's reply)"
    }
  }
  ```
- **Mock Response (`USE_MOCK_DATA=true`):** Echoes the user's message as the bot response. Manages conversations in an in-memory map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 2. Get Conversation Summaries

- **Endpoint:** `GET /conversations`
- **Description:** Retrieves summaries of all conversations.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "title": "string (first 50 chars of the first message)",
        "lastMessage": "string (content of the last message)",
        "timestamp": "string (ISO 8601 datetime of the last message or creation)"
      }
    ]
  }
  ```
- **Mock Response (`USE_MOCK_DATA=true`):** Returns summaries from the in-memory conversation map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 3. Get Conversation Details

- **Endpoint:** `GET /conversations/:conversationId`
- **Description:** Retrieves the full details (all messages) of a specific conversation.
- **URL Parameters:**
  - `conversationId`: string (ID of the conversation)
- **Validation:** Uses `conversationIdSchema` for `conversationId`.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "title": "string",
      "messages": [
        {
          "role": "user | assistant",
          "content": "string",
          "timestamp": "string (ISO 8601 datetime)"
        }
      ],
      "createdAt": "string (ISO 8601 datetime)"
    }
  }
  ```
- **Error Response (404 Not Found):** If the conversation ID does not exist (when `USE_MOCK_DATA=true`).
- **Mock Response (`USE_MOCK_DATA=true`):** Returns the conversation from the in-memory map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented.

### 4. Delete Conversation

- **Endpoint:** `DELETE /conversations/:conversationId`
- **Description:** Deletes a specific conversation.
- **URL Parameters:**
  - `conversationId`: string (ID of the conversation)
- **Validation:** Uses `conversationIdSchema` for `conversationId`.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Conversation deleted successfully"
  }
  ```
- **Error Response (404 Not Found):** If the conversation ID does not exist (when `USE_MOCK_DATA=true`).
- **Mock Response (`USE_MOCK_DATA=true`):** Deletes the conversation from the in-memory map.
- **No Mock Response (`USE_MOCK_DATA=false`):** Returns 501 Not Implemented. 