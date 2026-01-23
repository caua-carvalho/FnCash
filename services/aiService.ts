/**
 * @file services/aiService.ts
 * @description Serviço de integração com IA via backend
 * Fluxo: áudio -> backend -> transcrição -> interpretação IA -> categorização
 */

import { API_CONFIG } from '@/constants/api';
import { appendAudio } from '@/utils/AppendAudio';
import type { Category, TransactionType } from '@/types/transaction';

/**
 * Resposta final da IA
 */
export interface AICategorizationResponse {
  category: Category;
  amount: number;
  description: string;
  type: TransactionType;
  confidence: number;
}

/**
 * Payload enviado ao backend
 * Backend é responsável por:
 * 1. Decodificar áudio
 * 2. Transcrever (Whisper, Gemini, etc.)
 * 3. Interpretar texto
 */
interface CategorizationRequest {
  userId: string;
  audioBase64: string | null;
  mimeType: string;
  language: 'pt-BR';
}

/**
 * Serviço de IA (Singleton)
 */
class AIService {
  private static instance: AIService;

  /**
   * Ative apenas em desenvolvimento
   * Em produção deve ser sempre false
   */
  private useMock = false;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * API pública usada pelo app
   */
  async categorizeAudio(
    userId: string,
    audioUri: any
  ): Promise<AICategorizationResponse> {
    if (this.useMock) {
      return this.generateMockResponse();
    }

    const response = await this.sendToBackend(userId, audioUri);
    return response;
  }

  /**
   * Comunicação com backend
   */
  private async sendToBackend(
    userId: string,
    audioUri: string
  ): Promise<any> {
    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('language', 'pt-BR');

    await appendAudio(formData, audioUri);

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIZE_AUDIO}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${API_CONFIG.JWT_SECRET}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro IA backend: ${response.status}`);
    }

    return response.json();
  }



  /**
   * Validação defensiva da resposta
   */
  private validateResponse(data: any): AICategorizationResponse {
    const required = [
      'amount',
      'category',
      'type',
      'description',
      'confidence',
    ];

    for (const field of required) {
      if (!(field in data)) {
        throw new Error(`Campo ausente: ${field}`);
      }
    }

    if (typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('Amount inválido');
    }

    if (!['expense', 'income'].includes(data.type)) {
      throw new Error('Tipo inválido');
    }

    return {
      amount: data.amount,
      category: data.category as Category,
      type: data.type as TransactionType,
      description: data.description,
      confidence: Math.min(1, Math.max(0, data.confidence)),
    };
  }

  /**
   * Mock isolado para DEV
   */
  private generateMockResponse(): AICategorizationResponse {
    return {
      amount: 42.9,
      category: 'Alimentação',
      type: 'expense',
      description: 'Almoço',
      confidence: 0.94,
    };
  }

  setUseMock(value: boolean): void {
    this.useMock = value;
  }
}

export const aiService = AIService.getInstance();
