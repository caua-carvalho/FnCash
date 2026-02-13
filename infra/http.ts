import { API_CONFIG } from '@/constants/api';
import { tokenStorage } from '@/utils/authToken';
import axios from 'axios';

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor de REQUEST (não response)
api.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.get();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor de RESPONSE
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - clearing token");

      await tokenStorage.remove();

      return Promise.reject(
        new Error("SESSION_EXPIRED")
      );
    }

    return Promise.reject(error);
  }
);
