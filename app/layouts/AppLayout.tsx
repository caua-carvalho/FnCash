import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import FloatingActionButton from '../components/FloatingActionButton';

type Props = {
  children: React.ReactNode;
  theme: any;
  isDark: boolean;
  onToggleTheme: () => void;
};

export function AppLayout({
  children,
  theme,
  isDark,
  onToggleTheme,
}: Props) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.content}>
        {children}
      </View>

      <FloatingActionButton isDark={isDark} accent={theme.accent} />

      <BottomNav
        theme={theme}
        onToggleTheme={onToggleTheme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
