import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { tokenStorage } from '@/utils/authToken';
import { authService } from '@/services/authService';
import { User } from '@/types/user';

type AuthContextData = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    tokenStorage.get().then((storedToken) => {
      if (storedToken) {
        setToken(storedToken);
        // depois: fetch /me
      }
    });
  }, []);

  async function signIn(email: string, password: string) {
    const { token, user } = await authService.login(email, password);

    await tokenStorage.set(token);
    setToken(token);
    setUser(user);
  }

  async function signOut() {
    await tokenStorage.remove();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
