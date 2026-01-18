/**
 * @file SETUP_GUIDE.md
 * @description Guia de Setup e Execução do Projeto
 */

# FnCash - Guia de Setup

## 📋 Pré-requisitos

- Node.js 18+ e npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (para emulador Android) ou Xcode (para iOS)
- Conta no Expo (opcional, para publicar)

## 🚀 Instalação Rápida

### 1. Clonar/Copiar Projeto
```bash
cd FnCash
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Instalar Dependências Expo Necessárias
```bash
npx expo install expo-av
npx expo install expo-file-system
npx expo install expo-router
npx expo install expo-symbols
```

### 4. Iniciar App
```bash
npx expo start
```

### 5. Executar
```bash
# iOS (Mac)
Press i

# Android
Press a

# Web
Press w

# EAS (nuvem)
Press e
```

## 🛠️ Configuração Adicional

### Variáveis de Ambiente

Criar arquivo `.env` na raiz:

```bash
# API
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:3000/api

# Gemini (quando integrar)
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
```

### Permissões (Android/iOS)

As permissões estão configuradas automaticamente:
- **Áudio**: `expo-av` solicita no runtime
- **Armazenamento**: `expo-file-system` gerencia

## 📱 Estrutura Básica para Testes

### Sem Backend (Recomendado para Começar)

O app já vem com **mock habilitado** por padrão:

1. Abrir app → Aba "Adicionar"
2. Gravar áudio ou preencher manualmente
3. IA categoriza automaticamente (fake)
4. Transação é "salva" em memória (não persiste)

### Com Backend (Production Ready)

Ver `INTEGRATION_GUIDE.md` para implementar seu backend.

## 🗂️ Arquivos Principais

### Telas (app/)
- `index.tsx` - Dashboard inicial
- `history.tsx` - Histórico completo
- `add.tsx` - Adicionar transação (PRINCIPAL)
- `settings.tsx` - Configurações

### Serviços (services/)
- `audioService.ts` - Gravação de áudio
- `aiService.ts` - Categorização (mock/real)
- `transactionService.ts` - API REST

### Componentes (components/)
- `Button.tsx` - Botão com múltiplas variantes
- `TransactionCard.tsx` - Card de transação
- `SummaryCard.tsx` - Resumo financeiro
- `CategorySelector.tsx` - Seletor de categorias

### Utilitários (utils/)
- `formatting.ts` - Formatar moeda, data, tempo
- `calculations.ts` - Cálculos financeiros

## 🧪 Fluxo de Teste Completo

### Teste 1: Adicionar Transação via Áudio

1. Ir para aba "Adicionar"
2. Clicar no botão de gravação
3. Gravar audio: "Almocei por cinquenta reais"
4. Clicar "Concluir"
5. App categoriza automaticamente
6. Confirmar dados
7. ✓ Transação "salva"

### Teste 2: Ver Dashboard

1. Ir para aba "Início"
2. Ver resumo do mês
3. Ver últimas 5 transações
4. Clicar "Ver Todos"

### Teste 3: Filtrar Histórico

1. Ir para aba "Histórico"
2. Clicar em categoria (ex: "Alimentação")
3. Ver apenas transações daquela categoria

### Teste 4: Modo Mock

1. Ir para aba "Ajustes"
2. Clicar "Modo de Teste"
3. Toggle on/off para usar dados reais ou fictícios

## 📊 Categorias Disponíveis

```
1. Alimentação  (🍔) - Restaurants, comida
2. Transporte   (🚗) - Uber, combustível, ônibus
3. Compras      (🛍️)  - Roupas, eletrônicos, etc
4. Contas       (💳) - Água, luz, internet
5. Saúde        (❤️)  - Farmácia, médico, academia
```

## 🎯 Fluxo de Desenvolvimento Recomendado

### Fase 1: Mock Local (Agora)
```
✓ Testar UI/UX com dados fictícios
✓ Testar gravação de áudio
✓ Testar navegação
```

### Fase 2: Backend Local
```
□ Implementar Node/Express local
□ Configurar endpoints
□ Substituir API_CONFIG
□ Desabilitar mock
□ Testar com dados reais
```

### Fase 3: Backend Production
```
□ Deploy backend (Heroku, Railway, etc)
□ Configurar CORS
□ Adicionar autenticação
□ Testar em staging
```

### Fase 4: Gemini Real
```
□ Obter chave Gemini API
□ Implementar categorização real
□ Testar qualidade
□ Deploy
```

## 🔍 Debug & Troubleshooting

### Ver Logs

Abrir console do Expo:
```bash
# Terminal onde expo start foi executado
# Logs aparecem em tempo real
```

### Logs Específicos

```typescript
// Já inclusos no código:
console.log('[API]', 'message');
console.log('[DEV MODE]', 'message');
```

### Resetar App

```bash
# Limpar cache
npx expo r -c

# Reinstalar
rm -rf node_modules
npm install
```

### Erro: Permission Denied (Áudio)

Verificar permissões:
- Android: Settings → Apps → FnCash → Permissions
- iOS: Settings → FnCash → Microphone

## 📈 Performance

### Otimizações Implementadas

✓ Lazy loading de telas (Expo Router)
✓ Memoização de componentes
✓ Hooks customizados reutilizáveis
✓ Paginação de listas (planned)

### Para Melhorar

```typescript
// Adicionar FlatList em vez de ScrollView
// Implementar React.memo() em componentes
// Usar useCallback para funções
// Implementar cache de requisições
```

## 📦 Dependências Principais

```json
{
  "expo": "^51.0",
  "react": "^18.0",
  "react-native": "^0.73",
  "expo-av": "^14.0",
  "expo-file-system": "^16.0",
  "expo-router": "^3.0",
  "expo-symbols": "^1.0"
}
```

Nenhuma dependência pesada como Redux ou Zustand (simples por enquanto).

## 🚢 Deploy (Futuro)

### Expo EAS (Recomendado)

```bash
# Setup
eas build --platform ios
eas build --platform android

# Submeter stores
eas submit --platform ios
eas submit --platform android
```

### APK Local (Android)

```bash
eas build --platform android --local
```

## 📝 Convenções de Código

### Nomenclatura Arquivos
```
Componentes: PascalCase.tsx
Telas: kebab-case.tsx (index.tsx, add.tsx)
Serviços: camelCase.ts
Tipos: kebab-case.ts
Constantes: kebab-case.ts
```

### Comentários

```typescript
/**
 * Descrição do arquivo/função
 * @param name Descrição do parâmetro
 * @returns Descrição do retorno
 */

// Comentários inline para lógica complexa
const result = value * 2; // Multiplicar por 2
```

### Imports

```typescript
// Grupos de imports (ordem recomendada)
import React from 'react';
import { View, Text } from 'react-native';

import { CATEGORIES } from '@/constants';
import { formatCurrency } from '@/utils';
import { Button } from '@/components';
import { transactionService } from '@/services';
```

## 🆘 Suporte

### Documentação

- `README.md` - Overview do projeto
- `ARCHITECTURE.md` - Arquitetura detalhada
- `INTEGRATION_GUIDE.md` - Como integrar backend

### Arquivos Comentados

Todos os arquivos incluem JSDoc comentários:
- Início: Descrição do módulo
- Funções: Parâmetros e retorno
- Lógica: Explicação do "por quê"

### Console Logs

Código inclui logs em:
- `[API]` - Requisições HTTP
- `[DEV MODE]` - Informações de desenvolvimento
- `[ERROR]` - Erros

## ✅ Checklist Final

Antes de usar em produção:

- [ ] npm install executado
- [ ] Dependências Expo instaladas
- [ ] App abre sem erros
- [ ] Gravação de áudio funciona
- [ ] Categorização funciona (mesmo com mock)
- [ ] Dashboard carrega dados
- [ ] Histórico filtra corretamente
- [ ] Configurações acessível
- [ ] Sem erros no console

## 🎉 Próximas Etapas

1. **Testar App**: Abrir e explorar todas as telas
2. **Entender Código**: Ler `ARCHITECTURE.md`
3. **Integrar Backend**: Seguir `INTEGRATION_GUIDE.md`
4. **Adicionar Features**: Gráficos, relatórios, etc
5. **Deploy**: EAS ou backend próprio

---

**Bom desenvolvimento!** 🚀

Dúvidas? Verificar comentários no código e documentação.
