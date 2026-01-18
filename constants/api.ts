/**
 * @file constants/api.ts
 * @description Configurações e endpoints da API
 * Centraliza URLs e chaves para fácil manutenção
 */

/**
 * Configuração base da API
 * TODO: Substituir pela URL do seu backend em produção
 * @constant API_CONFIG
 */
export const API_CONFIG = {
  // URL base do backend - SUBSTITUIR EM PRODUÇÃO
  BASE_URL: 'http://192.168.1.100:3000/api',

  // Endpoints específicos
  ENDPOINTS: {
    // Transações
    CREATE_TRANSACTION: '/transactions',
    GET_TRANSACTIONS: '/transactions',
    GET_TRANSACTION: (id: string) => `/transactions/${id}`,
    UPDATE_TRANSACTION: (id: string) => `/transactions/${id}`,
    DELETE_TRANSACTION: (id: string) => `/transactions/${id}`,

    // AI Categorização
    CATEGORIZE_AUDIO: '/ai/categorize',
  },

  // Timeout padrão para requisições (em ms)
  TIMEOUT: 30000,

  // Tamanho máximo de arquivo de áudio (em bytes) - 10MB
  MAX_AUDIO_SIZE: 10 * 1024 * 1024,
};

/**
 * Chave da API Gemini
 * TODO: Substituir pela chave real ou usar variáveis de ambiente
 * @constant GEMINI_API_KEY
 */
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';

/**
 * Configurações da API Gemini
 * @constant GEMINI_CONFIG
 */
export const GEMINI_CONFIG = {
  API_KEY: GEMINI_API_KEY,
  MODEL: 'gemini-1.5-flash',
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
};
