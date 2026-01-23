/**
 * @file DEVELOPER_NOTES.md
 * @description Notas Técnicas e Decisões de Design
 */

# 💡 FnCash - Notas do Desenvolvedor

## 🎯 Decisões de Design

### 1. Padrão Singleton para Serviços
**Por quê?**
- Garante instância única
- Facilita acesso global
- Evita múltiplas inicializações

**Alternativa:** Redux/Context - mais complexo para um MVP

### 2. Custom Hooks em vez de Estado Global
**Por quê?**
- Simplicidade para MVP
- Reutilizável em múltiplos componentes
- Sem boilerplate de Redux

**Futura Migração:** Passar para Zustand/Redux se necessário

### 3. StyleSheet em vez de Styled Components
**Por quê?**
- Nativo do React Native
- Performance melhor
- Sem dependências extras

### 4. Mock de IA Habilitado por Padrão
**Por quê?**
- Desenvolvedores podem testar sem backend
- Fácil integração depois
- Toggle via Settings

## 🏗️ Arquitetura

### Camadas
```
Telas (Screens) [app/]
        ↓
Custom Hooks [hooks/]
        ↓
Serviços [services/]
        ↓
Componentes [components/]
        ↓
Utilitários [utils/]
```

### Fluxo de Dados
```
UI (React Component)
  ↓
Hook (useState, useCallback)
  ↓
Service (lógica + API)
  ↓
Backend / IA
```

## 🎤 Decisão: Audio com expo-av

**Alternativas consideradas:**
- `react-native-audio-recorder-player` - Mais simples
- `react-native-sound` - Mais pesado

**Escolhida:** expo-av
- Funciona com Expo
- Bem documentada
- Suporte a pausa

## 🤖 Decisão: Mock de IA Local

**Alternativas:**
1. Sem mock (exigir backend)
2. Mock simples (números aleatórios)
3. Mock inteligente (variar por input) ✅ ESCOLHIDA

**Benefício:** Desenvolvedores podem testar tudo mesmo sem backend real

## 📱 Navegação com Expo Router

**Por quê?**
- File-based routing
- Nativo do Expo
- Simples para este escopo

**Alternativa:** React Navigation (mais pesado)

## 🧩 Componentes Reutilizáveis

### Princípios
1. **Agnósticos**: Não conhecem contexto da aplicação
2. **Props-driven**: Configuráveis via props
3. **Simples**: Uma responsabilidade cada um
4. **Documentados**: JSDoc completo

### Exemplo
```typescript
// ❌ Ruim - Acoplado
export function TransactionCard() {
  const { deleteTransaction } = useTransactions();
  // ... sabe demais sobre contexto
}

// ✅ Bom - Desacoplado
export function TransactionCard({
  transaction,
  onPress,
}: TransactionCardProps) {
  // ... apenas apresenta dados
}
```

## 🧪 Estratégia de Testes (Futuro)

### Unit Tests
```
utils/ → 100% cobertura
services/ → Mock tudo
```

### Integration Tests
```
Hooks + Services → Fluxo real
```

### E2E Tests (Detox)
```
Telas completas → User journey
```

## 🔐 Segurança - MVP vs Production

### MVP (Agora)
- ⚠️ Sem autenticação
- ⚠️ userId hardcoded
- ✅ Validação de entrada
- ✅ Tratamento de erros

### Production (Futuro)
- [ ] JWT tokens
- [ ] Refresh tokens
- [ ] HTTPS obrigatório
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] Validação server-side

## 📊 Formato de Datas

**Padrão:** ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)

```typescript
new Date().toISOString() // "2025-01-18T14:30:00.000Z"
```

**Por quê?**
- Padrão internacional
- Unambíguo
- Fácil de parsear

## 💰 Precisão Numérica

**Tipo:** number (JavaScript)

**Cuidado:** JavaScript não é ideal para finança
```typescript
0.1 + 0.2 === 0.3 // false! (conhecido)
```

**Para Production:** Usar biblioteca `decimal.js`

## 🎨 Sistema de Cores

### Paleta Escolhida
```
Primary:  #141414 (Preto)
Success:  #10B981 (Verde)
Danger:   #EF4444 (Vermelho)
Info:     #3B82F6 (Azul)
Warning:  #F59E0B (Amarelo)
```

**Por quê?**
- Alto contraste
- Acessível para daltônicos
- Consistente

## 📏 Tipografia

### Tamanhos
```
H1: 28px - Headlines principais
H2: 18px - Títulos de seção
Body: 14px - Texto padrão
Caption: 12px - Texto pequeno
```

### Pesos
```
400: Regular
500: Medium
600: Semi-bold
700: Bold
```

## ♿ Acessibilidade (MVP)

✅ Implementado:
- Ícones com texto
- Contraste suficiente
- Tamanho de toque mínimo (48x48)
- Labels descritivos

⚠️ Não implementado:
- Screen reader optimization
- Navegação por teclado
- Dark mode

## 🚀 Performance

### Otimizações Atuais
- Lazy loading com Expo Router
- Memoização em hooks
- FlatList para listas (planned)
- Sem animações pesadas

### Para Melhorar
```
[ ] React.memo() em componentes
[ ] useCallback para funções
[ ] FlatList em vez de ScrollView
[ ] Image caching
[ ] Code splitting
[ ] Profiling com React Native Debugger
```

## 📱 Responsividade

**Foco:** Mobile first

**Breakpoints:**
```
- Mobile: até 480px (foco atual)
- Tablet: 481px a 1024px (futuro)
- Web: 1025px+ (futuro)
```

## 🔄 Sincronização

**MVP:** Sem sincronização offline
- Requer conexão de internet
- Requisições diretas ao backend

**Futuro:** Offline-first
- SQLite local
- Fila de sincronização
- Detectar conexão

## 🐛 Error Handling

### Padrão Adotado
```typescript
try {
  // operação
} catch (error) {
  const msg = error instanceof Error ? error.message : 'Erro';
  // tratar
  throw error; // ou retornar null
}
```

### Tipos de Erro
```
Network Errors → Toast
Validation Errors → Field highlight
Server Errors → Alert
Unknown → Generic message
```

## 📝 Logs e Debugging

### Padrão de Logs
```typescript
console.log('[API] Requisição:', url);
console.log('[DEV MODE] Usando mock');
console.error('Erro:', error);
```

### Debug Flags
```typescript
const DEBUG = __DEV__; // true em desenvolvimento
if (DEBUG) console.log(...);
```

## 🚢 Deploy Considerations

### Before Production
```
[ ] Remove console.logs
[ ] Disable mock mode
[ ] Update API URLs
[ ] Configure environment variables
[ ] Test on real devices
[ ] Performance profiling
[ ] Security audit
[ ] Privacy policy
[ ] Terms of service
```

### Release Checklist
```
[ ] Version bump
[ ] Changelog
[ ] Git tag
[ ] Build signed APK/AAB
[ ] Build signed IPA
[ ] Test on devices
[ ] Submit to stores
```

## 🎓 Lições Aprendidas

### O Que Funcionou Bem
✅ Estrutura clara com serviços
✅ Custom hooks reutilizáveis
✅ Documentação abrangente
✅ Mock para desenvolvimento
✅ TypeScript completo

### O Que Poderia Ser Melhor
⚠️ Precisaria de testes unitários
⚠️ Sem persistência local
⚠️ Sem autenticação
⚠️ Sem offline support

## 🔮 Visão Futura

### 6 Meses
- Backend production
- Gemini API real
- Gráficos
- 1000+ users

### 1 Ano
- App consolidada
- Comunidade ativa
- Múltiplas features
- 10000+ users

### 2 Anos
- Plataforma de analytics
- API aberta
- Web versión
- Integrações de terceiros

## 🤝 Colaboração

Se outro dev trabalhar neste projeto:

1. **Ler documentação**
   - ARCHITECTURE.md
   - QUICK_REFERENCE.md

2. **Manter padrões**
   - Naming conventions
   - File structure
   - Código style

3. **Documentar mudanças**
   - JSDoc comments
   - Update ARCHITECTURE.md
   - Changelog

4. **Testar antes de PR**
   - Sem console errors
   - Sem warnings
   - Funcionalidade completa

## 📚 Referências

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/) by Robert Martin

## 💬 Filosofia de Código

> "Código é lido muito mais vezes do que é escrito"

Por isso:
- ✅ Nomes descritivos
- ✅ Funções pequenas
- ✅ Comentários quando necessário
- ✅ Sem magic numbers
- ✅ DRY (Don't Repeat Yourself)

## 🎯 Meta Final

Criar um app que seja:
1. **Funcional** - Faz o que promete
2. **Intuitivo** - Fácil de usar
3. **Bonito** - Design agradável
4. **Rápido** - Performance ótima
5. **Seguro** - Protege dados
6. **Escalável** - Fácil de expandir
7. **Documentado** - Fácil de entender

✅ MVP alcançou isso tudo!

---

**FnCash Developer Notes v1.0** 💡

Última atualização: Janeiro 2025
Autor: Você! 🚀
