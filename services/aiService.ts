/**
 * @file services/aiService.ts
 * @description Serviço para integração com IA (Gemini)
 * Responsável por categorização automática de transações via áudio
 *
 * NOTA: Este arquivo contém um exemplo de integração com Gemini
 * e um mock para desenvolvimento local. Substituir com sua implementação real.
 */

import { API_CONFIG } from '@/constants/api';


import type { Category, TransactionType } from '@/types/transaction';

/**
 * Interface para resposta de categorização
 * @interface AICategorizationResponse
 */
export interface AICategorizationResponse {
  category: Category;
  amount: number;
  description: string;
  type: TransactionType;
  confidence: number;
}

/**
 * Interface para requisição de categorização
 * @interface CategorizationRequest
 */
interface CategorizationRequest {
  userId: string;
  audioBase64: string;
  mimeType: string;
}

/**
 * Classe para gerenciar integração com IA
 */
export class AIService {
  private static instance: AIService;
  private useLocalMock: boolean = true; // Mude para false ao integrar com backend real

  /**
   * Obtém instância única do serviço (singleton)
   * @returns {AIService} Instância do serviço
   */
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Categoriza uma transação a partir de um arquivo de áudio
   * Tenta primeiro o backend, se falhar usa mock local
   *
   * @param {string} userId - ID do usuário
   * @param {string} audioBase64 - Arquivo de áudio em base64
   * @returns {Promise<AICategorizationResponse>} Resposta com categorização
   * @throws {Error} Se houver erro no processo
   */
  async categorizeAudio(
    userId: string,
    audioBase64: string
  ): Promise<AICategorizationResponse> {
    try {
      // Tenta usar backend real
      if (!this.useLocalMock) {
        return await this.categorizeViaBackend(userId, audioBase64);
      }

      // Usa mock local para desenvolvimento
      console.log('[DEV MODE] Usando mock de categorização');
      return this.generateMockCategorization(audioBase64);
    } catch (error) {
      console.error('Erro na categorização:', error);
      // Fallback para mock
      return this.generateMockCategorization(audioBase64);
    }
  }

  /**
   * Envia áudio para o backend para categorização
   * INTEGRE AQUI COM SEU BACKEND
   *
   * @param {string} userId - ID do usuário
   * @param {string} audioBase64 - Áudio em base64
   * @returns {Promise<AICategorizationResponse>}
   * @private
   */
  private async categorizeViaBackend(
    userId: string,
    audioBase64: string
  ): Promise<AICategorizationResponse> {
    const payload: CategorizationRequest = {
      userId,
      audioBase64,
      mimeType: 'audio/mp4',
    };

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORIZE_AUDIO}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro do servidor: ${response.status}`);
    }

    const data = await response.json();
    return this.validateResponse(data);
  }

  /**
   * Método alternativo: Usar Gemini API diretamente
   * Descomente e configure se preferir chamar o Gemini direto
   *
   * @param {string} audioBase64 - Áudio em base64
   * @returns {Promise<AICategorizationResponse>}
   * @private
   *
   * EXEMPLO (COMENTADO):
   * private async categorizeViaGemini(audioBase64: string): Promise<AICategorizationResponse> {
   *   const prompt = `
   *     Analise este áudio de transação financeira e extraia:
   *     1. Valor em reais (número)
   *     2. Categoria: 'Alimentação', 'Transporte', 'Compras', 'Contas' ou 'Saúde'
   *     3. Tipo: 'expense' (gasto) ou 'income' (ganho)
   *     4. Descrição breve
   *     5. Confiança (0-1)
   *
   *     Responda em JSON apenas.
   *   `;
   *
   *   // Implementar chamada à API Gemini aqui
   * }
   */

  /**
   * Gera uma categorização fictícia para desenvolvimento
   * Remove este método em produção
   *
   * @param {string} audioBase64 - Áudio em base64 (não usado no mock)
   * @returns {AICategorizationResponse} Resposta mockeada
   * @private
   */
  private generateMockCategorization(audioBase64: string): AICategorizationResponse {
    // Simula diferentes respostas baseadas no comprimento do base64
    // Em produção, isso virá da IA real
    const responses: AICategorizationResponse[] = [
      {
        amount: 45.99,
        category: 'Alimentação',
        type: 'expense',
        description: 'Almoço executivo',
        confidence: 0.95,
      },
      {
        amount: 150.0,
        category: 'Compras',
        type: 'expense',
        description: 'Compras em loja',
        confidence: 0.88,
      },
      {
        amount: 22.5,
        category: 'Transporte',
        type: 'expense',
        description: 'Corrida Uber',
        confidence: 0.92,
      },
      {
        amount: 89.9,
        category: 'Saúde',
        type: 'expense',
        description: 'Farmácia',
        confidence: 0.87,
      },
      {
        amount: 2500.0,
        category: 'Contas',
        type: 'income',
        description: 'Salário',
        confidence: 0.99,
      },
    ];

    // Retorna uma resposta aleatória
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Valida a resposta da IA
   * Garante que todos os campos obrigatórios estejam presentes
   *
   * @param {any} data - Dados a validar
   * @returns {AICategorizationResponse} Dados validados
   * @throws {Error} Se dados inválidos
   * @private
   */
  private validateResponse(data: any): AICategorizationResponse {
    const requiredFields = ['amount', 'category', 'type', 'description', 'confidence'];

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Campo obrigatório faltando: ${field}`);
      }
    }

    // Valida valores específicos
    if (typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('Valor inválido');
    }

    if (!['Alimentação', 'Transporte', 'Compras', 'Contas', 'Saúde'].includes(data.category)) {
      throw new Error('Categoria inválida');
    }

    if (!['expense', 'income'].includes(data.type)) {
      throw new Error('Tipo de transação inválido');
    }

    return {
      amount: data.amount,
      category: data.category as Category,
      type: data.type as TransactionType,
      description: data.description || 'Transação',
      confidence: Math.min(1, Math.max(0, data.confidence || 0.5)),
    };
  }

  /**
   * Alterna modo de mock
   * Útil para desenvolvimento e testes
   *
   * @param {boolean} useMock - Se deve usar mock
   */
  setUseMock(useMock: boolean): void {
    this.useLocalMock = useMock;
  }

  /**
   * Obtém status do modo de mock
   * @returns {boolean}
   */
  isUsingMock(): boolean {
    return this.useLocalMock;
  }
}

// Exporta instância única do serviço
export const aiService = AIService.getInstance();
