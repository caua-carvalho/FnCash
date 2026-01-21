/**
 * @file app/_layout.tsx
 * @description Configuração de navegação raiz da aplicação
 * Define as telas e o padrão de navegação
 */

import { audioService } from '@/services';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

/**
 * Layout raiz da aplicação
 * Configura a navegação por abas (tabs)
 */
export default function RootLayout() {
  /**
   * Inicializa a sessão de áudio ao montar
   * Necessário para gravar áudio
   */
  useEffect(() => {
    const initAudio = async () => {
      try {
        await audioService.setupAudioSession();
        console.log('✓ Sessão de áudio inicializada');
      } catch (error) {
        console.error('Erro ao inicializar áudio:', error);
      }
    };

    initAudio();

    return () => {
      audioService.cleanup();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        // Cabeçalho padrão
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#141414',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },

        // Abas
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#141414',
        tabBarInactiveTintColor: '#D1D5DB',
      }}
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'FnCash',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Histórico */}
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          headerTitle: 'Histórico',
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />

      {/* Adicionar Transação */}
      <Tabs.Screen
        name="add"
        options={{
          title: 'Adicionar',
          headerShown: false,
          tabBarLabel: 'Adicionar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          ),
        }}
      />

      {/* Configurações */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          headerTitle: 'Configurações',
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
