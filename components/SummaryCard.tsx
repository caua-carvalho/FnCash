/**
 * @file components/SummaryCard.tsx
 * @description Componente para exibir resumo financeiro
 * Mostra ganhos, gastos e saldo
 */

import { Transaction } from '@/types/transaction';
import { calculateTotal } from '@/utils';
import { formatCurrency } from '@/utils/formatting';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TRANSACTION_COLORS } from '@/constants/categories';

/**
 * Props do componente SummaryCard
 * @interface SummaryCardProps
 */
interface SummaryCardProps {
  /** Array de transações para calcular resumo */
  transactions: Transaction[];
  /** Título do card */
  title?: string;
  /** Período do resumo (ex: "Outubro 2025") */
  period?: string;
}

/**
 * Componente para exibir resumo financeiro
 * Mostra ganhos, gastos e saldo lado a lado
 *
 * @component
 * @example
 * <SummaryCard
 *   transactions={transactions}
 *   title="Mês Atual"
 *   period="Outubro 2025"
 * />
 */
export function SummaryCard({
  transactions,
  title = 'Resumo',
  period = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
}: SummaryCardProps) {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  const balance = income - expenses;

  return (
    <View style={styles.container}>
      {/* Header com título e período */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>

      {/* Grid de informações */}
      <View style={styles.grid}>
        {/* Card de Ganhos */}
        <View style={styles.summaryItemContainer}>
          <View style={styles.summaryItem}>
            <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
              <MaterialCommunityIcons name="trending-up" size={20} color="#10B981" />
            </View>
            <Text style={styles.label}>Ganhos</Text>
            <Text style={styles.amount}>{formatCurrency(income)}</Text>
          </View>
        </View>

        {/* Card de Gastos */}
        <View style={styles.summaryItemContainer}>
          <View style={styles.summaryItem}>
            <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
              <MaterialCommunityIcons name="trending-down" size={20} color="#EF4444" />
            </View>
            <Text style={styles.label}>Gastos</Text>
            <Text style={styles.amount}>{formatCurrency(expenses)}</Text>
          </View>
        </View>
      </View>

      {/* Saldo */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo</Text>
        <Text style={[styles.balanceAmount, { color: balance <= 0 ?  TRANSACTION_COLORS.expense : TRANSACTION_COLORS.income }]}>
          {formatCurrency(Math.abs(balance))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  period: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryItemContainer: {
    flex: 1,
  },
  summaryItem: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#141414',
    textAlign: 'center',
  },
  balanceContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
});
