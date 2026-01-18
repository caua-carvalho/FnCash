#!/bin/bash

# FnCash - Installation & Setup Script
# Este script configura o projeto FnCash automaticamente

echo "🚀 FnCash - Setup Automático"
echo "================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_step() {
    echo -e "${YELLOW}→${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Verificar Node.js
print_step "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado. Instale em https://nodejs.org"
    exit 1
fi
print_status "Node.js: $(node --version)"

# Verificar npm
print_step "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm não encontrado"
    exit 1
fi
print_status "npm: $(npm --version)"

# Verificar Expo
print_step "Verificando Expo CLI..."
if ! command -v expo &> /dev/null; then
    print_step "Instalando Expo CLI globalmente..."
    npm install -g expo-cli
fi
print_status "Expo CLI disponível"

echo ""
echo "================================"
echo "Instalando dependências..."
echo "================================"
echo ""

# Instalar node_modules
print_step "npm install"
npm install

if [ $? -ne 0 ]; then
    print_error "Erro ao instalar dependências"
    exit 1
fi
print_status "npm install concluído"

echo ""
echo "================================"
echo "Instalando dependências Expo..."
echo "================================"
echo ""

# Instalar dependências Expo
print_step "Instalando expo-av (áudio)"
npx expo install expo-av

print_step "Instalando expo-file-system"
npx expo install expo-file-system

print_step "Instalando expo-router"
npx expo install expo-router

print_step "Instalando expo-symbols"
npx expo install expo-symbols

print_step "Instalando react-native-safe-area-context"
npx expo install react-native-safe-area-context

print_status "Todas as dependências Expo instaladas"

echo ""
echo "================================"
echo "Setup Concluído! ✅"
echo "================================"
echo ""
echo "Próximas etapas:"
echo ""
echo "1. Inicie o app:"
echo "   ${YELLOW}npx expo start${NC}"
echo ""
echo "2. Abra em:"
echo "   - ${YELLOW}i${NC} para iOS"
echo "   - ${YELLOW}a${NC} para Android"
echo "   - ${YELLOW}w${NC} para Web"
echo ""
echo "3. Leia a documentação:"
echo "   - ${YELLOW}SETUP_GUIDE.md${NC} - Como começar"
echo "   - ${YELLOW}ARCHITECTURE.md${NC} - Como funciona"
echo "   - ${YELLOW}INTEGRATION_GUIDE.md${NC} - Backend"
echo ""
echo "4. Explore as telas:"
echo "   - Dashboard (resumo)"
echo "   - Histórico (transações)"
echo "   - Adicionar (gravar áudio) ⭐"
echo "   - Configurações"
echo ""
