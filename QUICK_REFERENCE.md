/**
 * @file QUICK_REFERENCE.md
 * @description Guia de Referência Rápida
 */

# FnCash - Quick Reference

## 🎯 Importar & Usar

### Serviços
```typescript
import { audioService, aiService, transactionService } from '@/services';

// Audio
await audioService.startRecording();
const uri = await audioService.stopRecording();

// AI
const categorization = await aiService.categorizeAudio(userId, base64);

// Transactions
await transactionService.createTransaction(payload);
const txs = await transactionService.getTransactions(userId);
```

### Hooks
```typescript
import { useAudioRecorder, useTransactions } from '@/hooks';

// Audio
const { isRecording, startRecording, stopRecording, recordingTime } = useAudioRecorder();

// Transactions
const { transactions, loading, createTransaction } = useTransactions(userId);
```

### Componentes
```typescript
import { Button, TransactionCard, SummaryCard, CategorySelector } from '@/components';

<Button label="Click" onPress={() => {}} />
<TransactionCard transaction={tx} onPress={() => {}} />
<SummaryCard transactions={txs} />
<CategorySelector selected="Alimentação" onPress={(cat) => {}} />
```

### Utils
```typescript
import {
  formatCurrency,
  formatDate,
  formatTime,
  calculateTotal,
  calculateBalance,
  getCurrentMonthTransactions,
} from '@/utils';

formatCurrency(150.50);        // "R$ 150,50"
formatDate(new Date());        // "18 de janeiro de 2025"
formatTime(125);               // "02:05"
calculateTotal(txs);           // 1234.56
calculateBalance(txs);         // 500.00
```

### Constantes
```typescript
import { CATEGORIES, CATEGORY_CONFIG } from '@/constants/categories';
import { API_CONFIG, GEMINI_API_KEY } from '@/constants/api';

CATEGORIES; // ['Alimentação', 'Transporte', ...]
CATEGORY_CONFIG['Alimentação']; // { icon, color, label }
```

## 📋 Tipos
```typescript
import {
  Transaction,
  Category,
  TransactionType,
  AICategorizationResponse,
  CreateTransactionPayload,
} from '@/types/transaction';

const tx: Transaction = {
  id: 'tx-1',
  userId: 'user-123',
  amount: 100,
  category: 'Alimentação',
  type: 'expense',
  description: 'Almoço',
  date: new Date(),
};
```

## 🎤 Fluxo Áudio Completo

```typescript
// 1. Inicializar (uma vez)
await audioService.setupAudioSession();

// 2. Gravar
await audioService.startRecording();
// ... usuário fala
const uri = await audioService.stopRecording();

// 3. Converter
const base64 = await audioService.audioToBase64(uri);

// 4. Categorizar
const result = await aiService.categorizeAudio(userId, base64);

// 5. Salvar
await transactionService.createTransaction({
  userId,
  amount: result.amount,
  category: result.category,
  type: result.type,
  description: result.description,
  date: new Date().toISOString(),
  audioFile: base64,
});
```

## 🎙️ Áudio - Estados

```
┌─────────────────────┐
│    Não Gravando     │
└──────────┬──────────┘
           │
       [Start]
           │
           ▼
┌─────────────────────┐
│     Gravando        │
└──────────┬──────────┘
           │
      [Pause]
           │
           ▼
┌─────────────────────┐
│      Pausado        │
└──────────┬──────────┘
           │
      [Resume]
           │
           ▼
┌─────────────────────┐
│     Gravando        │
└──────────┬──────────┘
           │
       [Stop]
           │
           ▼
┌─────────────────────┐
│   Parado (URI)      │
└─────────────────────┘
```

## 📱 Navegação

```typescript
import { router } from 'expo-router';

router.push('/');           // Dashboard
router.push('/history');    // Histórico
router.push('/add');        // Adicionar
router.push('/settings');   // Configurações
router.replace('/');        // Voltar sem histórico
router.back();              // Voltar
```

## 🎨 Styles Pattern

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141414',
  },
});
```

## 🧩 Estrutura de Componente Típico

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## 🧩 Estrutura de Hook Típico

```typescript
import { useState, useCallback } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doSomething = useCallback(async () => {
    try {
      setLoading(true);
      // ... fazer algo
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro');
    } finally {
      setLoading(false);
    }
  }, []);

  return { state, loading, error, doSomething };
}
```

## 🧩 Estrutura de Serviço Típico

```typescript
export class MyService {
  private static instance: MyService;

  static getInstance(): MyService {
    if (!MyService.instance) {
      MyService.instance = new MyService();
    }
    return MyService.instance;
  }

  async doSomething(): Promise<void> {
    try {
      // ... implementar
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
}

export const myService = MyService.getInstance();
```

## 🔴 Colors

```
Primary (Preto):    #141414
Secondary (Cinza):  #6B7280
Light (Cinzento):   #F3F4F6 / #F9FAFB
Border:             #E5E7EB
Text:               #141414
Text Light:         #9CA3AF

Success (Verde):    #10B981
Danger (Vermelho):  #EF4444
Warning (Amarelo):  #F59E0B
Info (Azul):        #3B82F6
```

## 📏 Font Sizes

```
Headline (h1):  28px, weight 700
Title (h2):     18px, weight 700
Subtitle (h3):  16px, weight 600
Body:           14px, weight 500
Caption:        12px, weight 400
Small:          11px, weight 400
```

## 🎯 Categories Config

```typescript
CATEGORY_CONFIG['Alimentação'] = {
  icon: 'restaurant',
  color: '#EA7E22',
  colorLight: '#FFE5CC',
  label: 'Alimentação'
}
```

## 🔄 Request/Response Pattern

```typescript
// Request
const payload: CreateTransactionPayload = {
  userId: 'user-123',
  amount: 100,
  category: 'Alimentação',
  type: 'expense',
  description: 'Almoço',
  date: new Date().toISOString(),
};

// Response
const response: TransactionResponse = {
  success: true,
  data: { id: 'tx-1', ...payload },
};
```

## 🧪 Testing (Mock)

```typescript
// Habilitar mock
aiService.setUseMock(true);

// Desabilitar mock
aiService.setUseMock(false);

// Verificar status
if (aiService.isUsingMock()) {
  console.log('Usando dados fictícios');
}
```

## 🐛 Debug Tips

```typescript
// Ver logs
console.log('[API]', 'message');
console.log('[DEV MODE]', 'message');

// Ver estado
console.log({ state, loading, error });

// Usar React DevTools (se disponível)
// npm install react-devtools
// react-devtools
```

## 📦 File Structure Template

Quando criar novo arquivo:

1. **Comentário JSDoc** (início do arquivo)
2. **Imports** (react, react-native, libs, projeto)
3. **Interfaces/Types** (se aplicável)
4. **Classe/Função Principal** (comentada)
5. **Exports** (ao final)

```typescript
/**
 * @file path/name.ts
 * @description Descrição
 */

import React from 'react';
import { View } from 'react-native';

// Types
interface MyProps { ... }

// Main
export function MyComponent(props: MyProps) {
  return <View />;
}
```

## ✅ Checklist Antes de Commitar

- [ ] Código comentado/documentado
- [ ] Sem console.log() em prod
- [ ] TypeScript sem erros
- [ ] Componentes reutilizáveis
- [ ] Hooks customizados quando necessário
- [ ] Styles em StyleSheet
- [ ] Imports organizados
- [ ] Nomes descritivos
- [ ] Tratamento de erros

## 🚀 Deploy Checklist

- [ ] Mock desabilitado
- [ ] API URLs atualizadas
- [ ] Variáveis de ambiente configuradas
- [ ] Sem dados sensíveis hardcoded
- [ ] Performance otimizada
- [ ] Tratamento de erros completo
- [ ] Logs apropriados

---

**FnCash Quick Reference v1.0** 🚀
