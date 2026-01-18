import React, { useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import HomeScreen from '../screens/HomeScreen';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    bg: isDark ? '#191919' : '#FFFFFF',
    cardBg: isDark ? '#262626' : '#F9FAFB',
    text: isDark ? '#FFFFFF' : '#141414',
    textSecondary: isDark ? '#9CA3AF' : '#757575',
    border: isDark ? '#404040' : '#E5E7EB',
    accent: '#2E7D32',
  };

  return (
    <AppLayout
      theme={theme}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
    >
      <HomeScreen/>
    </AppLayout>
  );
}
