// services/authService.ts
import { API_CONFIG } from '@/constants/api';
import { api } from '@/infra/http';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

const { ENDPOINTS } = API_CONFIG;
class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await api.post<LoginResponse>(
        ENDPOINTS.LOGIN,
        { email, password }
      );

      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Credenciais inválidas');
      }

      throw new Error('Erro ao realizar login');
    }
  }
}

export const authService = new AuthService();
