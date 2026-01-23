/**
 * @file INTEGRATION_GUIDE.md
 * @description Guia de Integração com Backend
 */

# FnCash - Guia de Integração com Backend

## 🎯 Visão Geral

Este documento descreve como integrar o app FnCash com seu backend, substituindo o mock de IA por uma implementação real.

## 🔌 Endpoints Esperados

Seu backend deve implementar os seguintes endpoints:

### 1. Criar Transação
```
POST /api/transactions
Content-Type: application/json

Request:
{
  "userId": "user-123",
  "amount": 150.50,
  "category": "Compras",
  "type": "expense",
  "description": "Compras em loja",
  "date": "2025-01-18T14:30:00Z",
  "audioFile": "base64_encoded_audio_optional"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "id": "tx-456",
    "userId": "user-123",
    "amount": 150.50,
    "category": "Compras",
    "type": "expense",
    "description": "Compras em loja",
    "date": "2025-01-18T14:30:00Z",
    "audioUrl": "https://seu-cdn.com/audio-123.m4a"
  }
}

Error Response (400/500):
{
  "success": false,
  "error": "Descrição do erro"
}
```

### 2. Listar Transações
```
GET /api/transactions?userId=user-123&startDate=2025-01-01&endDate=2025-01-31&category=Compras

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "tx-1",
      "userId": "user-123",
      ...
    }
  ]
}
```

### 3. Buscar Transação
```
GET /api/transactions/tx-456

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

### 4. Atualizar Transação
```
PUT /api/transactions/tx-456
Content-Type: application/json

Request:
{
  "amount": 200.00,
  "description": "Compras atualizadas"
}

Response (200 OK):
{
  "success": true,
  "data": { ... }
}
```

### 5. Deletar Transação
```
DELETE /api/transactions/tx-456

Response (200 OK):
{
  "success": true
}
```

### 6. Categorizar Áudio (IA) ⭐
```
POST /api/ai/categorize
Content-Type: application/json

Request:
{
  "userId": "user-123",
  "audioBase64": "//NExAAAAANIAAAAAExBTUUzLjk4LjIADAAAAAAAAP/+...truncated",
  "mimeType": "audio/mp4"
}

Response (200 OK):
{
  "amount": 45.90,
  "category": "Alimentação",
  "type": "expense",
  "description": "Almoço executivo no restaurante",
  "confidence": 0.95
}

Error Response (400/500):
{
  "error": "Não foi possível processar o áudio"
}
```

## 🚀 Opções de Implementação

### Opção 1: Mock Local (Padrão Atual)

O app vem com mock habilitado. Útil para desenvolvimento.

```typescript
// services/aiService.ts - Linha ~25
private useLocalMock: boolean = true; // Mude para false

// Para usar mock:
aiService.setUseMock(true); // Via settings
```

### Opção 2: Backend com Gemini API

Seu backend recebe áudio em base64 e usa Gemini API:

```python
# Exemplo Python/FastAPI
from google.cloud import speech_v1
import anthropic

@app.post("/api/ai/categorize")
async def categorize_audio(request: AudioRequest):
    # 1. Converter base64 para áudio
    audio_data = base64.b64decode(request.audioBase64)
    
    # 2. Usar Gemini para categorizar
    client = anthropic.Anthropic(api_key=GEMINI_API_KEY)
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",  # ou gemini
        messages=[{
            "role": "user",
            "content": f"""
                Analise este áudio de transação financeira transcrito como:
                "{transcribed_text}"
                
                Extraia:
                1. Valor em reais (número)
                2. Categoria: Alimentação, Transporte, Compras, Contas ou Saúde
                3. Tipo: expense ou income
                4. Descrição breve
                
                Responda em JSON: {amount, category, type, description, confidence}
            """
        }]
    )
    
    return response.json()
```

### Opção 3: Backend com Whisper + Gemini

```python
# Transcrever + Categorizar
from openai import OpenAI

@app.post("/api/ai/categorize")
async def categorize_audio(request: AudioRequest):
    # 1. Converter base64 para arquivo
    audio_bytes = base64.b64decode(request.audioBase64)
    
    # 2. Transcrever com Whisper
    client = OpenAI(api_key=OPENAI_API_KEY)
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=("audio.m4a", audio_bytes, "audio/mp4")
    )
    
    # 3. Categorizar com Gemini
    gemini_client = Anthropic(api_key=GEMINI_API_KEY)
    response = gemini_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        messages=[{
            "role": "user",
            "content": f"Categorize: {transcript.text}"
        }]
    )
    
    return response.json()
```

## 📝 Configuração do App

### 1. Atualizar URLs de API

Editar `constants/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://seu-backend-real.com/api', // ← Seu backend
  // ... resto do config
};

export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
```

### 2. Desabilitar Mock

Editar `services/aiService.ts`:

```typescript
export class AIService {
  // ...
  private useLocalMock: boolean = false; // ← Mude para false
  // ...
}
```

### 3. Variáveis de Ambiente

Criar arquivo `.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://seu-backend.com/api
EXPO_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
```

### 4. Autenticação (Futuro)

Quando implementar autenticação, substituir hardcoded userId:

```typescript
// Antes (mock)
const USER_ID = 'user-123';

// Depois (real)
const { user } = useAuth(); // Seu hook
const USER_ID = user?.id;
```

## 🧪 Testando a Integração

### Teste 1: Criar Transação Manualmente

```bash
curl -X POST http://seu-backend.com/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "amount": 150.50,
    "category": "Compras",
    "type": "expense",
    "description": "Teste",
    "date": "2025-01-18T14:30:00Z"
  }'
```

### Teste 2: Listar Transações

```bash
curl http://seu-backend.com/api/transactions?userId=user-123
```

### Teste 3: Testar Categorização

```bash
# 1. Gravar áudio no app
# 2. Copiar base64 do console
# 3. Fazer requisição

curl -X POST http://seu-backend.com/api/ai/categorize \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "audioBase64": "...",
    "mimeType": "audio/mp4"
  }'
```

## 📊 Fluxo de Dados Completo

```
Usuário Grava Áudio
    ↓
audioService.stopRecording() → URI local
    ↓
audioService.audioToBase64(uri) → Base64
    ↓
aiService.categorizeAudio(userId, base64)
    ↓
fetch POST /api/ai/categorize
    ↓
Backend → [Transcreve] → [Categoriza com IA]
    ↓
Response: { amount, category, type, description, confidence }
    ↓
Usuário confirma dados
    ↓
transactionService.createTransaction(payload)
    ↓
fetch POST /api/transactions
    ↓
Backend salva no DB
    ↓
Response: { success, data: Transaction }
    ↓
App atualiza lista e mostra sucesso
```

## 🔐 Considerações de Segurança

1. **Validação de Input**: Sempre validar no backend
2. **Autenticação**: Implementar JWT/OAuth
3. **Autorização**: Cada usuário vê apenas suas transações
4. **Rate Limiting**: Limitar requisições
5. **HTTPS**: Sempre em produção
6. **CORS**: Configurar adequadamente
7. **Arquivo de Áudio**: Validar tipo MIME, tamanho

## 🧬 Schema de Banco de Dados (Exemplo)

```sql
-- Usuários
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transações
CREATE TABLE transactions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10, 2),
  category VARCHAR(50),
  type ENUM('expense', 'income'),
  description VARCHAR(255),
  date TIMESTAMP,
  audio_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Índices
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
```

## 🐛 Debug de Requisições

Ativar logs detalhados em `services/transactionService.ts`:

```typescript
// Já incluído:
console.log('[API] Criando transação:', payload);
console.log('[API] Buscando transações:', url);
```

Os logs aparecem no console do Expo.

## 📱 Testar no App

1. Ir para Settings
2. Togglear "Modo de Teste" para desabilitar mock
3. Voltar e tentar adicionar transação
4. Ver logs no console
5. Verificar resposta no backend

## ✅ Checklist de Integração

- [ ] Backend criado com endpoints acima
- [ ] Endpoint POST /api/transactions funcionando
- [ ] Endpoint GET /api/transactions funcionando
- [ ] Endpoint POST /api/ai/categorize funcionando
- [ ] URLs atualizadas em constants/api.ts
- [ ] Mock desabilitado em services/aiService.ts
- [ ] Variáveis de ambiente configuradas
- [ ] CORS habilitado para origem do app
- [ ] Testes manuais com curl/Postman
- [ ] Testes no app
- [ ] Logs funcionando
- [ ] Erro handling funcionando

## 🆘 Troubleshooting

### Erro 404 em POST /api/transactions
- Verificar se URL está correta
- Verificar se endpoint existe no backend
- Verificar método HTTP (POST)

### Erro 400 em POST /api/ai/categorize
- Verificar format do base64
- Verificar se mimeType é "audio/mp4"
- Verificar payload da IA

### Erro CORS
- Configurar header `Access-Control-Allow-Origin: *` no backend
- Ou especificar origem do app

### Áudio não processa
- Verificar se audioBase64 não está vazio
- Verificar se Gemini API key é válida
- Verificar logs do backend

---

**Sucesso na integração!** 🚀

Dúvidas? Verificar console do app (Expo) e logs do backend.
