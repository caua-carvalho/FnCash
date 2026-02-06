# 💰 FnCash - Gerenciador Financeiro com IA

Um **MVP (Minimum Viable Product)** de aplicativo de gestão financeira desenvolvido com **Expo** e **React Native**, com foco em categorização automática de gastos através de **áudio e IA**.

## 🎯 Visão Geral

FnCash permite que usuários registrem seus gastos e receitas simplesmente **falando**. A IA categoriza automaticamente cada transação (Alimentação, Transporte, Compras, Contas, Saúde) e sincroniza com um backend.

### ✨ Features Principais

✅ **Gravação de Áudio** - Grave suas transações em formato M4A  
✅ **IA de Categorização** - Mock com suporte para integração Gemini  
✅ **Dashboard** - Resumo financeiro do mês atual  
✅ **Histórico** - Todas as transações com filtros por categoria  
✅ **Categorias** - 5 categorias pré-configuradas  
✅ **Ganhos e Gastos** - Suporte para ambos os tipos  
✅ **Código Bem Documentado** - JSDoc em todos os arquivos  
✅ **TypeScript** - Type-safe em todo o projeto  

## 🚀 Quick Start

### Instalação
```bash
cd FnCash
npm install
npx expo install expo-av expo-file-system expo-router expo-symbols
npx expo start
```

### Executar
```bash
# iOS (Mac)
Press i

# Android
Press a

# Web
Press w
```

## 📁 Estrutura do Projeto

```
FnCash/
├── app/                    # Telas (Expo Router)
│   ├── index.tsx          # Dashboard
│   ├── history.tsx        # Histórico
│   ├── add.tsx            # Adicionar (PRINCIPAL)
│   └── settings.tsx       # Configurações
├── services/              # Lógica de negócio
│   ├── audioService.ts    # Gravação com expo-av
│   ├── aiService.ts       # Categorização (mock/real)
│   └── transactionService.ts # API
├── components/            # Componentes reutilizáveis
├── hooks/                 # Custom hooks
├── utils/                 # Formatação e cálculos
├── constants/             # Categorias e config
└── types/                 # Interfaces TypeScript
```

## 📚 Documentação

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Como executar e testar
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura e padrões
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Integrar seu backend

## 🎙️ Fluxo Principal (Adicionar Transação)

1. **Gravação**: Usuário toca e grava áudio
2. **Processamento**: App envia para IA
3. **Categorização**: IA retorna categoria, valor, descrição
4. **Confirmação**: Usuário confirma e edita se necessário
5. **Salvamento**: Transação é enviada ao backend

```
[Gravar Áudio] → [IA Categoriza] → [Confirmar] → [Backend Salva]
```

## 🔧 Serviços Principais

### AudioService
```typescript
const audio = audioService.getInstance();
await audio.startRecording();
const uri = await audio.stopRecording();
const base64 = await audio.audioToBase64(uri);
```

### AIService
```typescript
const ai = aiService.getInstance();
const result = await ai.categorizeAudio(userId, audioBase64);
// { amount, category, type, description, confidence }
```

### TransactionService
```typescript
const tx = transactionService.getInstance();
await tx.createTransaction(payload);
const transactions = await tx.getTransactions(userId);
```

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Dashboard** | Resumo do mês + últimas 5 transações |
| **Histórico** | Todas as transações com filtros |
| **Adicionar** | Fluxo de gravação e categorização |
| **Configurações** | Info do app e modo teste |

## 🎨 Categorias

- **Alimentação** 🍔
- **Transporte** 🚗
- **Compras** 🛍️
- **Contas** 💳
- **Saúde** ❤️

## 🧪 Testando

### Sem Backend (Padrão)
O app vem com **mock habilitado**. Tudo funciona localmente com dados fictícios.

### Com Backend Real
Ver [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) para implementar seu backend.

## 💡 MVP vs Production

Este é um **MVP completo e funcional**. Para production, adicione:

- [ ] Autenticação (Firebase/OAuth)
- [ ] Sincronização offline
- [ ] Gráficos e relatórios
- [ ] Gemini API real
- [ ] Export de dados (PDF/CSV)
- [ ] Notificações
- [ ] Dark mode

## 🔌 Integração com Backend

Endpoints esperados:

```
POST /api/transactions       # Criar
GET  /api/transactions       # Listar
GET  /api/transactions/:id   # Buscar
PUT  /api/transactions/:id   # Atualizar
DELETE /api/transactions/:id # Deletar
POST /api/ai/categorize      # IA (categorizar áudio)
```

Ver [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) para detalhes.

## 🏗️ Padrões de Código

### Serviços (Singleton)
```typescript
export class MyService {
  private static instance: MyService;
  
  static getInstance() {
    if (!MyService.instance) {
      MyService.instance = new MyService();
    }
    return MyService.instance;
  }
}
```

### Custom Hooks
```typescript
export function useAudioRecorder() {
  const [state, setState] = useState(...);
  // ... lógica
  return { state, methods };
}
```

### Componentes Reutilizáveis
```typescript
export function TransactionCard({ transaction, onPress }: Props) {
  // Componente agnóstico, pode usar em qualquer lugar
}
```

## 📝 Comentários & Documentação

Todos os arquivos incluem:

- **JSDoc** no início (descrição e responsabilidade)
- **Parâmetros e retorno** documentados
- **Exemplos de uso** quando relevante
- **Comentários inline** para lógica complexa

```typescript
/**
 * @file services/audioService.ts
 * @description Serviço para gravação de áudio com expo-av
 */

/**
 * Inicia uma nova gravação
 * @returns {Promise<string>} Mensagem de sucesso
 * @throws {Error} Se não conseguir acessar o microfone
 */
async startRecording(): Promise<string> { ... }
```

## 🛠️ Stack Técnico

- **Framework**: Expo 51
- **Linguagem**: TypeScript
- **UI**: React Native + Material Symbols
- **Áudio**: expo-av
- **Roteamento**: Expo Router
- **Estado**: React Hooks
- **API**: Fetch (nativo)

## 📊 Arquivos de Configuração

### constants/api.ts
```typescript
BASE_URL: 'http://seu-backend.com/api'
GEMINI_API_KEY: 'sua-chave'
```

### .env (opcional)
```
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000/api
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave
```

## 🎓 Aprendizado

Este projeto é ótimo para aprender:

- ✅ Estrutura profissional com Expo
- ✅ Padrões de código (Singleton, Custom Hooks)
- ✅ TypeScript em React Native
- ✅ Arquitetura modular e escalável
- ✅ Integração com APIs
- ✅ Manipulação de áudio
- ✅ Navegação com Expo Router
- ✅ Componentes reutilizáveis

## 🚀 Próximas Etapas

1. **Executar**: `npx expo start`
2. **Explorar**: Testar todas as telas
3. **Entender**: Ler `ARCHITECTURE.md`
4. **Integrar**: Seguir `INTEGRATION_GUIDE.md`
5. **Expandir**: Adicionar features (gráficos, etc)

## 📄 Licença

MVP desenvolvido para fins educacionais e de prototipagem.

---

**FnCash MVP v1.0.0** - Gerenciar suas finanças nunca foi tão fácil! 💰🚀
