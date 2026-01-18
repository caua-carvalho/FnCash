#!/bin/bash

# ==============================================================================
# FnCash - Configuração Inicial (First Time Setup)
# ==============================================================================
# Execute isto na primeira vez para configurar tudo
# ==============================================================================

set -e  # Exit on error

cat << 'EOF'

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                  🚀 FnCash - First Time Setup                            ║
║                                                                            ║
║              Configuração Inicial para Desenvolvimento                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝


Eu vou guiar você através da configuração inicial.

EOF

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Funções auxiliares
print_step() {
    echo -e "\n${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# ==============================================================================
# STEP 1: Verificar Node.js
# ==============================================================================

print_step "Verificando Node.js..."

if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado!"
    echo "Por favor, instale Node.js de https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
print_success "Node.js encontrado: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    print_error "npm não encontrado!"
    exit 1
fi

NPM_VERSION=$(npm -v)
print_success "npm encontrado: $NPM_VERSION"


# ==============================================================================
# STEP 2: Verificar git
# ==============================================================================

print_step "Verificando git..."

if ! command -v git &> /dev/null; then
    print_warning "git não encontrado (opcional)"
else
    GIT_VERSION=$(git --version)
    print_success "$GIT_VERSION"
fi


# ==============================================================================
# STEP 3: Limpar instalações anteriores (opcional)
# ==============================================================================

print_step "Verificando instalações anteriores..."

if [ -d "node_modules" ]; then
    echo -e "\n${YELLOW}Encontrada pasta node_modules existente${NC}"
    read -p "Deseja remover e reinstalar? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        print_warning "Removendo node_modules..."
        rm -rf node_modules
        print_success "Removido"
    fi
else
    print_success "Nenhuma instalação anterior encontrada"
fi

if [ -d ".expo" ]; then
    print_warning "Cache Expo encontrado"
    read -p "Deseja limpar? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        rm -rf .expo
        print_success "Cache Expo limpo"
    fi
fi


# ==============================================================================
# STEP 4: Instalar dependências
# ==============================================================================

print_step "Instalando dependências..."
echo "Isto pode levar alguns minutos..."

npm install

print_success "Dependências instaladas com sucesso"


# ==============================================================================
# STEP 5: Verificar Expo
# ==============================================================================

print_step "Verificando Expo..."

if ! command -v npx &> /dev/null; then
    print_error "npx não encontrado"
    exit 1
fi

print_success "npx encontrado"

# Testar se expo funciona
if npx expo --version &> /dev/null; then
    EXPO_VERSION=$(npx expo --version)
    print_success "Expo CLI: $EXPO_VERSION"
else
    print_warning "Não conseguiu verificar versão do Expo (pode estar ok)"
fi


# ==============================================================================
# STEP 6: Verificar tipos TypeScript
# ==============================================================================

print_step "Verificando TypeScript..."

if npx tsc --noEmit 2>&1 | grep -q "error"; then
    print_error "Erros de TypeScript encontrados"
    echo ""
    npx tsc --noEmit
    exit 1
else
    print_success "Nenhum erro de TypeScript"
fi


# ==============================================================================
# STEP 7: Configurar variáveis de ambiente (se necessário)
# ==============================================================================

print_step "Verificando arquivo de ambiente..."

if [ ! -f ".env" ]; then
    print_warning "Arquivo .env não encontrado"
    echo ""
    echo "Criando .env padrão..."
    
    cat > .env << 'ENVFILE'
# FnCash Environment Variables

# API Configuration
API_BASE_URL=http://192.168.1.100:3000/api
API_TIMEOUT=30000

# Gemini API (para futuro uso)
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# App Configuration
USE_MOCK_AI=true
DEBUG_MODE=true
ENVFILE
    
    print_success "Arquivo .env criado"
    print_warning "⚠️  Lembre-se de atualizar valores em .env conforme necessário"
else
    print_success "Arquivo .env encontrado"
fi


# ==============================================================================
# STEP 8: Criar pastas se necessário
# ==============================================================================

print_step "Verificando estrutura de pastas..."

FOLDERS=("app" "services" "components" "hooks" "utils" "constants" "types")

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        print_success "$folder/ encontrado"
    else
        print_warning "$folder/ não encontrado - criando..."
        mkdir -p "$folder"
    fi
done


# ==============================================================================
# STEP 9: Verificar arquivos críticos
# ==============================================================================

print_step "Verificando arquivos críticos..."

CRITICAL_FILES=(
    "app/_layout.tsx"
    "app/index.tsx"
    "services/audioService.ts"
    "types/transaction.ts"
)

MISSING=0
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file encontrado"
    else
        print_error "$file NÃO ENCONTRADO"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -gt 0 ]; then
    print_error "$MISSING arquivo(s) crítico(s) faltando"
    echo "Certifique-se de que está no diretório correto"
    exit 1
fi


# ==============================================================================
# STEP 10: Mostrar informações finais
# ==============================================================================

cat << 'EOF'

EOF

print_success "✅ Configuração Inicial Concluída!"

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""
echo "Próximos passos:"
echo ""
echo -e "  1. Inicie o servidor:"
echo -e "     ${BLUE}npx expo start${NC}"
echo ""
echo -e "  2. Abra em seu dispositivo:"
echo -e "     • iOS: Pressione 'i'"
echo -e "     • Android: Pressione 'a'"
echo -e "     • Web: Pressione 'w'"
echo ""
echo -e "  3. Explore a aplicação!"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""
echo "📚 Para mais informações:"
echo ""
echo -e "  ${BLUE}./INDEX.sh${NC}                     # Índice de toda documentação"
echo -e "  ${BLUE}./QUICK_START.sh${NC}              # Guia de primeiros passos"
echo -e "  ${BLUE}source dev-commands.sh${NC}       # Carregar comandos úteis"
echo -e "  ${BLUE}cat README.md${NC}                 # Visão geral do projeto"
echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

# Oferecer iniciar servidor
echo ""
read -p "Deseja iniciar o servidor Expo agora? (s/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    print_step "Iniciando Expo..."
    npx expo start
else
    print_success "Setup completo! Execute 'npx expo start' quando estiver pronto."
fi
