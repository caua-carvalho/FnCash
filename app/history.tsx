/**
 * @file app/history.tsx
 * @description Tela de Histórico de Transações
 * Exibe todas as transações com filtros e busca
 *
 * USUÁRIO MOCK: "user-123"
 */

import { TransactionCard } from '@/components';
import { CATEGORIES } from '@/constants/categories';
import { useTransactions } from '@/hooks/useTransactions';
import { groupByRelativeDate } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Mock: ID do usuário
const USER_ID = 'user-123';

/**
 * Tela de Histórico
 * Mostra todas as transações agrupadas por data
 * Suporta filtro por categoria
 */
export default function HistoryScreen() {
  const { transactions, loading, error, loadTransactions } = useTransactions(USER_ID);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * Recarrega transações quando a tela ganha foco
   */
  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  // Filtra transações por categoria se selecionada
  const filteredTransactions = selectedCategory
    ? transactions.filter((t) => t.category === selectedCategory)
    : transactions;

  // Agrupa transações por data relativa
  const groupedTransactions = groupByRelativeDate(filteredTransactions);
  const groupedKeys = Object.keys(groupedTransactions);

  return (
    <View style={styles.container}>
      {/* Filtros de categoria */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {/* Botão "Todas" */}
        <Pressable
          onPress={() => setSelectedCategory(null)}
          style={[
            styles.filterButton,
            selectedCategory === null && styles.filterButtonActive,
          ]}
        >
          <Text
            style={[
              styles.filterButtonText,
              selectedCategory === null && styles.filterButtonTextActive,
            ]}
          >
            Todas
          </Text>
        </Pressable>

        {/* Botões de categoria */}
        {CATEGORIES.map((category) => (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === category && styles.filterButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Lista de transações */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#141414" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="alert-outline" size={32} color="#EF4444" />
            <Text style={styles.errorText}>Erro ao carregar</Text>
            <Text style={styles.errorDetail}>{error}</Text>
          </View>
        ) : groupedKeys.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="receipt" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Nenhuma transação</Text>
            <Text style={styles.emptySubtext}>
              {selectedCategory ? `Nenhuma em ${selectedCategory}` : 'Comece a adicionar transações'}
            </Text>
          </View>
        ) : (
          groupedKeys.map((key) => (
            <View key={key} style={styles.dateGroup}>
              {/* Cabeçalho de data */}
              <View style={styles.dateHeader}>
                <Text style={styles.dateText}>{key}</Text>
                <Text style={styles.countText}>
                  {groupedTransactions[key].length} transação
                  {groupedTransactions[key].length !== 1 ? 's' : ''}
                </Text>
              </View>

              {/* Transações do dia */}
              {groupedTransactions[key].map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  showRelativeDate={false}
                />
              ))}
            </View>
          ))
        )}

        {/* Espaço para abas */}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#141414',
    borderColor: '#141414',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  loadingContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 8,
  },
  errorDetail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyContainer: {
    paddingVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  spacer: {
    height: 40,
  },
});
