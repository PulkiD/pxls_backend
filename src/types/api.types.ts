// Knowledge Graph Types
export interface KnowledgeGraphNode {
  id: string;
  name: string;
  type: string;
  properties: Record<string, unknown>;
}

export interface KnowledgeGraphRelationship {
  source: string;
  target: string;
  relation: string;
  weight: number;
  evolution: Record<string, number>;
  properties: Record<string, unknown>;
  isActive: boolean;
}

export interface KnowledgeGraphResponse {
  nodes: KnowledgeGraphNode[];
  relationships: KnowledgeGraphRelationship[];
}

export interface SavedQuery {
  id: string;
  queryText: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Chat Assistant Types
export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatResponse {
  conversationId: string;
  botResponse: ChatMessage;
  graphData?: KnowledgeGraphResponse;
}

export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export interface ConversationDetails extends ConversationSummary {
  messages: ChatMessage[];
  graphData?: KnowledgeGraphResponse;
}

// Error Reporting Types
export interface ErrorReport {
  message: string;
  stack?: string;
  info?: Record<string, unknown>;
  errorCode?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  severity: 'error' | 'warning' | 'info';
}

// API Response Types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  status: 'error' | 'failure';
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse; 