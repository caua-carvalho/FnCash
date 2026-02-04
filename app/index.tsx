/**
 * @file app/index.tsx
 * @description Tela de Dashboard/Home
 */

import { Button, SummaryCard, TransactionCard } from '@/components';
import { useTransactions } from '@/hooks/useTransactions';
import { getCurrentMonthTransactions } from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ⚠️ MOCK — depois substituir por auth real
const USER_ID = '21603a56-2bf2-4a69-a109-a8ef3baac986';

export default function DashboardScreen() {
  const router = useRouter();
  const { transactions, loading, error, loadTransactions } =
    useTransactions(USER_ID);

  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  const monthTransactions = getCurrentMonthTransactions(transactions);
  const latestTransactions = transactions.slice(0, 5);
  console.log('Transações:', latestTransactions);

  const handleAddTransaction = () => {
    router.push('/add');
  };

  const handleViewAll = () => {
    router.push('/history');
  };

  const handleTransactionPress = (transactionId: string) => {
    console.log('Transação:', transactionId);
  };

  return (
    <FlatList
      data={latestTransactions}
      keyExtractor={(item) => item.id}
      scrollEnabled
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          {/* Resumo */}
          <View style={styles.section}>
            <SummaryCard
              transactions={monthTransactions}
              title="Resumo"
              period={new Date().toLocaleDateString('pt-BR', {
                month: 'long',
                year: 'numeric',
              })}
            />
          </View>

          {/* Botão */}
          <View style={styles.section}>
            <Button
              label="Adicionar Transação"
              variant="primary"
              size="large"
              fullWidth
              onPress={handleAddTransaction}
            />
          </View>

          {/* Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            {latestTransactions.length > 0 && (
              <Button
                label="Ver Todos"
                variant="ghost"
                size="small"
                onPress={handleViewAll}
              />
            )}
          </View>

          {/* Estados */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#141414" />
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Erro ao carregar transações</Text>
              <Text style={styles.errorDetail}>{error}</Text>
              <Button
                label="Tentar Novamente"
                variant="secondary"
                size="small"
                onPress={loadTransactions}
              />
            </View>
          )}

          {!loading && !error && latestTransactions.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma transação registrada</Text>
              <Text style={styles.emptySubtext}>
                Adicione sua primeira transação
              </Text>
            </View>
          )}
        </>
      }
      renderItem={({ item }) => (
        <TransactionCard
          transaction={item}
          onPress={() => handleTransactionPress(item.id)}
          showRelativeDate
        />
      )}
      ListFooterComponent={<View style={styles.spacer} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#141414',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  errorContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 4,
  },
  errorDetail: {
    fontSize: 12,
    color: '#7F1D1D',
    marginBottom: 12,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
});
