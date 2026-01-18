import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function HomeScreen() {
  const [isDark, setIsDark] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const theme = {
    bg: isDark ? '#191919' : '#FFFFFF',
    cardBg: isDark ? '#262626' : '#F9FAFB',
    text: isDark ? '#FFFFFF' : '#141414',
    textSecondary: isDark ? '#9CA3AF' : '#757575',
    border: isDark ? '#404040' : '#E5E7EB',
    accent: '#2E7D32',
    accentLight: '#E8F5E9',
  };

  const transactions = [
    { 
      id: 1, 
      name: "McDonald's", 
      amount: 45.00, 
      category: 'Alimentação', 
      date: 'Hoje, 12:30', 
      icon: 'food' as const,
      iconColor: '#F97316',
      bgColor: '#FED7AA40'
    },
    { 
      id: 2, 
      name: 'Uber', 
      amount: 22.50, 
      category: 'Transporte', 
      date: 'Ontem', 
      icon: 'car' as const,
      iconColor: '#6B7280',
      bgColor: '#E5E7EB'
    },
    { 
      id: 3, 
      name: 'Zara', 
      amount: 150.00, 
      category: 'Compras', 
      date: '12 Out', 
      icon: 'shopping' as const,
      iconColor: '#9333EA',
      bgColor: '#E9D5FF40'
    },
    { 
      id: 4, 
      name: 'Conta de Água', 
      amount: 89.90, 
      category: 'Contas', 
      date: '10 Out', 
      icon: 'water' as const,
      iconColor: '#3B82F6',
      bgColor: '#DBEAFE40'
    },
    { 
      id: 5, 
      name: 'Supermercado Dia', 
      amount: 32.10, 
      category: 'Mercado', 
      date: '08 Out', 
      icon: 'store' as const,
      iconColor: '#2E7D32',
      bgColor: '#E8F5E940',
      opacity: 0.6
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.cardBg }]}
          >
            <MaterialCommunityIcons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.monthSelector, { 
              backgroundColor: theme.cardBg, 
              borderColor: theme.border 
            }]}
          >
            <Text style={[styles.monthText, { color: theme.textSecondary }]}>
              OUTUBRO 2023
            </Text>
            <MaterialCommunityIcons 
              name="chevron-down" 
              size={16} 
              color={theme.textSecondary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: theme.cardBg }]}
          >
            <MaterialCommunityIcons name="bell" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
            Gasto este mês
          </Text>
          <View style={styles.balanceRow}>
            <Text style={[styles.balanceAmount, { color: theme.text }]}>
              R$ 3.450
            </Text>
            <Text style={[styles.balanceCents, { color: theme.textSecondary }]}>
              ,00
            </Text>
          </View>
          <View style={styles.percentageBadge}>
            <MaterialCommunityIcons 
              name="trending-up" 
              size={14} 
              color="#DC2626" 
            />
            <Text style={styles.percentageText}>+12% vs. set</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {/* Orçamento Card */}
          <View style={[styles.statCard, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.border 
          }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: theme.accentLight }]}>
                <MaterialCommunityIcons 
                  name="piggy-bank" 
                  size={14} 
                  color={theme.accent} 
                />
              </View>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Orçamento
              </Text>
            </View>
            <Text style={[styles.statAmount, { color: theme.text }]}>
              R$ 5.000
            </Text>
            <View style={[styles.progressBar, { 
              backgroundColor: isDark ? '#404040' : '#E5E7EB' 
            }]}>
              <View style={[styles.progressFill, { 
                backgroundColor: theme.text, 
                width: '69%' 
              }]} />
            </View>
          </View>

          {/* Fatura Card */}
          <View style={[styles.statCard, { 
            backgroundColor: theme.cardBg, 
            borderColor: theme.border 
          }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { 
                backgroundColor: isDark ? '#1E3A8A20' : '#DBEAFE' 
              }]}>
                <MaterialCommunityIcons 
                  name="credit-card" 
                  size={14} 
                  color={isDark ? '#60A5FA' : '#3B82F6'} 
                />
              </View>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Fatura
              </Text>
            </View>
            <Text style={[styles.statAmount, { color: theme.text }]}>
              R$ 1.250
            </Text>
            <Text style={[styles.statNote, { color: theme.textSecondary }]}>
              Fecha em 5 dias
            </Text>
          </View>
        </View>

        {/* Transactions Header */}
        <View style={styles.transactionsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Gastos recentes
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllButton, { color: theme.accent }]}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id}
              style={[
                styles.transactionItem, 
                { 
                  backgroundColor: theme.cardBg,
                  opacity: transaction.opacity || 1
                }
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.transactionIcon, { 
                backgroundColor: transaction.bgColor 
              }]}>
                <MaterialCommunityIcons 
                  name={transaction.icon} 
                  size={24} 
                  color={transaction.iconColor} 
                />
              </View>
              
              <View style={styles.transactionDetails}>
                <View style={styles.transactionRow}>
                  <Text style={[styles.transactionName, { color: theme.text }]}>
                    {transaction.name}
                  </Text>
                  <Text style={[styles.transactionAmount, { color: theme.text }]}>
                    - R$ {transaction.amount.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
                <View style={styles.transactionRow}>
                  <Text style={[styles.transactionCategory, { 
                    color: theme.textSecondary 
                  }]}>
                    {transaction.category}
                  </Text>
                  <Text style={[styles.transactionDate, { 
                    color: theme.textSecondary 
                  }]}>
                    {transaction.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
          <TouchableOpacity 
            style={[styles.fab, { 
              backgroundColor: isDark ? '#FFFFFF' : '#141414',
              shadowColor: isDark ? '#FFFFFF' : '#141414',
            }]}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="microphone" 
              size={32} 
              color={theme.accent} 
            />
          </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { 
        backgroundColor: `${theme.bg}CC`, 
        borderTopColor: theme.border 
      }]}>
        <TouchableOpacity style={styles.navButton}>
          <MaterialCommunityIcons name="home" size={24} color={theme.text} />
          <Text style={[styles.navLabel, { color: theme.text }]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <MaterialCommunityIcons 
            name="chart-pie" 
            size={24} 
            color={theme.textSecondary} 
          />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            Análise
          </Text>
        </TouchableOpacity>
        
        <View style={{ width: 48 }} />
        
        <TouchableOpacity style={styles.navButton}>
          <MaterialCommunityIcons 
            name="wallet" 
            size={24} 
            color={theme.textSecondary} 
          />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            Carteira
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => setIsDark(!isDark)}
        >
          <MaterialCommunityIcons 
            name="cog" 
            size={24} 
            color={theme.textSecondary} 
          />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            Ajustes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  monthText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  balanceSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
  },
  balanceCents: {
    fontSize: 28,
  },
  percentageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
    gap: 4,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  statNote: {
    fontSize: 10,
    marginTop: 4,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllButton: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionsList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    gap: 16,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    gap: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 12,
    pointerEvents: 'box-none',
    zIndex: 10,
  },
  fabHint: {
    backgroundColor: '#141414E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  fabHintText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: 'center',
    gap: 4,
    width: 48,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});