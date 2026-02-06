// services/authService.ts
import { API_CONFIG } from '@/constants/api';
import { fetchWithTimeout } from '@/utils/fetchWithTimeout';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetchWithTimeout(
      `${API_CONFIG.BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      },
      API_CONFIG.TIMEOUT
    );

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    return response.json();
  }
}

export const authService = new AuthService();
