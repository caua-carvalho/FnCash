/**
 * @file app/index.tsx
 * @description Tela de Dashboard/Home
 * Exibe resumo financeiro e últimas transações
 *
 * USUÁRIO MOCK: "user-123" (substituir por autenticação real)
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
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Mock: ID do usuário (será substituído por autenticação real)
const USER_ID = 'user-123';

/**
 * Tela de Dashboard
 * Mostra resumo do mês e últimas 5 transações
 */
export default function DashboardScreen() {
  const router = useRouter();
  const { transactions, loading, error, loadTransactions } = useTransactions(USER_ID);

  /**
   * Recarrega transações quando a tela ganha foco
   * Garante dados atualizados ao retornar de outras telas
   */
  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  // Filtra transações do mês atual
  const monthTransactions = getCurrentMonthTransactions(transactions);

  // Últimas 5 transações (todas)
  const latestTransactions = transactions.slice(0, 5);

  const handleAddTransaction = () => {
    router.push('/add');
  };

  const handleViewAll = () => {
    router.push('/history');
  };

  const handleTransactionPress = (transactionId: string) => {
    // TODO: Implementar detalhes da transação
    console.log('Pressionar em transação:', transactionId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Resumo do Mês */}
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

      {/* Botão Flutuante de Ação */}
      <View style={styles.section}>
        <Button
          label="Adicionar Transação"
          variant="primary"
          size="large"
          fullWidth
          rightIcon="add"
          onPress={handleAddTransaction}
        />
      </View>

      {/* Seção de Transações Recentes */}
      <View style={styles.section}>
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

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#141414" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar transações</Text>
            <Text style={styles.errorDetail}>{error}</Text>
            <Button
              label="Tentar Novamente"
              variant="secondary"
              size="small"
              onPress={() => loadTransactions()}
            />
          </View>
        ) : latestTransactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma transação registrada</Text>
            <Text style={styles.emptySubtext}>
              Toque no botão abaixo para adicionar sua primeira transação
            </Text>
          </View>
        ) : (
          <FlatList
            data={latestTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                transaction={item}
                onPress={() => handleTransactionPress(item.id)}
                showRelativeDate
              />
            )}
            scrollEnabled={false}
          />
        )}
      </View>

      {/* Espaço para abas */}
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#141414',
  },
  loadingContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  retryButton: {
    marginTop: 8,
  },
  emptyContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
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
    maxWidth: 200,
  },
  spacer: {
    height: 40,
  },
});
