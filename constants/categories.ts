/**
 * @file constants/categories.ts
 * @description Define as categorias, cores e ícones para a aplicação
 * Centraliza configurações visuais e metadados das categorias
 */



/**
 * Mapa de categorias com seus respectivos ícones (Material Symbols)
 * e cores para visualização
 * @constant CATEGORY_CONFIG
 */
export const CATEGORY_CONFIG: Record<
  Category,
  {
    icon: string;
    color: string;
    colorLight: string;
    label: string;
  }
> = {
  Alimentação: {
    icon: 'silverware-fork-knife',
    color: '#EA7E22',
    colorLight: '#FFE5CC',
    label: 'Alimentação',
  },
  Transporte: {
    icon: 'car',
    color: '#666666',
    colorLight: '#E8E8E8',
    label: 'Transporte',
  },
  Compras: {
    icon: 'shopping',
    color: '#A855F7',
    colorLight: '#F3E8FF',
    label: 'Compras',
  },
  Contas: {
    icon: 'credit-card',
    color: '#3B82F6',
    colorLight: '#EFF6FF',
    label: 'Contas',
  },
  Saúde: {
    icon: 'hospital-box',
    color: '#10B981',
    colorLight: '#D1FAE5',
    label: 'Saúde',
  },
};

/**
 * Lista de todas as categorias disponíveis
 * Útil para iteração e validação
 * @constant CATEGORIES
 */
export const CATEGORIES: Category[] = [
  'Alimentação',
  'Transporte',
  'Compras',
  'Contas',
  'Saúde',
];

/**
 * Cores para tipos de transação
 * @constant TRANSACTION_COLORS
 */
export const TRANSACTION_COLORS = {
  expense: '#EF4444', // Vermelho para gastos
  income: '#10B981', // Verde para ganhos
};
