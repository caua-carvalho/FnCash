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
  BASE_URL: 'http://192.168.15.32/FnCash/FnCashBack',

  // Endpoints específicos
  ENDPOINTS: {
    // Transações
    CREATE_TRANSACTION: '/transactions',
    GET_TRANSACTIONS: '/transactions',
    GET_TRANSACTION: (id: string) => `/transactions/${id}`,
    UPDATE_TRANSACTION: (id: string) => `/transactions/${id}`,
    DELETE_TRANSACTION: (id: string) => `/transactions/${id}`,

    // AI Categorização
    CATEGORIZE_AUDIO: '/transactions/audio',
  },

  JWT_SECRET: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIxNjAzYTU2LTJiZjItNGE2OS1hMTA5LWE4ZWYzYmFhYzk4NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2OTEwMzE3MywiZXhwIjoxNzY5MTg5NTczfQ.6XDtg3cxKlwvY2JTeHNYEnq4QUPKPylZUj87NxlizHk',


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
