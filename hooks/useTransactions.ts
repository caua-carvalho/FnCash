/**
 * @file hooks/useTransactions.ts
 * @description Hook customizado para gerenciar transações
 * Encapsula lógica de busca e criação de transações
 */

import { transactionService } from '@/services';
import type { CreateTransactionPayload, Transaction } from '@/types/transaction';
import { useCallback, useEffect, useState } from 'react';

/**
 * Interface para o estado de transações
 * @interface TransactionsState
 */
export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook para gerenciar transações
 * Fornece métodos para buscar, criar e gerenciar transações
 *
 * @param {string} userId - ID do usuário
 * @returns {Object} Estado e métodos de controle
 * @example
 * const { transactions, createTransaction, loadTransactions } = useTransactions(userId);
 */
export function useTransactions(userId: string) {
  const [state, setState] = useState<TransactionsState>({
    transactions: [],
    loading: false,
    error: null,
  });

  /**
   * Carrega todas as transações do usuário
   * @param {Object} [filters] - Filtros opcionais
   * @returns {Promise<void>}
   */
  const loadTransactions = useCallback(
    async (filters?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    }) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const transactions = await transactionService.getTransactions(userId, filters);
        setState((prev) => ({
          ...prev,
          transactions,
          loading: false,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar transações';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
      }
    },
    [userId]
  );

  /**
   * Cria uma nova transação
   * @param {CreateTransactionPayload} payload - Dados da transação
   * @returns {Promise<Transaction|null>} Transação criada ou null em caso de erro
   */
  const createTransaction = useCallback(async (payload: CreateTransactionPayload) => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      const newTransaction = await transactionService.createTransaction(payload);

      // Atualiza a lista local
      setState((prev) => ({
        ...prev,
        transactions: [newTransaction, ...prev.transactions],
      }));

      return newTransaction;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar transação';
      setState((prev) => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, []);

  /**
   * Deleta uma transação
   * @param {string} transactionId - ID da transação
   * @returns {Promise<boolean>} Sucesso da operação
   */
  const deleteTransaction = useCallback(async (transactionId: string) => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      await transactionService.deleteTransaction(transactionId);

      // Remove da lista local
      setState((prev) => ({
        ...prev,
        transactions: prev.transactions.filter((t) => t.id !== transactionId),
      }));

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar transação';
      setState((prev) => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, []);

  /**
   * Carrega transações na montagem do componente
   */
  useEffect(() => {
    if (userId) {
      loadTransactions();
    }
  }, [userId, loadTransactions]);

  return {
    ...state,
    loadTransactions,
    createTransaction,
    deleteTransaction,
  };
}
