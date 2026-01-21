/**
 * @file app/add.tsx
 * @description Tela de Adicionar Transação com Gravação de Áudio
 * Fluxo principal: Gravar áudio → IA categoriza → Confirmar → Salvar
 *
 * USUÁRIO MOCK: "user-123"
 */

import { Button, CategorySelector } from '@/components';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useTransactions } from '@/hooks/useTransactions';
import { aiService, audioService } from '@/services';
import type { AICategorizationResponse } from '@/services/aiService';
import type { TransactionType } from '@/types/transaction';
import { formatCurrency, formatTime } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock: ID do usuário
const USER_ID = 'user-123';

/**
 * Estados da tela
 * @type {string}
 */
type ScreenState = 'recording' | 'confirming' | 'processing' | 'success';

/**
 * Tela de Adicionar Transação
 * Gerencia gravação de áudio e categorização automática
 */
export default function AddTransactionScreen() {
  // Estado de gravação
  const {
    isRecording,
    isPaused,
    recordingTime,
    recordingUri,
    error: recordingError,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  // Estado de transações
  const { createTransaction, error: transactionError } = useTransactions(USER_ID);

  const router = useRouter();
  const [categorization, setCategorization] = useState<AICategorizationResponse | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>('recording');
  const [selectedCategory, setSelectedCategory] = useState(categorization?.category);
  const [amount, setAmount] = useState(categorization?.amount || 0);
  const [description, setDescription] = useState(categorization?.description || '');
  const [transactionType, setTransactionType] = useState<TransactionType>(
    categorization?.type || 'expense'
  );

  /**
   * Inicia gravação de áudio
   */
  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível iniciar a gravação');
    }
  };

  /**
   * Pausa a gravação
   */
  const handlePauseRecording = async () => {
    try {
      await pauseRecording();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível pausar a gravação');
    }
  };

  /**
   * Retoma a gravação
   */
  const handleResumeRecording = async () => {
    try {
      await resumeRecording();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível retomar a gravação');
    }
  };

  /**
   * Para a gravação e inicia categorização
   */
  const handleStopRecording = async () => {
    try {
      // Para a gravação
      const uri = await stopRecording();
      if (!uri) {
        Alert.alert('Erro', 'Não foi possível processar o áudio');
        return;
      }

      // Inicia processamento
      setScreenState('processing');

      // Converte áudio para base64
      const audioBase64 = await audioService.audioToBase64(uri);

      // Envia para IA
      const result = await aiService.categorizeAudio(USER_ID, audioBase64);

      // Atualiza estado com resposta da IA
      setCategorization(result);
      setSelectedCategory(result.category);
      setAmount(result.amount);
      setDescription(result.description);
      setTransactionType(result.type);
      setScreenState('confirming');
    } catch (error) {
      console.error('Erro ao processar áudio:', error);
      Alert.alert('Erro', 'Não foi possível processar o áudio. Tente novamente.');
      setScreenState('recording');
    }
  };

  /**
   * Cancela e volta para gravação
   */
  const handleCancel = () => {
    clearRecording();
    setCategorization(null);
    setSelectedCategory(undefined);
    setAmount(0);
    setDescription('');
    setTransactionType('expense');
    setScreenState('recording');
  };

  /**
   * Confirma e salva a transação
   */
  const handleConfirm = async () => {
    // Valida dados
    if (!selectedCategory || amount <= 0 || !description) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    try {
      setScreenState('processing');

      // Prepara payload
      const payload = {
        userId: USER_ID,
        amount,
        category: selectedCategory,
        type: transactionType,
        description,
        date: new Date().toISOString(),
        audioFile: recordingUri ? await audioService.audioToBase64(recordingUri) : undefined,
      };

      // Cria transação no backend
      const result = await createTransaction(payload);

      if (result) {
        setScreenState('success');

        // Mostra sucesso e volta para home
        setTimeout(() => {
          router.replace('/');
        }, 2000);
      } else {
        Alert.alert('Erro', transactionError || 'Erro ao salvar transação');
        setScreenState('confirming');
      }
    } catch (error) {
      console.error('Erro ao confirmar transação:', error);
      Alert.alert('Erro', 'Não foi possível salvar a transação');
      setScreenState('confirming');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top'] as const}>
      {screenState === 'recording' && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#141414" />
            </Pressable>
            <Text style={styles.headerTitle}>Novo Gasto</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Conteúdo */}
          <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
            {/* Título */}
            <Text style={styles.mainTitle}>Toque para falar</Text>
            <Text style={styles.subtitle}>Gravando Áudio</Text>

            {/* Visualizador de Áudio */}
            <View style={styles.audioVisualizer}>
              {/* Rings de pulsação */}
              <View style={styles.ring3} />
              <View style={styles.ring2} />
              <View style={styles.ring1} />

              {/* Botão de gravação */}
              <Pressable
                onPress={isRecording && !isPaused ? handlePauseRecording : handleStartRecording}
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={isRecording && !isPaused ? 'pause' : 'microphone'}
                  size={48}
                  color="#fff"
                />
              </Pressable>
            </View>

            {/* Controles */}
            <View style={styles.controlsContainer}>
              {/* Tempo de gravação */}
              <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>

              {/* Botões de ação */}
              <View style={styles.buttonGroup}>
                {isRecording ? (
                  <>
                    {/* Pause/Resume */}
                    <Button
                      label={isPaused ? 'Retomar' : 'Pausar'}
                      variant="secondary"
                      size="medium"
                      leftIcon={isPaused ? 'play_arrow' : 'pause'}
                      onPress={isPaused ? handleResumeRecording : handlePauseRecording}
                    />

                    {/* Stop */}
                    <Button
                      label="Concluir"
                      variant="primary"
                      size="medium"
                      rightIcon="check"
                      onPress={handleStopRecording}
                    />
                  </>
                ) : (
                  <>
                    {/* Start */}
                    <Button
                      label="Iniciar Gravação"
                      variant="primary"
                      size="large"
                      fullWidth
                      rightIcon="microphone"
                      onPress={handleStartRecording}
                    />
                  </>
                )}
              </View>

              {/* Erro */}
              {recordingError && (
                <View style={styles.errorContainer}>
                  <MaterialCommunityIcons name="alert" size={16} color="#EF4444" />
                  <Text style={styles.errorText}>{recordingError}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}

      {screenState === 'confirming' && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleCancel} style={styles.closeButton}>
              <Text style={styles.headerButton}>Cancelar</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Confirmar</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Conteúdo */}
          <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
            {/* Valor */}
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>R$</Text>
              <Text style={styles.amountText}>{formatCurrency(amount)}</Text>
            </View>

            {/* Seletor de Tipo */}
            <View style={styles.typeSelector}>
              <Pressable
                onPress={() => setTransactionType('expense')}
                style={[
                  styles.typeButton,
                  transactionType === 'expense' && styles.typeButtonActive,
                ]}
              >
                <Text style={[
                  styles.typeButtonText,
                  transactionType === 'expense' && styles.typeButtonTextActive,
                ]}>
                  Gasto
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTransactionType('income')}
                style={[
                  styles.typeButton,
                  transactionType === 'income' && styles.typeButtonActive,
                ]}
              >
                <Text style={[
                  styles.typeButtonText,
                  transactionType === 'income' && styles.typeButtonTextActive,
                ]}>
                  Ganho
                </Text>
              </Pressable>
            </View>

            {/* Seletor de Categoria */}
            <Text style={styles.label}>Categoria</Text>
            <CategorySelector
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Descrição */}
            <Text style={styles.label}>Descrição</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{description}</Text>
            </View>

            {/* Confiança da IA */}
            {categorization && (
              <View style={styles.confidenceContainer}>
                <MaterialCommunityIcons
                  name="lightbulb"
                  size={14}
                  color="#10B981"
                />
                <Text style={styles.confidenceText}>
                  Interpretado por IA ({Math.round(categorization.confidence * 100)}% de confiança)
                </Text>
              </View>
            )}

            {/* Botões de ação */}
            <View style={styles.actionButtons}>
              <Button
                label="Cancelar"
                variant="secondary"
                size="medium"
                onPress={handleCancel}
                fullWidth
              />
              <Button
                label="Confirmar"
                variant="primary"
                size="medium"
                rightIcon="check"
                onPress={handleConfirm}
                fullWidth
              />
            </View>
          </ScrollView>
        </>
      )}

      {screenState === 'processing' && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#141414" />
          <Text style={styles.processingText}>Processando...</Text>
        </View>
      )}

      {screenState === 'success' && (
        <View style={styles.successContainer}>
          <MaterialCommunityIcons name="check-circle" size={64} color="#10B981" />
          <Text style={styles.successText}>Transação Salva!</Text>
          <Text style={styles.successSubtext}>Você será redirecionado...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141414',
  },
  closeButton: {
    width: 40,
  },
  headerButton: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#141414',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 32,
  },
  audioVisualizer: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  ring1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  ring2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  ring3: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  recordButton: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  recordButtonActive: {
    backgroundColor: '#374151',
  },
  controlsContainer: {
    gap: 20,
  },
  recordingTime: {
    fontSize: 32,
    fontWeight: '700',
    color: '#141414',
    textAlign: 'center',
  },
  buttonGroup: {
    gap: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#991B1B',
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 32,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  amountText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#141414',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#141414',
    borderColor: '#141414',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  inputText: {
    fontSize: 14,
    color: '#141414',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    marginBottom: 20,
  },
  confidenceText: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '500',
  },
  actionButtons: {
    gap: 12,
    marginTop: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#141414',
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  successSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
});
