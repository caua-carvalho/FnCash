/**
 * @file types/transaction.ts
 * @description Define os tipos e interfaces para transações financeiras
 * Centralizando os tipos para fácil manutenção e reutilização
 */

/**
 * Tipo de categoria disponível na aplicação
 * @type {string}
 */
export type Category = 'Alimentação' | 'Transporte' | 'Compras' | 'Contas' | 'Saúde';

/**
 * Tipo de transação (gasto ou ganho)
 * @type {string}
 */
export type TransactionType = 'expense' | 'income';

/**
 * Interface para uma transação individual
 * @interface Transaction
 * @property {string} id - ID único da transação
 * @property {string} userId - ID do usuário (para futuro auth)
 * @property {number} amount - Valor em reais
 * @property {Category} category - Categoria da transação
 * @property {TransactionType} type - Tipo (gasto ou ganho)
 * @property {string} description - Descrição da transação
 * @property {Date} date - Data da transação
 * @property {string} [audioUrl] - URL do áudio original (opcional)
 */
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
  date: Date;
  audioUrl?: string;
}

/**
 * Interface para resposta de categorização da IA
 * @interface AICategorizationResponse
 * @property {number} amount - Valor extraído do áudio
 * @property {Category} category - Categoria identificada
 * @property {TransactionType} type - Tipo de transação
 * @property {string} description - Descrição extraída
 * @property {number} confidence - Nível de confiança da IA (0-1)
 */
export interface AICategorizationResponse {
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
  confidence: number;
}

/**
 * Interface para requisição ao backend
 * Enviada após confirmação do usuário
 * @interface CreateTransactionPayload
 * @property {string} userId - ID do usuário
 * @property {number} amount - Valor em reais
 * @property {Category} category - Categoria
 * @property {TransactionType} type - Tipo de transação
 * @property {string} description - Descrição
 * @property {string} date - Data em ISO string
 * @property {string} [audioFile] - Arquivo de áudio (base64 ou blob)
 */
export interface CreateTransactionPayload {
  userId: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
  date: string;
  audioFile?: string;
}

/**
 * Interface para resposta do backend
 * @interface TransactionResponse
 * @property {boolean} success - Sucesso da operação
 * @property {Transaction} [data] - Transação criada
 * @property {string} [error] - Mensagem de erro
 */
export interface TransactionResponse {
  success: boolean;
  data?: Transaction;
  error?: string;
}
