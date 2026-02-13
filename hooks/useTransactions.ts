/**
 * @file hooks/useTransactions.ts
 * @description Hook para gerenciamento de transações
 */

import { transactionService } from '@/services';
import type { CreateTransactionPayload, Transaction } from '@/types/transaction';
import { useCallback, useEffect, useState } from 'react';

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export function useTransactions() {
  const [state, setState] = useState<TransactionsState>({
    transactions: [],
    loading: false,
    error: null,
  });

  /**
   * Carrega transações
   */
  const loadTransactions = useCallback(
    async (filters?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    }) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const transactions = await transactionService.getTransactions(filters);

        setState((prev) => ({
          ...prev,
          transactions,
          loading: false,
        }));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Erro';

        if (message === "SESSION_EXPIRED") {
          setState(prev => ({
            ...prev,
            error: "Sessão expirada"
          }));

          return;
        }

        setState(prev => ({
          ...prev,
          error: message
        }));
      }

    },
    []
  );

  /**
   * Cria transação
   */
  const createTransaction = useCallback(
    async (payload: CreateTransactionPayload) => {
      try {
        setState((prev) => ({ ...prev, error: null }));

        const newTransaction =
          await transactionService.createTransaction(payload);

        setState((prev) => ({
          ...prev,
          transactions: [newTransaction, ...prev.transactions],
        }));

        return newTransaction;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Erro ao criar transação';

        setState((prev) => ({ ...prev, error: message }));
        return null;
      }
    },
    []
  );

  /**
   * Deleta transação
   */
  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      try {
        setState((prev) => ({ ...prev, error: null }));

        await transactionService.deleteTransaction(transactionId);

        setState((prev) => ({
          ...prev,
          transactions: prev.transactions.filter(
            (t) => t.id !== transactionId
          ),
        }));

        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Erro ao deletar transação';

        setState((prev) => ({ ...prev, error: message }));
        return false;
      }
    },
    []
  );

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    ...state,
    loadTransactions,
    createTransaction,
    deleteTransaction,
  };
}
