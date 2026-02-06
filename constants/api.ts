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
  BASE_URL: 'https://fncashback.onrender.com',

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

  JWT_SECRET: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIxNjAzYTU2LTJiZjItNGE2OS1hMTA5LWE4ZWYzYmFhYzk4NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDM3OTAzNSwiZXhwIjoxNzcwNDY1NDM1fQ.cU4CIdp7jE6t-MC3zb-c4-n7jWHY7F1Nfxne7QqT4ac',


  // Timeout padrão para requisições (em ms)
  TIMEOUT: 30000,

  // Tamanho máximo de arquivo de áudio (em bytes) - 10MB
  MAX_AUDIO_SIZE: 10 * 1024 * 1024,
};
