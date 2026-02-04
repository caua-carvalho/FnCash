/**
 * @file services/transactionService.ts
 * @description Serviço para gerenciar requisições de transações com o backend
 */

import { API_CONFIG } from '@/constants/api';
import { CreateTransactionPayload, Transaction, TransactionResponse } from '@/types/transaction';
import { fetchWithTimeout } from '@/utils/fetchWithTimeout';

export class TransactionService {
  private static instance: TransactionService;

  static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.JWT_SECRET}`, 
    };
  }

  async createTransaction(payload: CreateTransactionPayload): Promise<Transaction> {
    try {
      const response = await fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_TRANSACTION}`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(payload),
        },
        API_CONFIG.TIMEOUT
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `Erro ${response.status}`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao criar transação');
      }

      return data.data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout da requisição');
      }
      throw error;
    }
  }

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

      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSACTIONS}?${params.toString()}`;

      const response = await fetchWithTimeout(
        url,
        {
          method: 'GET',
          headers: this.getHeaders(),
        },
        API_CONFIG.TIMEOUT
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `Erro ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout da requisição');
      }
      throw error;
    }
  }

  async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const response = await fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_TRANSACTION(transactionId)}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        },
        API_CONFIG.TIMEOUT
      );

      if (!response.ok) {
        throw new Error(`Transação não encontrada (${response.status})`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao buscar transação');
      }

      return data.data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout da requisição');
      }
      throw error;
    }
  }

  async updateTransaction(
    transactionId: string,
    payload: Partial<CreateTransactionPayload>
  ): Promise<Transaction> {
    try {
      const response = await fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE_TRANSACTION(transactionId)}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify(payload),
        },
        API_CONFIG.TIMEOUT
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `Erro ${response.status}`);
      }

      const data: TransactionResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao atualizar transação');
      }

      return data.data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout da requisição');
      }
      throw error;
    }
  }

  async deleteTransaction(transactionId: string): Promise<boolean> {
    try {
      const response = await fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DELETE_TRANSACTION(transactionId)}`,
        {
          method: 'DELETE',
          headers: this.getHeaders(),
        },
        API_CONFIG.TIMEOUT
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `Erro ${response.status}`);
      }

      return true;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout da requisição');
      }
      throw error;
    }
  }
}

export const transactionService = TransactionService.getInstance();
