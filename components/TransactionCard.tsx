/**
 * @file components/TransactionCard.tsx
 * @description Componente card para exibir uma transação individual
 * Reutilizável em histórico e dashboard
 */

import { CATEGORY_CONFIG, TRANSACTION_COLORS } from '@/constants/categories';
import type { Transaction } from '@/types/transaction';
import { formatCurrency, getRelativeDate } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Props do componente TransactionCard
 * @interface TransactionCardProps
 */
interface TransactionCardProps {
  /** Transação a exibir */
  transaction: Transaction;
  /** Callback quando o card é pressionado */
  onPress?: () => void;
  /** Se deve mostrar data relativa (Hoje, Ontem) */
  showRelativeDate?: boolean;
}

/**
 * Componente card para exibir transação
 * Mostra ícone, descrição, categoria, data e valor
 *
 * @component
 * @example
 * <TransactionCard
 *   transaction={transaction}
 *   onPress={() => handlePress()}
 * />
 */
export function TransactionCard({
  transaction,
  onPress,
  showRelativeDate = true,
}: TransactionCardProps) {
  const categoryConfig = CATEGORY_CONFIG[transaction.category];
  const isExpense = transaction.type === 'expense';
  const color = isExpense ? TRANSACTION_COLORS.expense : TRANSACTION_COLORS.income;
  const sign = isExpense ? '- ' : '+ ';
  const signColor = isExpense ? TRANSACTION_COLORS.expense : TRANSACTION_COLORS.income;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        {/* Ícone da categoria */}
        <View style={[styles.iconContainer, { backgroundColor: categoryConfig.colorLight }]}>
          <MaterialCommunityIcons
            name={categoryConfig.icon as any}
            size={24}
            color={categoryConfig.color}
          />
        </View>

        {/* Informações principais */}
        <View style={styles.infoContainer}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description}
          </Text>
          <View style={styles.metaContainer}>
            <Text style={styles.category}>{transaction.category}</Text>
            {/* Separador */}
            <Text style={styles.separator}>•</Text>
            <Text style={styles.date}>
              {showRelativeDate ? getRelativeDate(transaction.date) : transaction.date.toString()}
            </Text>
          </View>
        </View>

        {/* Valor */}
        <Text
          style={[
            styles.amount,
            { color: signColor }
          ]}
        >
          {sign}{formatCurrency(transaction.amount)}
        </Text>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141414',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  category: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  separator: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'right',
  },
});
