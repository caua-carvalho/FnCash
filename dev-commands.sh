#!/bin/bash

# ==============================================================================
# FnCash - Comandos de Desenvolvimento Úteis
# ==============================================================================
# Este script contém comandos frequentes para desenvolvimento
# Use: source ./dev-commands.sh (para acessar as funções)
# ==============================================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==============================================================================
# 📱 INICIAR PROJETO
# ==============================================================================

# Iniciar servidor Expo
start-app() {
    echo -e "${BLUE}🚀 Iniciando Expo...${NC}"
    npx expo start --clear
}

# Iniciar em modo interativo
start-app-interactive() {
    echo -e "${BLUE}🎮 Modo interativo (pressione 'i' para iOS, 'a' para Android, 'w' para Web)${NC}"
    npx expo start
}

# Iniciar apenas no iOS
start-app-ios() {
    echo -e "${BLUE}🍎 Iniciando no iOS...${NC}"
    npx expo start --ios
}

# Iniciar apenas no Android
start-app-android() {
    echo -e "${BLUE}🤖 Iniciando no Android...${NC}"
    npx expo start --android
}

# ==============================================================================
# 🔍 LINTING E FORMATTING
# ==============================================================================

# Verificar erros ESLint
lint() {
    echo -e "${YELLOW}🔍 Verificando ESLint...${NC}"
    npx eslint . --ext .ts,.tsx --report-unused-disable-directives
}

# Corrigir erros ESLint
lint-fix() {
    echo -e "${YELLOW}✅ Corrigindo ESLint...${NC}"
    npx eslint . --ext .ts,.tsx --fix
}

# Verificar tipos TypeScript
type-check() {
    echo -e "${YELLOW}📋 Verificando tipos TypeScript...${NC}"
    npx tsc --noEmit
}

# ==============================================================================
# 📦 DEPENDÊNCIAS
# ==============================================================================

# Instalar dependências
install-deps() {
    echo -e "${BLUE}📦 Instalando dependências...${NC}"
    npm install
}

# Atualizar Expo
update-expo() {
    echo -e "${BLUE}📦 Atualizando Expo...${NC}"
    npx expo-cli@latest
}

# Verificar deps desatualizadas
check-updates() {
    echo -e "${YELLOW}🔄 Verificando atualizações...${NC}"
    npm outdated
}

# ==============================================================================
# 🧪 TESTES (Quando implementados)
# ==============================================================================

# Rodar testes
test() {
    echo -e "${BLUE}🧪 Rodando testes...${NC}"
    npm test
}

# Testes em watch mode
test-watch() {
    echo -e "${BLUE}👀 Testes em watch mode...${NC}"
    npm test -- --watch
}

# Cobertura de testes
test-coverage() {
    echo -e "${BLUE}📊 Cobertura de testes...${NC}"
    npm test -- --coverage
}

# ==============================================================================
# 🏗️ COMPILAÇÃO
# ==============================================================================

# Build para iOS
build-ios() {
    echo -e "${BLUE}📱 Build iOS...${NC}"
    npx eas build --platform ios
}

# Build para Android
build-android() {
    echo -e "${BLUE}📱 Build Android...${NC}"
    npx eas build --platform android
}

# Build local
build-local() {
    echo -e "${BLUE}📦 Build local...${NC}"
    npx expo run:ios
    # ou: npx expo run:android
}

# ==============================================================================
# 🔐 GIT UTILITIES
# ==============================================================================

# Ver mudanças
git-status() {
    echo -e "${YELLOW}📝 Status Git:${NC}"
    git status
}

# Commit padrão
git-commit() {
    echo -e "${YELLOW}💾 Commitando...${NC}"
    git add .
    git commit -m "$1"
}

# Feature branch
git-feature() {
    echo -e "${YELLOW}🌿 Criando branch feature...${NC}"
    git checkout -b "feature/$1"
}

# Cleanup branches locais
git-cleanup() {
    echo -e "${YELLOW}🧹 Limpando branches...${NC}"
    git branch -vv | grep '\[.*: gone\]' | awk '{print $1}' | xargs git branch -D
}

# ==============================================================================
# 📊 ANÁLISE DE CÓDIGO
# ==============================================================================

# Contar linhas de código
count-loc() {
    echo -e "${BLUE}📊 Linhas de código:${NC}"
    find app components services utils hooks -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1
}

# Listar maior arquivos
largest-files() {
    echo -e "${BLUE}📦 Maiores arquivos:${NC}"
    find . -name "*.ts" -o -name "*.tsx" | xargs ls -lS | head -10
}

# ==============================================================================
# 🐛 DEBUGGING
# ==============================================================================

# Limpar cache
clear-cache() {
    echo -e "${YELLOW}🧹 Limpando cache...${NC}"
    rm -rf node_modules/.bin/.expo-*
    npx expo start --clear
}

# Limpar tudo
clean() {
    echo -e "${RED}⚠️  Limpando projeto inteiro...${NC}"
    rm -rf node_modules
    rm -rf .expo
    rm -rf build
    rm -rf dist
    npm install
}

# Debugar com inspector
debug() {
    echo -e "${BLUE}🐛 Abrindo React Native Inspector...${NC}"
    npx expo start --localhost
}

# ==============================================================================
# 📚 GERAÇÃO DE DOCUMENTAÇÃO
# ==============================================================================

# Gerar TypeDoc (quando configurado)
generate-docs() {
    echo -e "${BLUE}📚 Gerando documentação...${NC}"
    npx typedoc app --out docs
}

# ==============================================================================
# 🚀 DEPLOYMENT
# ==============================================================================

# Preparar para produção
prepare-prod() {
    echo -e "${YELLOW}⚙️  Preparando para produção...${NC}"
    lint-fix
    type-check
    test
    echo -e "${GREEN}✅ Pronto para deploy!${NC}"
}

# Push para main
deploy() {
    echo -e "${YELLOW}🚀 Deployando...${NC}"
    git-commit "Deploy: $1"
    git push origin main
}

# ==============================================================================
# 📖 AJUDA
# ==============================================================================

help() {
    cat << EOF
${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}
${BLUE}║           FnCash - Comandos de Desenvolvimento            ║${NC}
${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}

${GREEN}📱 INICIAR:${NC}
  start-app              - Iniciar servidor Expo (modo interativo)
  start-app-ios          - Iniciar apenas iOS
  start-app-android      - Iniciar apenas Android

${GREEN}🔍 LINTING:${NC}
  lint                   - Verificar erros
  lint-fix               - Corrigir automaticamente
  type-check             - Verificar tipos TypeScript

${GREEN}📦 DEPENDÊNCIAS:${NC}
  install-deps           - npm install
  update-expo            - Atualizar Expo
  check-updates          - Listar atualizações disponíveis

${GREEN}🧪 TESTES:${NC}
  test                   - Rodar testes
  test-watch             - Watch mode
  test-coverage          - Relatório de cobertura

${GREEN}🏗️  BUILD:${NC}
  build-ios              - Build para iOS (EAS)
  build-android          - Build para Android (EAS)
  build-local            - Build local

${GREEN}🔐 GIT:${NC}
  git-status             - Ver status
  git-commit "msg"       - Committar mudanças
  git-feature "nome"     - Nova feature branch
  git-cleanup            - Limpar branches deletadas

${GREEN}📊 ANÁLISE:${NC}
  count-loc              - Contar linhas de código
  largest-files          - Maiores arquivos

${GREEN}🐛 DEBUG:${NC}
  clear-cache            - Limpar cache Expo
  clean                  - Limpeza total (rm node_modules)
  debug                  - Abrir Inspector

${GREEN}📚 DOCS:${NC}
  generate-docs          - Gerar documentação TypeDoc

${GREEN}🚀 DEPLOY:${NC}
  prepare-prod           - Lint, type-check, test
  deploy "msg"           - Commit e push

${GREEN}❓ AJUDA:${NC}
  help                   - Este menu

${YELLOW}Exemplos de uso:${NC}
  $ start-app
  $ lint-fix && type-check
  $ git-feature "dark-mode"
  $ prepare-prod
  $ deploy "Add dark mode support"

EOF
}

# Mostrar help se chamado sem argumentos
if [ $# -eq 0 ]; then
    help
fi

# ==============================================================================
# ALIASES ÚTEIS (adicionar a .bashrc ou .zshrc)
# ==============================================================================

# alias app="start-app"
# alias lint="lint-fix && type-check"
# alias prod="prepare-prod"

echo -e "${GREEN}✅ Dev commands carregados!${NC}"
echo -e "${YELLOW}Digite 'help' para ver todos os comandos${NC}"
