import { AppError } from '../../utils/appError';
import { logger } from '../../utils/logger';
import { config } from '../../config';

interface GraphNode {
  id: string;
  type: string;
  name: string;
}

interface GraphRelationship {
  id: string;
  source: string;
  target: string;
  relation: string;
  weightage: number;
  evolution?: {
    [year: string]: number;
  };
}

interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  graphData?: GraphData;
}

interface SendMessageResult {
  conversationId: string;
  botResponse: {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: string;
  };
  graphData?: GraphData;
}

export class AssistantService {
  private static instance: AssistantService;
  private useMockData: boolean;
  private mockConversations: Map<string, Conversation>;

  private constructor() {
    this.useMockData = config.useMockData;
    this.mockConversations = new Map();
    logger.info(`AssistantService initialized with useMockData: ${this.useMockData}`);
  }

  private generateMockGraphData(): GraphData {
    const nodeTypes = ['drug', 'disease', 'protein', 'pathway', 'gene', 'compound'];
    const relations = ['TREATS', 'CAUSES', 'INTERACTS_WITH', 'REGULATES', 'PARTICIPATES_IN', 'ENCODES'];
    const years = ['2020', '2021', '2022', '2023'];

    const nodes: GraphNode[] = [
      { id: 'n1', type: nodeTypes[0], name: 'Gefitinib' },
      { id: 'n2', type: nodeTypes[1], name: 'Non-small cell lung cancer' },
      { id: 'n3', type: nodeTypes[2], name: 'EGFR' },
      { id: 'n4', type: nodeTypes[3], name: 'MAPK signaling pathway' }
    ];

    const relationships: GraphRelationship[] = [
      {
        id: 'r1',
        source: 'n1',
        target: 'n2',
        relation: relations[0],
        weightage: 0.8,
        evolution: {
          '2020': 0.5,
          '2021': 0.6,
          '2022': 0.7,
          '2023': 0.8
        }
      },
      {
        id: 'r2',
        source: 'n2',
        target: 'n3',
        relation: relations[1],
        weightage: 0.9,
        evolution: {
          '2023': 0.8
        }
      },
      {
        id: 'r3',
        source: 'n3',
        target: 'n4',
        relation: relations[2],
        weightage: 0.7,
        evolution: {
          '2022': 0.7,
          '2023': 0.8
        }
      }
    ];

    return { nodes, relationships };
  }

  private shouldIncludeGraphData(): boolean {
    return Math.random() > 0.5; // 50% chance of including graph data
  }

  public static getInstance(): AssistantService {
    if (!AssistantService.instance) {
      AssistantService.instance = new AssistantService();
    }
    return AssistantService.instance;
  }

  async sendMessage(message: string, conversationId?: string): Promise<SendMessageResult> {
    console.log('Processing message:', { message, conversationId });

    if (!message) {
      throw new AppError('Message is required', 400, 'VALIDATION_ERROR');
    }

    if (this.useMockData) {
      logger.debug('Using mock data for message processing');
      let conversation = conversationId ? this.mockConversations.get(conversationId) : null;
      let finalConversationId = conversationId || Date.now().toString();
      
      if (!conversation) {
        conversation = {
          id: finalConversationId,
          title: message.substring(0, 50),
          messages: [],
          createdAt: new Date().toISOString(),
        };
        this.mockConversations.set(finalConversationId, conversation);
        logger.debug('Created new conversation:', { conversationId: finalConversationId });
      }

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      conversation.messages.push(userMessage);
      logger.debug('Added user message:', userMessage);

      // Mock bot response
      const botResponse = `Echo: ${message}`;
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: botResponse,
        timestamp: new Date().toISOString(),
      };
      conversation.messages.push(assistantMessage);
      logger.debug('Added assistant message:', assistantMessage);

      // Generate graph data if needed
      if (this.shouldIncludeGraphData()) {
        conversation.graphData = this.generateMockGraphData();
      }

      const result: SendMessageResult = {
        conversationId: finalConversationId,
        botResponse: {
          id: assistantMessage.id,
          content: botResponse,
          isUser: false,
          timestamp: assistantMessage.timestamp
        },
        graphData: conversation.graphData
      };
      
      logger.debug('Returning response:', result);
      return result;
    }

    // TODO: Implement actual message handling logic
    throw new AppError('Message handling not implemented', 501, 'NOT_IMPLEMENTED');
  }

  async getConversationSummaries() {
    if (this.useMockData) {
      return Array.from(this.mockConversations.values()).map(conversation => ({
        id: conversation.id,
        title: conversation.title,
        lastMessage: conversation.messages[conversation.messages.length - 1]?.content || '',
        timestamp: conversation.messages[conversation.messages.length - 1]?.timestamp || conversation.createdAt
      }));
    }

    // TODO: Implement actual conversation summaries retrieval
    throw new AppError('Conversation summaries retrieval not implemented', 501, 'NOT_IMPLEMENTED');
  }

  async getConversationDetails(conversationId: string) {
    if (this.useMockData) {
      const conversation = this.mockConversations.get(conversationId);
      if (!conversation) {
        throw new AppError('Conversation not found', 404, 'NOT_FOUND');
      }

      // Generate graph data if needed
      if (this.shouldIncludeGraphData()) {
        conversation.graphData = this.generateMockGraphData();
      }

      return conversation;
    }

    // TODO: Implement actual conversation details retrieval
    throw new AppError('Conversation details retrieval not implemented', 501, 'NOT_IMPLEMENTED');
  }

  async deleteConversation(conversationId: string) {
    if (this.useMockData) {
      if (!this.mockConversations.has(conversationId)) {
        throw new AppError('Conversation not found', 404, 'NOT_FOUND');
      }
      this.mockConversations.delete(conversationId);
      return;
    }

    // TODO: Implement actual conversation deletion
    throw new AppError('Conversation deletion not implemented', 501, 'NOT_IMPLEMENTED');
  }
} 