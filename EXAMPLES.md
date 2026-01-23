/**
 * @file EXAMPLES.md
 * @description Exemplos de Código e Implementações
 */

# 📚 FnCash - Exemplos de Código

## 🎙️ Exemplo 1: Gravar Áudio Completo

```typescript
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { audioService } from '@/services';

function MyAudioComponent() {
  const {
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    pauseRecording,
    stopRecording,
  } = useAudioRecorder();

  const handleStart = async () => {
    try {
      await startRecording();
      console.log('Gravação iniciada');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleStop = async () => {
    try {
      const uri = await stopRecording();
      console.log('Áudio salvo em:', uri);
      
      // Converter para base64
      const base64 = await audioService.audioToBase64(uri);
      console.log('Base64 pronto para envio');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <View>
      <Text>{recordingTime}s</Text>
      <Button
        label={isRecording ? 'Stop' : 'Start'}
        onPress={isRecording ? handleStop : handleStart}
      />
    </View>
  );
}
```

## 🤖 Exemplo 2: Categorizar com IA

```typescript
import { aiService } from '@/services';

async function categorizeUserAudio(userId: string, audioBase64: string) {
  try {
    // Enviar para IA
    const result = await aiService.categorizeAudio(userId, audioBase64);

    console.log('Resultado da IA:');
    console.log(`- Valor: R$ ${result.amount}`);
    console.log(`- Categoria: ${result.category}`);
    console.log(`- Tipo: ${result.type}`);
    console.log(`- Descrição: ${result.description}`);
    console.log(`- Confiança: ${result.confidence * 100}%`);

    return result;
  } catch (error) {
    console.error('Erro na categorização:', error);
    throw error;
  }
}
```

## 💾 Exemplo 3: Salvar Transação

```typescript
import { transactionService } from '@/services';
import { CreateTransactionPayload } from '@/types/transaction';

async function saveTransaction(
  userId: string,
  audioBase64: string,
  categorization: AICategorizationResponse
) {
  try {
    const payload: CreateTransactionPayload = {
      userId,
      amount: categorization.amount,
      category: categorization.category,
      type: categorization.type,
      description: categorization.description,
      date: new Date().toISOString(),
      audioFile: audioBase64, // Opcional: enviar áudio
    };

    const transaction = await transactionService.createTransaction(payload);
    
    console.log('✓ Transação salva:', transaction.id);
    return transaction;
  } catch (error) {
    console.error('Erro ao salvar:', error);
    throw error;
  }
}
```

## 📱 Exemplo 4: Usar Hook de Transações

```typescript
import { useTransactions } from '@/hooks/useTransactions';

function MyTransactionsList({ userId }: { userId: string }) {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    deleteTransaction,
    loadTransactions,
  } = useTransactions(userId);

  // Recarregar ao abrir tela
  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [loadTransactions])
  );

  // Criar nova
  const handleCreate = async () => {
    const result = await createTransaction({
      userId,
      amount: 150.50,
      category: 'Alimentação',
      type: 'expense',
      description: 'Almoço',
      date: new Date().toISOString(),
    });

    if (result) {
      console.log('✓ Criada:', result.id);
    }
  };

  // Deletar
  const handleDelete = async (txId: string) => {
    const success = await deleteTransaction(txId);
    if (success) {
      console.log('✓ Deletada');
    }
  };

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <TransactionCard
          transaction={item}
          onPress={() => handleDelete(item.id)}
        />
      )}
    />
  );
}
```

## 🧮 Exemplo 5: Cálculos Financeiros

```typescript
import {
  calculateTotal,
  calculateBalance,
  calculateByCategory,
  getCurrentMonthTransactions,
  calculateStats,
} from '@/utils';

function MyFinancialDashboard({ transactions }: Props) {
  // Total de gastos
  const totalExpenses = calculateTotal(transactions, 'expense');
  
  // Total de ganhos
  const totalIncome = calculateTotal(transactions, 'income');
  
  // Saldo líquido
  const balance = calculateBalance(transactions);
  
  // Por categoria
  const byCategory = calculateByCategory(transactions, 'expense');
  
  // Mês atual
  const monthTxs = getCurrentMonthTransactions(transactions);
  
  // Estatísticas
  const stats = calculateStats(monthTxs);

  return (
    <View>
      <Text>Ganhos: {formatCurrency(totalIncome)}</Text>
      <Text>Gastos: {formatCurrency(totalExpenses)}</Text>
      <Text>Saldo: {formatCurrency(balance)}</Text>
      <Text>Alimentação: {formatCurrency(byCategory['Alimentação'])}</Text>
      <Text>Média: {formatCurrency(stats.average)}</Text>
    </View>
  );
}
```

## 🎨 Exemplo 6: Criar Componente Customizado

```typescript
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialSymbols } from 'expo-symbols';

interface CustomCardProps {
  icon: string;
  title: string;
  value: string;
  color: string;
  onPress?: () => void;
}

export function CustomCard({
  icon,
  title,
  value,
  color,
  onPress,
}: CustomCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Ícone colorido */}
      <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
        <MaterialSymbols name={icon} size={24} color={color} weight={500} />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
      </View>

      {/* Seta */}
      {onPress && (
        <MaterialSymbols name="arrow_forward" size={20} color="#D1D5DB" weight={500} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
});

// Uso:
<CustomCard
  icon="trending_up"
  title="Ganhos"
  value="R$ 5.000,00"
  color="#10B981"
  onPress={() => console.log('Clicou')}
/>
```

## 🔌 Exemplo 7: Integrar Backend Real

```typescript
// Antes (Mock)
const useLocalMock: boolean = true;

// Depois (Backend Real)
const useLocalMock: boolean = false;

// Arquivo: constants/api.ts
export const API_CONFIG = {
  // Mudar para seu backend real
  BASE_URL: 'https://seu-api.com/api',
  // ... resto do config
};

// Agora todas as requisições usam seu backend
const txs = await transactionService.getTransactions(userId);
// Faz: GET https://seu-api.com/api/transactions?userId=user-123
```

## 🧪 Exemplo 8: Testar Modo Mock/Real

```typescript
import { aiService } from '@/services';
import { Alert } from 'react-native';

function TestModeToggle() {
  const handleToggle = () => {
    const isMock = aiService.isUsingMock();
    aiService.setUseMock(!isMock);

    Alert.alert(
      'Modo Alterado',
      isMock
        ? 'Agora usando dados REAIS'
        : 'Agora usando dados FICTÍCIOS'
    );
  };

  return (
    <Button
      label={aiService.isUsingMock() ? 'Desativar Mock' : 'Ativar Mock'}
      onPress={handleToggle}
    />
  );
}
```

## 📊 Exemplo 9: Formatar Dados

```typescript
import {
  formatCurrency,
  formatDate,
  formatTime,
  getRelativeDate,
  groupByRelativeDate,
} from '@/utils';

// Moeda
formatCurrency(1234.56);           // "R$ 1.234,56"

// Data completa
formatDate(new Date());            // "18 de janeiro de 2025"

// Data curta
formatDate(new Date(), true);      // "18 de janeiro de 2025 às 14:30"

// Tempo
formatTime(3665);                  // "01:01:05"

// Relativa
getRelativeDate(new Date());       // "Hoje"
getRelativeDate(yesterday);        // "Ontem"

// Agrupar
const grouped = groupByRelativeDate(transactions);
// { "Hoje": [...], "Ontem": [...], "17 Jan": [...] }
```

## 🚀 Exemplo 10: Fluxo Completo de Adicionar

```typescript
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useTransactions } from '@/hooks/useTransactions';
import { audioService, aiService, transactionService } from '@/services';

const USER_ID = 'user-123';

async function CompleteFlow() {
  // 1. Gravar
  const { recordingUri, startRecording, stopRecording } = useAudioRecorder();

  await startRecording();
  // ... usuário fala ...
  const uri = await stopRecording();

  // 2. Converter
  const base64 = await audioService.audioToBase64(uri);

  // 3. Categorizar
  const categorization = await aiService.categorizeAudio(USER_ID, base64);

  // 4. Salvar
  const payload = {
    userId: USER_ID,
    amount: categorization.amount,
    category: categorization.category,
    type: categorization.type,
    description: categorization.description,
    date: new Date().toISOString(),
    audioFile: base64,
  };

  const transaction = await transactionService.createTransaction(payload);

  console.log('✅ Transação salva:', transaction.id);
  
  // 5. Voltar para home
  router.replace('/');
}
```

## 🎯 Exemplo 11: Componente com Estado Complexo

```typescript
import React, { useState, useCallback } from 'react';

interface ComplexComponentProps {
  initialData: string;
  onSave: (data: string) => Promise<void>;
}

export function ComplexComponent({
  initialData,
  onSave,
}: ComplexComponentProps) {
  const [text, setText] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    try {
      setError(null);
      setIsSaving(true);
      await onSave(text);
      console.log('✓ Salvo com sucesso');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro';
      setError(message);
      console.error('Erro:', err);
    } finally {
      setIsSaving(false);
    }
  }, [text, onSave]);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite aqui"
      />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <Button
        label="Salvar"
        onPress={handleSave}
        loading={isSaving}
        disabled={isSaving || !text}
      />
    </View>
  );
}
```

## 📝 Exemplo 12: Criar Serviço Customizado

```typescript
// services/myCustomService.ts
export class MyCustomService {
  private static instance: MyCustomService;
  private cache: Map<string, any> = new Map();

  static getInstance(): MyCustomService {
    if (!MyCustomService.instance) {
      MyCustomService.instance = new MyCustomService();
    }
    return MyCustomService.instance;
  }

  /**
   * Busca dados com cache
   * @param key Chave do cache
   * @param fetcher Função que busca os dados
   * @returns Dados (do cache ou novo)
   */
  async getWithCache<T>(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    // Verificar cache
    if (this.cache.has(key)) {
      console.log('[CACHE HIT]', key);
      return this.cache.get(key);
    }

    // Buscar novo
    console.log('[CACHE MISS]', key);
    const data = await fetcher();

    // Armazenar
    this.cache.set(key, data);
    return data;
  }

  /**
   * Limpar cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const myCustomService = MyCustomService.getInstance();
```

## ✨ Exemplo 13: Usar Contexto (Futuro)

```typescript
// Quando precisar compartilhar estado entre muitas telas
import React, { createContext, useContext, useState } from 'react';

interface TransactionContextType {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const TransactionContext = createContext<TransactionContextType>({
  selectedCategory: 'Alimentação',
  setSelectedCategory: () => {},
});

export function TransactionProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState('Alimentação');

  return (
    <TransactionContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('Use dentro do provider');
  }
  return context;
}

// Uso:
function MyScreen() {
  const { selectedCategory, setSelectedCategory } = useTransactionContext();
  return <Text>{selectedCategory}</Text>;
}
```

---

**FnCash - Exemplos de Código v1.0** 📚

Todos os exemplos podem ser copiados e adaptados!
