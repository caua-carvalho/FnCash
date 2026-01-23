/**
 * @file app/settings.tsx
 * @description Tela de Configurações da Aplicação
 * Informações, versão e configurações gerais
 */

import { aiService } from '@/services';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Interface para item de settings
 * @interface SettingsItem
 */
interface SettingsItem {
  icon: string;
  title: string;
  description?: string;
  onPress?: () => void;
}

/**
 * Tela de Configurações
 * Exibe informações e opções de configuração
 */
export default function SettingsScreen() {
  /**
   * Alterna modo de mock para testes
   */
  const handleToggleMockMode = () => {
    const isUsingMock = aiService.isUsingMock();
    aiService.setUseMock(!isUsingMock);

    Alert.alert(
      'Modo de Teste',
      isUsingMock
        ? 'Modo de mock desativado. Usando backend real.'
        : 'Modo de mock ativado. Usando dados fictícios para testes.'
    );
  };

  /**
   * Mostra informações sobre a API
   */
  const handleShowAPIInfo = () => {
    Alert.alert(
      'Configuração de API',
      'Para usar a IA real com Gemini:\n\n' +
        '1. Configure a variável de ambiente EXPO_PUBLIC_GEMINI_API_KEY\n' +
        '2. Implemente o serviço de categorização no seu backend\n\n' +
        'Atualmente em modo de desenvolvimento com dados fictícios.'
    );
  };

  const settingsItems: SettingsItem[] = [
    {
      icon: 'information',
      title: 'Versão do Aplicativo',
      description: '1.0.0 (MVP)',
    },
    {
      icon: 'api',
      title: 'Configuração de API',
      description: 'Saiba como integrar sua API',
      onPress: handleShowAPIInfo,
    },
    {
      icon: 'remote',
      title: 'Modo de Teste',
      description: 'Alterna entre dados reais e fictícios',
      onPress: handleToggleMockMode,
    },
    {
      icon: 'code-braces',
      title: 'Documentação',
      description: 'Acesse a documentação do código',
    },
    {
      icon: 'bug',
      title: 'Relatar Erro',
      description: 'Ajude-nos a melhorar o app',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.appIcon}>
          <MaterialCommunityIcons name="wallet" size={40} color="#141414" />
        </View>
        <Text style={styles.appName}>FnCash</Text>
        <Text style={styles.appDescription}>Gerenciador de Finanças com IA</Text>
      </View>

      {/* Settings Items */}
      <View style={styles.settingsSection}>
        {settingsItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={({ pressed }) => [styles.settingItem, pressed && styles.settingItemPressed]}
          >
            <View style={styles.settingContent}>
              <View style={styles.settingIconBox}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color="#141414" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                {item.description && (
                  <Text style={styles.settingDescription}>{item.description}</Text>
                )}
              </View>
            </View>
            {item.onPress && (
              <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
            )}
          </Pressable>
        ))}
      </View>

      {/* Desenvolvimento */}
      <View style={styles.devSection}>
        <Text style={styles.sectionTitle}>Desenvolvimento</Text>
        
        <View style={styles.devCard}>
          <Text style={styles.devCardTitle}>Arquitetura</Text>
          <Text style={styles.devCardText}>
            • TypeScript + Expo + React Native{'\n'}
            • Serviços centralizados (Audio, IA, Transações){'\n'}
            • Hooks customizados reutilizáveis{'\n'}
            • Componentes modulares
          </Text>
        </View>

        <View style={styles.devCard}>
          <Text style={styles.devCardTitle}>Principais Funcionalidades</Text>
          <Text style={styles.devCardText}>
            • Gravação de áudio com expo-av{'\n'}
            • Categorização via IA (Gemini mock){'\n'}
            • Persistência com backend{'\n'}
            • Resumos e relatórios{'\n'}
            • Histórico com filtros
          </Text>
        </View>

        <View style={styles.devCard}>
          <Text style={styles.devCardTitle}>Próximos Passos</Text>
          <Text style={styles.devCardText}>
            • Integração com API Gemini real{'\n'}
            • Autenticação com Firebase{'\n'}
            • Sincronização offline{'\n'}
            • Gráficos e analytics{'\n'}
            • Export de dados
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>FnCash • MVP v1.0.0</Text>
        <Text style={styles.footerSubtext}>Desenvolvido com ❤️ para gerenciar suas finanças</Text>
      </View>

      {/* Espaço */}
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#141414',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  settingItemPressed: {
    backgroundColor: '#F3F4F6',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#141414',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  devSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#141414',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  devCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  devCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#141414',
    marginBottom: 8,
  },
  devCardText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#141414',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  spacer: {
    height: 40,
  },
});
