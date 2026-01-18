#!/bin/bash

# ==============================================================================
# FnCash - INDEX - Guia Completo de Documentação
# ==============================================================================

cat << 'EOF'

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                       📑 FnCash - ÍNDICE COMPLETO                        ║
║                                                                            ║
║                 Seu Aplicativo de Gerenciamento Financeiro                ║
║                        com Áudio e IA Inteligente                         ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝


🚀 COMEÇAR RÁPIDO (< 5 minutos)
═══════════════════════════════════════════════════════════════════════════════

Novo no projeto? Comece aqui:

  1. ./QUICK_START.sh          → Guia interativo para primeiros passos
  2. README.md                 → Visão geral do projeto
  3. npx expo start            → Inicie o servidor


📚 DOCUMENTAÇÃO ORGANIZADA POR PROPÓSITO
═══════════════════════════════════════════════════════════════════════════════

┌─ 🎯 ENTENDER O PROJETO
├─ README.md                  (3.5 KB) - Visão geral, recursos, como começar
├─ PROJECT_SUMMARY.md         (9.5 KB) - Resumo de conclusão, métricas, checklist
│
├─ 🏗️ ARQUITETURA & DESIGN
├─ ARCHITECTURE.md            (9.1 KB) - Estrutura de pastas, padrões, fluxo de dados
├─ DEVELOPER_NOTES.md         (8.7 KB) - Decisões de design, filosofia de código
├─ QUICK_REFERENCE.md         (8.8 KB) - Snippets, imports, componentes
│
├─ 🔧 IMPLEMENTAÇÃO & CONFIGURAÇÃO
├─ SETUP_GUIDE.md             (7.4 KB) - Instalação passo a passo, testing
├─ INTEGRATION_GUIDE.md       (9.6 KB) - Como integrar backend e Gemini API
├─ EXAMPLES.md                (13.2 KB) - 13 exemplos de código funcionando
│
├─ 🚀 PRÓXIMAS ETAPAS
├─ TODO_ROADMAP.md            (7.6 KB) - 9 fases de desenvolvimento futuro
│
├─ ⚙️ FERRAMENTAS DE DESENVOLVIMENTO
├─ dev-commands.sh            (6.8 KB) - Comandos úteis (lint, build, etc)
├─ install.sh                 (2.1 KB) - Script de instalação automatizado
│
└─ 📖 ESTE ARQUIVO
  └─ INDEX.sh                 (Este arquivo) - Guia de navegação


📑 DOCUMENTOS DETALHADOS
═══════════════════════════════════════════════════════════════════════════════

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 1. README.md - Bem-vindo ao FnCash
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • O que é FnCash?
┃   • Recursos principais
┃   • Stack técnico
┃   • Passos para começar
┃   • Exemplos de uso
┃   • Contribuindo
┃
┃ Quando ler:
┃   ✓ Primeira coisa ao abrir o projeto
┃   ✓ Para explicar o projeto para alguém
┃   ✓ Como visão geral rápida
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 2. SETUP_GUIDE.md - Como Instalar e Executar
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Pré-requisitos (Node.js, Expo)
┃   • Instalação passo a passo
┃   • Iniciando o servidor
┃   • Testando a aplicação
┃   • Solução de problemas
┃   • Convenções do projeto
┃
┃ Quando ler:
┃   ✓ Se não conseguir instalar
┃   ✓ Antes do primeiro `npm install`
┃   ✓ Quando vir erros de dependência
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 3. ARCHITECTURE.md - Como o Projeto é Estruturado
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Estrutura de pastas explicada
┃   • O que cada serviço faz
┃   • Como os componentes funcionam
┃   • Padrões utilizados
┃   • Fluxo de dados
┃   • Dependências entre módulos
┃
┃ Quando ler:
┃   ✓ Para entender como o código é organizado
┃   ✓ Antes de fazer mudanças estruturais
┃   ✓ Se está confuso onde algo deveria ir
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 4. QUICK_REFERENCE.md - Referência Rápida
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Como importar cada coisa
┃   • Exemplos de uso de componentes
┃   • Cores e ícones disponíveis
┃   • Hooks e como usá-los
┃   • Padrões comuns
┃   • Snippets de código
┃
┃ Quando ler:
┃   ✓ Enquanto codifica (clipboard reference)
┃   ✓ Para ver como usar um componente
┃   ✓ Para copiar um padrão comum
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 5. EXAMPLES.md - 13 Exemplos de Código Real
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Exemplos incluem:
┃   1. Gravação de áudio com hook
┃   2. Categorização com IA (mock)
┃   3. Chamada para backend
┃   4. Uso de transações
┃   5. Filtragem de dados
┃   6. Uso de componentes
┃   7. Cálculos financeiros
┃   8. Formatação de datas
┃   9. Tratamento de erros
┃   10. Custom hook useAudioRecorder
┃   11. Custom hook useTransactions
┃   12. Integração Gemini (estrutura)
┃   13. Fluxo completo: áudio → IA → backend
┃
┃ Quando ler:
┃   ✓ Para ver código funcionando de verdade
┃   ✓ Quando implementar algo similar
┃   ✓ Para aprender os padrões do projeto
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 6. DEVELOPER_NOTES.md - Decisões de Design
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Por que escolhemos cada tecnologia
┃   • Padrões de design utilizados
┃   • Alternativas consideradas
┃   • Trade-offs explicitados
┃   • Lições aprendidas
┃   • Considerações de performance
┃   • Plano de segurança
┃
┃ Quando ler:
┃   ✓ Para entender decisões arquiteturais
┃   ✓ Se planeja grandes mudanças
┃   ✓ Se questiona "por quê?" do projeto
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 7. INTEGRATION_GUIDE.md - Integração de Backend e IA
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Endpoints esperados do backend
┃   • Schema do banco de dados
┃   • Fluxo de autenticação (futuro)
┃   • Como integrar Gemini API
┃   • Opções de arquitetura (backend vs client)
┃   • Exemplos de requisições/respostas
┃   • Variáveis de ambiente
┃
┃ Quando ler:
┃   ✓ Quando vai fazer o backend
┃   ✓ Quando vai integrar Gemini
┃   ✓ Antes de fazer requisições HTTP
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 8. PROJECT_SUMMARY.md - Resumo de Conclusão
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém:
┃   • Métricas do projeto (LOC, files, etc)
┃   • Checklist de completude
┃   • Padrões implementados
┃   • O que foi entregue
┃   • O que falta (futuro)
┃   • Próximas prioridades
┃
┃ Quando ler:
┃   ✓ Para ver o que foi implementado
┃   ✓ Para entender escopo do MVP
┃   ✓ Para planejar próximas fases
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 9. TODO_ROADMAP.md - Plano de Desenvolvimento Futuro
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃
┃ Contém (9 fases):
┃   1. Backend Infrastructure
┃   2. Real Gemini Integration
┃   3. Analytics & Insights
┃   4. Authentication & Multi-user
┃   5. Offline Sync
┃   6. UI/UX Enhancements
┃   7. Advanced Features
┃   8. Testing & Quality
┃   9. Deployment & Scale
┃
┃ Quando ler:
┃   ✓ Para planejar releases
┃   ✓ Para priorizar tarefas
┃   ✓ Para apresentar roadmap
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


⚙️ SCRIPTS ÚTEIS
═══════════════════════════════════════════════════════════════════════════════

dev-commands.sh
  Carregue com: source dev-commands.sh
  
  Funções disponíveis:
    start-app              - npx expo start
    lint-fix               - Corrigir ESLint
    type-check             - Verificar TypeScript
    build-ios              - Build para iOS
    build-android          - Build para Android
    test                   - Rodar testes
    git-commit "msg"       - Commit com mensagem
    prepare-prod           - Preparar para produção
    help                   - Ver ajuda


install.sh
  Execute: ./install.sh
  
  O que faz:
    ✓ Verifica Node.js e npm
    ✓ Limpa instalações anteriores
    ✓ npm install
    ✓ Opcionalmente abre Expo
    ✓ Detecção automática de SO


QUICK_START.sh
  Execute: ./QUICK_START.sh
  
  O que faz:
    ✓ Mostra próximos passos
    ✓ Menu interativo
    ✓ Links para recursos
    ✓ Troubleshooting rápido


📊 ESTATÍSTICAS DO PROJETO
═══════════════════════════════════════════════════════════════════════════════

Código TypeScript:
  • 23 arquivos principais
  • ~3500+ linhas de código
  • 5 telas funcionais
  • 3 serviços
  • 2 custom hooks
  • 4 componentes reutilizáveis
  • 8 funções utilitárias
  • 2 arquivos de constantes
  • Tipos TypeScript: 8 interfaces

Documentação:
  • 9 arquivos markdown
  • ~70KB de documentação
  • 13 exemplos de código
  • Cobertura: 100% do código base

Dependências:
  • React Native: expo 51
  • UI: React Native built-in
  • Ícones: expo-symbols
  • Áudio: expo-av
  • Navegação: Expo Router
  • Nenhuma dependência desnecessária


🎯 ROTEIROS DE LEITURA POR PERFIL
═══════════════════════════════════════════════════════════════════════════════

┌─ 👤 PRODUCT MANAGER
├─ README.md                → O que o app faz
├─ PROJECT_SUMMARY.md       → Métricas e completude
├─ TODO_ROADMAP.md          → Próximas fases e prioridades
│
├─ 👨‍💻 DESENVOLVEDOR NOVO
├─ QUICK_START.sh           → Comece aqui (interativo)
├─ README.md                → Visão geral
├─ SETUP_GUIDE.md           → Como instalar
├─ QUICK_REFERENCE.md       → Copie e cole
├─ EXAMPLES.md              → Código real funcionando
│
├─ 🏗️ ARQUITETO
├─ ARCHITECTURE.md          → Estrutura completa
├─ DEVELOPER_NOTES.md       → Decisões de design
├─ PROJECT_SUMMARY.md       → Padrões utilizados
│
├─ 🔗 INTEGRAÇÃO COM BACKEND
├─ INTEGRATION_GUIDE.md     → Endpoints e schema
├─ EXAMPLES.md              → Exemplos de integração
├─ constants/api.ts         → Configuração de API
│
└─ 🚀 LÍDER DO PROJETO
  ├─ README.md              → Overview
  ├─ PROJECT_SUMMARY.md     → Status e métricas
  ├─ TODO_ROADMAP.md        → Plano de ação
  ├─ DEVELOPER_NOTES.md     → Decisões importantes
  └─ ARCHITECTURE.md        → Saúde técnica


📂 NAVEGAÇÃO RÁPIDA DE ARQUIVOS
═══════════════════════════════════════════════════════════════════════════════

app/
  ├── _layout.tsx           → Navegação e setup
  ├── index.tsx             → Dashboard (home)
  ├── history.tsx           → Histórico de transações
  ├── add.tsx               → TELA PRINCIPAL (áudio + IA)
  └── settings.tsx          → Configurações

services/
  ├── audioService.ts       → Gravação/reprodução de áudio
  ├── aiService.ts          → IA (mock + backend)
  └── transactionService.ts → CRUD de transações

components/
  ├── Button.tsx            → Botão versátil
  ├── TransactionCard.tsx   → Card de transação
  ├── SummaryCard.tsx       → Resumo financeiro
  └── CategorySelector.tsx  → Seletor de categorias

hooks/
  ├── useAudioRecorder.ts   → Estado de gravação
  └── useTransactions.ts    → Estado de transações

utils/
  ├── formatting.ts         → Formatação (data, moeda)
  └── calculations.ts       → Cálculos financeiros

constants/
  ├── categories.ts         → Cores/ícones de categorias
  └── api.ts                → Configuração de API

types/
  └── transaction.ts        → Tipos e interfaces


🔗 LINKS CRUZADOS
═══════════════════════════════════════════════════════════════════════════════

Quer fazer algo? Aqui estão os documentos relevantes:

ÁUDIO:
  • Como: QUICK_REFERENCE.md → useAudioRecorder
  • Padrões: EXAMPLES.md → Exemplo 1, 10
  • Código: app/add.tsx, services/audioService.ts
  
IA/CATEGORIZAÇÃO:
  • Como: INTEGRATION_GUIDE.md → Gemini API
  • Padrões: EXAMPLES.md → Exemplo 2, 12, 13
  • Código: services/aiService.ts
  
BACKEND:
  • Endpoints: INTEGRATION_GUIDE.md → Endpoints Esperados
  • Padrão: EXAMPLES.md → Exemplo 3
  • Código: services/transactionService.ts
  
NOVO COMPONENTE:
  • Padrão: ARCHITECTURE.md → Component Layer
  • Referência: QUICK_REFERENCE.md → Components Structure
  • Código: components/
  
NOVO HOOK:
  • Padrão: DEVELOPER_NOTES.md → Custom Hooks
  • Exemplos: EXAMPLES.md → Exemplo 10, 11
  • Código: hooks/


❓ TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════════

Problema                    | Solução
────────────────────────────┼────────────────────────────────
Módulo não encontrado       | npm install (SETUP_GUIDE.md)
Erro de TypeScript          | npx tsc --noEmit
Erro "expo not found"       | npm install -g expo-cli
Áudio não funciona          | SETUP_GUIDE.md → Permissões
Categorização incorreta     | Testar com mock (Settings)
Backend retorna erro        | INTEGRATION_GUIDE.md → Debug
Emulador não inicia        | npx expo start --clear


📞 SUPORTE
═══════════════════════════════════════════════════════════════════════════════

Não conseguiu? Tente:

1. Leia SETUP_GUIDE.md seção Troubleshooting
2. Verifique QUICK_REFERENCE.md para padrão certo
3. Procure em EXAMPLES.md um caso similar
4. Se ainda não funcionar:
   - Claro cache: npx expo start --clear
   - Limpe tudo: npm install (depois de rm -rf node_modules)
   - Reinicie o emulador


✅ CHECKLIST ANTES DE COMMITAR
═══════════════════════════════════════════════════════════════════════════════

Antes de fazer git push:

  [ ] Código compila sem erros (npx tsc --noEmit)
  [ ] Sem warnings ESLint (npm run lint)
  [ ] Testou funcionalidade manualmente
  [ ] Sem console.logs desnecessários
  [ ] Documentou com JSDoc se foi função nova
  [ ] Tipos TypeScript adicionados
  [ ] Sem mudanças desnecessárias em constants/types
  [ ] Mensagem de commit descritiva
  [ ] Branch name segue convenção (feature/*, fix/*, etc)


═══════════════════════════════════════════════════════════════════════════════
FnCash Documentation Index v1.0 | January 2025
═══════════════════════════════════════════════════════════════════════════════

Contato & Contribuição: Veja README.md

EOF

# Oferecer navegação
echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "Deseja abrir algum arquivo? Digite o nome (ex: README.md) ou 'sair'"
echo "═══════════════════════════════════════════════════════════════════════════════"
read -p "> " file

if [ "$file" != "sair" ] && [ -n "$file" ]; then
    if [ -f "$file" ]; then
        less "$file"
    else
        echo "Arquivo não encontrado: $file"
    fi
fi
