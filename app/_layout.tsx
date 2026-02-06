import { Slot, Redirect, usePathname } from 'expo-router';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

function RootGate() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // NÃO redireciona se já estiver no login
  if (!isAuthenticated && pathname !== '/login') {
    return <Redirect href="/login" />;
  }

  // NÃO deixa usuário logado acessar login
  if (isAuthenticated && pathname === '/login') {
    return <Redirect href="/" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootGate />
    </AuthProvider>
  );
}
