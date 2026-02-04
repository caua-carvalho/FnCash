/**
 * @file utils/calculations.ts
 * @description Funções utilitárias para cálculos financeiros
 * Centraliza lógica de cálculos de somas, médias e resumos
 */

import { Transaction, TransactionType } from '@/types/transaction';

/**
 * Calcula o total de todas as transações
 * @param {Transaction[]} transactions - Array de transações
 * @param {string} [type] - Filtrar por tipo ('expense' ou 'income')
 * @returns {number} Total calculado
 * @example
 * calculateTotal(transactions) // 1234.56
 * calculateTotal(transactions, 'expense') // 950.00
 */
export function calculateTotal(
  transactions: Transaction[],
  type: TransactionType
): number {
  return transactions
    .filter(t => t.type === type)
    .reduce((total, t) => {
      const value = Number(t.amount);

      if (!Number.isFinite(value)) {
        return total; // ignora dado inválido
      }

      return total + value;
    }, 0);
}

/**
 * Calcula o saldo líquido (ganhos - gastos)
 * @param {Transaction[]} transactions - Array de transações
 * @returns {number} Saldo líquido
 * @example
 * calculateBalance(transactions) // 284.56
 */
export function calculateBalance(transactions: Transaction[]): number {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  return income - expenses;
}

/**
 * Agrupa transações por categoria e calcula total por categoria
 * @param {Transaction[]} transactions - Array de transações
 * @param {string} [type] - Filtrar por tipo de transação
 * @returns {Object} Totais agrupados por categoria
 * @example
 * calculateByCategory(transactions, 'expense')
 * // { "Alimentação": 150.00, "Transporte": 100.00, ... }
 */
export function calculateByCategory(
  transactions: Transaction[],
  type?: 'expense' | 'income'
): Record<string, number> {
  const filtered = transactions.filter((t) => !type || t.type === type);

  return filtered.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>
  );
}

/**
 * Calcula estatísticas básicas de um período
 * @param {Transaction[]} transactions - Array de transações
 * @returns {Object} Estatísticas do período
 * @example
 * calculateStats(transactions)
 * // { income: 5000, expenses: 2500, balance: 2500, count: 10, average: 250 }
 */
export function calculateStats(transactions: Transaction[]) {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  const balance = income - expenses;
  const count = transactions.length;
  const average = count > 0 ? (income + expenses) / count : 0;

  return {
    income,
    expenses,
    balance,
    count,
    average,
  };
}

/**
 * Filtra transações por período (mês/ano)
 * @param {Transaction[]} transactions - Array de transações
 * @param {number} month - Mês (1-12)
 * @param {number} year - Ano (ex: 2025)
 * @returns {Transaction[]} Transações do período
 * @example
 * getTransactionsByMonth(transactions, 10, 2025) // outubro de 2025
 */
export function getTransactionsByMonth(
  transactions: Transaction[],
  month: number,
  year: number
): Transaction[] {
  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === month - 1 && date.getFullYear() === year;
  });
}

/**
 * Filtra transações por período (data inicial e final)
 * @param {Transaction[]} transactions - Array de transações
 * @param {Date} startDate - Data inicial
 * @param {Date} endDate - Data final
 * @returns {Transaction[]} Transações do período
 * @example
 * getTransactionsByPeriod(transactions, new Date('2025-10-01'), new Date('2025-10-31'))
 */
export function getTransactionsByPeriod(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] {
  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startDate && date <= endDate;
  });
}

/**
 * Obtém transações do mês atual
 * @param {Transaction[]} transactions - Array de transações
 * @returns {Transaction[]} Transações do mês atual
 */
export function getCurrentMonthTransactions(transactions: Transaction[]): Transaction[] {
  const now = new Date();
  return getTransactionsByMonth(transactions, now.getMonth() + 1, now.getFullYear());
}

/**
 * Obtém transações dos últimos N dias
 * @param {Transaction[]} transactions - Array de transações
 * @param {number} days - Número de dias
 * @returns {Transaction[]} Transações dos últimos N dias
 * @example
 * getLastDaysTransactions(transactions, 7) // últimos 7 dias
 */
export function getLastDaysTransactions(transactions: Transaction[], days: number): Transaction[] {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const endDate = new Date();

  return getTransactionsByPeriod(transactions, startDate, endDate);
}
