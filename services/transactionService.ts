/**
 * @file services/transactionService.ts
 * @description Serviço para gerenciar requisições de transações com o backend
 * Centraliza a comunicação com a API de transações
 */

import { API_CONFIG } from '@/constants/api';
import { CreateTransactionPayload, Transaction, TransactionResponse } from '@/types/transaction';

/**
 * Classe para gerenciar operações de transações
 */
export class TransactionService {
  private static instance: TransactionService;

  /**
   * Obtém instância única do serviço (singleton)
   * @returns {TransactionService} Instância do serviço
   */
  static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  /**
   * Cria uma nova transação no backend
   *
   * @param {CreateTransactionPayload} payload - Dados da transação a criar
   * @returns {Promise<Transaction>} Transação criada
   * @throws {Error} Se houver erro na requisição
   */
  async createTransaction(payload: CreateTransactionPayload): Promise<Transaction> {
    try {
      console.log('[API] Criando transação:', payload);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_TRANSACTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ${response.status}`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro desconhecido ao criar transação');
      }

      return data.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  }

  /**
   * Obtém todas as transações do usuário
   *
   * @param {string} userId - ID do usuário
   * @param {Object} [filters] - Filtros opcionais
   * @param {string} [filters.startDate] - Data inicial (ISO string)
   * @param {string} [filters.endDate] - Data final (ISO string)
   * @param {string} [filters.category] - Categoria para filtrar
   * @returns {Promise<Transaction[]>} Lista de transações
   * @throws {Error} Se houver erro na requisição
   */
  async getTransactions(
    userId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    }
  ): Promise<Transaction[]> {
    try {
      const params = new URLSearchParams({ userId });

      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);
      if (filters?.category) params.append('category', filters.category);

      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSACTIONS}`;

      console.log('[API] Buscando transações:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.JWT_SECRET}`,
        },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ${response.status}`);
      }

      const data = await response.json();
      return data as Transaction[];
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  }

  /**
   * Obtém uma transação específica por ID
   *
   * @param {string} transactionId - ID da transação
   * @returns {Promise<Transaction>} Transação encontrada
   * @throws {Error} Se a transação não existir ou houver erro
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSACTION(transactionId)}`;

      console.log('[API] Buscando transação:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`Transação não encontrada: ${response.status}`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao buscar transação');
      }

      return data.data;
    } catch (error) {
      console.error('Erro ao buscar transação:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma transação existente
   *
   * @param {string} transactionId - ID da transação
   * @param {Partial<CreateTransactionPayload>} payload - Dados a atualizar
   * @returns {Promise<Transaction>} Transação atualizada
   * @throws {Error} Se houver erro na requisição
   */
  async updateTransaction(
    transactionId: string,
    payload: Partial<CreateTransactionPayload>
  ): Promise<Transaction> {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE_TRANSACTION(transactionId)}`;

      console.log('[API] Atualizando transação:', url);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ${response.status}`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao atualizar transação');
      }

      return data.data;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      throw error;
    }
  }

  /**
   * Deleta uma transação
   *
   * @param {string} transactionId - ID da transação
   * @returns {Promise<boolean>} Sucesso da operação
   * @throws {Error} Se houver erro na requisição
   */
  async deleteTransaction(transactionId: string): Promise<boolean> {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DELETE_TRANSACTION(transactionId)}`;

      console.log('[API] Deletando transação:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Erro ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      throw error;
    }
  }
}

// Exporta instância única do serviço
export const transactionService = TransactionService.getInstance();
