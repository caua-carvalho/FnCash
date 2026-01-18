/**
 * @file ARCHITECTURE.md
 * @description Documentação da Arquitetura e Estrutura do Projeto
 */

# FnCash - Arquitetura do Projeto

## 📁 Estrutura de Pastas

```
FnCash/
├── app/                      # Telas principais (Expo Router)
│   ├── _layout.tsx          # Navegação com Tabs
│   ├── index.tsx            # Dashboard/Home
│   ├── history.tsx          # Histórico de Transações
│   ├── add.tsx              # Adicionar Transação (Gravação de Áudio)
│   └── settings.tsx         # Configurações
│
├── components/              # Componentes React reutilizáveis
│   ├── Button.tsx           # Botão customizado (variantes, tamanhos)
│   ├── TransactionCard.tsx  # Card de transação
│   ├── SummaryCard.tsx      # Resumo financeiro
│   ├── CategorySelector.tsx # Seletor de categorias
│   └── index.ts             # Exportações
│
├── constants/               # Constantes da aplicação
│   ├── categories.ts        # Configuração de categorias (cores, ícones)
│   └── api.ts              # URLs e configurações de API
│
├── hooks/                   # Custom Hooks
│   ├── useAudioRecorder.ts  # Gerencia gravação de áudio
│   ├── useTransactions.ts   # Gerencia transações
│   └── use-color-scheme.ts  # Tema (fornecido)
│
├── services/                # Serviços (lógica de negócio)
│   ├── audioService.ts      # Gravação/reprodução com expo-av
│   ├── aiService.ts         # Integração com IA (Gemini mock)
│   ├── transactionService.ts # Requisições HTTP para backend
│   └── index.ts             # Exportações
│
├── types/                   # Tipos TypeScript
│   └── transaction.ts       # Interfaces de transações
│
├── utils/                   # Funções utilitárias
│   ├── formatting.ts        # Formatação de moeda, data, tempo
│   ├── calculations.ts      # Cálculos financeiros
│   └── index.ts             # Exportações
│
├── constants/
│   └── theme.ts            # Tema (fornecido)
│
└── package.json            # Dependências
```

## 🏗️ Padrões de Arquitetura

### 1. **Serviços (Services)**
Centralizam lógica de negócio e integração externa:
- `audioService`: Gerencia gravação/reprodução com expo-av
- `aiService`: Integração com IA (categorização)
- `transactionService`: Requisições HTTP (CRUD)

Todos usam **padrão Singleton** para garantir instância única.

### 2. **Custom Hooks**
Encapsulam estado e lógica reutilizável:
- `useAudioRecorder`: Controle de gravação
- `useTransactions`: CRUD e sincronização de transações

### 3. **Componentes Reutilizáveis**
Componentes agnósticos de contexto:
- `Button`: Múltiplas variantes e tamanhos
- `TransactionCard`: Exibe transação individual
- `SummaryCard`: Resumo de período
- `CategorySelector`: Seletor horizontal de categorias

### 4. **Tipos TypeScript**
Interfaces centralizadas em `types/transaction.ts`:
- `Transaction`: Modelo de transação
- `AICategorizationResponse`: Resposta da IA
- `CreateTransactionPayload`: Payload de criação

## 🔄 Fluxo de Dados - Adicionar Transação

```
[Tela Add] 
    ↓
[useAudioRecorder] → [audioService] → Grava áudio
    ↓
[aiService.categorizeAudio] → [Mock/Backend] → Categorização
    ↓
[Usuário confirma] → [useTransactions] → [transactionService] → Backend
    ↓
[Sucesso] → Router volta para Home
```

## 🎙️ Serviço de Áudio

### AudioService
```typescript
// Uso
const audio = audioService.getInstance();

// Gravar
await audio.startRecording();
await audio.pauseRecording();
await audio.resumeRecording();
const uri = await audio.stopRecording();

// Reproduzir
await audio.playAudio(uri);
await audio.stopAudio();

// Converter
const base64 = await audio.audioToBase64(uri);
```

**Configurações:**
- Taxa de amostragem: 16000 Hz
- Canal: Mono (1)
- Bitrate: 128 kbps
- Formato: M4A (AAC)

## 🤖 Serviço de IA

### AIService
```typescript
// Uso
const ai = aiService.getInstance();

// Categorizar áudio
const result = await ai.categorizeAudio(userId, audioBase64);

// Toggle mock (para testes)
ai.setUseMock(true);
```

**Response:**
```typescript
{
  amount: 150.50,
  category: "Compras",
  type: "expense",
  description: "Compras em loja",
  confidence: 0.92
}
```

**Modo Mock:** Retorna dados fictícios (para desenvolvimento)
**Backend Real:** Envia para `POST /api/ai/categorize`

## 💾 Serviço de Transações

### TransactionService
```typescript
// Uso
const transactionSvc = transactionService.getInstance();

// Criar
const tx = await transactionSvc.createTransaction(payload);

// Listar
const txs = await transactionSvc.getTransactions(userId, filters);

// Buscar
const tx = await transactionSvc.getTransaction(txId);

// Atualizar
const tx = await transactionSvc.updateTransaction(txId, updates);

// Deletar
await transactionSvc.deleteTransaction(txId);
```

## 📱 Fluxo de Telas

### Dashboard (index.tsx)
- Resumo do mês
- Últimas 5 transações
- Botão de ação rápida
- Link para histórico completo

### Histórico (history.tsx)
- Todas as transações
- Filtro por categoria
- Agrupado por data relativa (Hoje, Ontem, etc)

### Adicionar (add.tsx)
1. **Gravação**: Grava áudio com visualizador
2. **Processamento**: Envia para IA de categorização
3. **Confirmação**: Usuário confirma/edita dados
4. **Salvamento**: Envia para backend

### Configurações (settings.tsx)
- Informações do app
- Modo de teste (toggle mock)
- Documentação
- Informações de desenvolvimento

## 🔧 Integração com Backend

### Endpoints Esperados

```javascript
// Criar transação
POST /api/transactions
Body: {
  userId: string
  amount: number
  category: Category
  type: "expense" | "income"
  description: string
  date: ISO string
  audioFile?: string (base64)
}
Response: { success: boolean, data: Transaction, error?: string }

// Listar transações
GET /api/transactions?userId=xxx&startDate=xxx&endDate=xxx&category=xxx
Response: { success: boolean, data: Transaction[] }

// Categorizar áudio
POST /api/ai/categorize
Body: {
  userId: string
  audioBase64: string
  mimeType: string
}
Response: {
  amount: number
  category: Category
  type: "expense" | "income"
  description: string
  confidence: number
}
```

### Configuração de API

No arquivo `constants/api.ts`, atualize:

```typescript
API_CONFIG.BASE_URL = 'http://seu-backend.com/api';
GEMINI_API_KEY = 'sua-chave-api'; // ou env var
```

## 📊 Tipos de Dados

### Transaction
```typescript
{
  id: string                    // UUID
  userId: string               // ID do usuário
  amount: number               // Valor em reais
  category: Category           // Uma das 5 categorias
  type: "expense" | "income"   // Tipo
  description: string          // Descrição do usuário
  date: Date                   // Data da transação
  audioUrl?: string            // URL do áudio (opcional)
}
```

### Categorias
- **Alimentação**: Restaurantes, supermercado, comida
- **Transporte**: Uber, combustível, transportes públicos
- **Compras**: Roupas, eletrônicos, gerais
- **Contas**: Água, luz, internet, telefone
- **Saúde**: Farmácia, médico, academia

## 🎯 MVP Features

✅ Gravação de áudio
✅ Categorização automática com IA
✅ CRUD de transações
✅ Dashboard com resumo
✅ Histórico com filtros
✅ 5 categorias pré-definidas
✅ Suporte a ganhos e gastos
✅ Código bem documentado

## 🚀 Próximos Passos (Roadmap)

- [ ] Integração com Gemini API real
- [ ] Autenticação com Firebase
- [ ] Sincronização offline
- [ ] Gráficos de gastos por categoria
- [ ] Relatórios mensais/anuais
- [ ] Exportação de dados (CSV/PDF)
- [ ] Configurações de usuário
- [ ] Notificações de limites de gastos
- [ ] Dark mode
- [ ] Suporte a múltiplas moedas
- [ ] Agendamento de transações recorrentes

## 📝 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar Expo
npx expo start

# Usar app
# - iOS: Press 'i'
# - Android: Press 'a'
# - Web: Press 'w'
```

## 🔐 Variáveis de Ambiente

Crie arquivo `.env`:

```
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
EXPO_PUBLIC_API_BASE_URL=http://seu-backend.com/api
```

## 📚 Padrões de Código

### Comentários
- Arquivo: Descreve o módulo e sua responsabilidade
- Função: Documenta parâmetros e retorno
- Lógica complexa: Explica o porquê

### Nomenclatura
- Arquivos: snake_case (add.tsx)
- Componentes: PascalCase (TransactionCard.tsx)
- Variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE

### Type Safety
- Sempre typed (TypeScript)
- Interfaces para objetos
- Types para unions/primitivos

## 🐛 Debug

Modo verbose de logs:
```typescript
console.log('[API]', 'message');
console.log('[DEV MODE]', 'message');
```

Toggle modo mock nas configurações para testar sem backend.

---

**FnCash MVP v1.0.0** - Desenvolvido para gerenciar suas finanças com IA 🚀
