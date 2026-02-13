/**
 * @file services/transactionService.ts
*/

import { API_CONFIG } from '@/constants/api';
import { api } from '@/infra/http';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionResponse,
} from '@/types/transaction';


const { ENDPOINTS } = API_CONFIG;

class TransactionService {
  async createTransaction(
    payload: CreateTransactionPayload
  ): Promise<Transaction> {
    try {
      const { data } = await api.post<TransactionResponse>(
        ENDPOINTS.CREATE_TRANSACTION,
        payload
      );

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao criar transação');
      }

      return data.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getTransactions(filters?: {
    startDate?: string;
    endDate?: string;
    category?: string;
  }): Promise<Transaction[]> {
    try {
      const { data } = await api.get<Transaction[]>(
        ENDPOINTS.GET_TRANSACTIONS,
        { params: filters }
      );

      return data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const { data } = await api.get<TransactionResponse>(
        ENDPOINTS.GET_TRANSACTION(transactionId)
      );

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao buscar transação');
      }

      return data.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async updateTransaction(
    transactionId: string,
    payload: Partial<CreateTransactionPayload>
  ): Promise<Transaction> {
    try {
      const { data } = await api.put<TransactionResponse>(
        ENDPOINTS.UPDATE_TRANSACTION(transactionId),
        payload
      );

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Erro ao atualizar transação');
      }

      return data.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    try {
      await api.delete(
        ENDPOINTS.DELETE_TRANSACTION(transactionId)
      );
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `Erro ${error.response.status}`
      );
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout da requisição');
    }

    throw new Error('Erro inesperado na requisição');
  }
}

export const transactionService = new TransactionService();
