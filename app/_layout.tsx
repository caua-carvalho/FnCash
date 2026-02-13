import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Redirect, Slot, usePathname } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

function RootGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  if(isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
