/**
 * @file app/add.tsx
 * @description Tela de Adicionar Transação com Gravação de Áudio
 * Fluxo: Gravar áudio → Backend (STT + IA) → Confirmar (editável) → Salvar
 */

import { Button, CategorySelector } from '@/components';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useTransactions } from '@/hooks/useTransactions';
import { aiService } from '@/services/aiService';
import type { AICategorizationResponse } from '@/services/aiService';
import type { TransactionType } from '@/types/transaction';
import { formatTime } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Category } from '@/types/transaction';

const USER_ID = 'user-123';

type ScreenState = 'recording' | 'confirming' | 'processing' | 'success';

export default function AddTransactionScreen() {
  const {
    isRecording,
    recordingTime,
    error: recordingError,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecorder();

  const { createTransaction, error: transactionError } =
    useTransactions(USER_ID);

  const router = useRouter();

  const [screenState, setScreenState] =
    useState<ScreenState>('recording');

  const [categorization, setCategorization] =
    useState<AICategorizationResponse | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | undefined>();

  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  /** DATA */
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const resetScreen = () => {
    clearRecording();
    setCategorization(null);
    setSelectedCategory(undefined);
    setAmount(0);
    setDescription('');
    setTransactionType('expense');
    setDate(new Date());
    setScreenState('recording');
  };

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch {
      Alert.alert('Erro', 'Não foi possível iniciar a gravação');
    }
  };

  const handleStopRecording = async () => {
    try {
      const uri = await stopRecording();
      setScreenState('processing');

      const result = await aiService.categorizeAudio(USER_ID, uri);

      setCategorization(result);
      setSelectedCategory(result.category);
      setAmount(result.amount);
      setDescription(result.description);
      setTransactionType(result.type);

      setScreenState('confirming');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao processar o áudio');
      setScreenState('recording');
    }
  };

  const handleConfirm = async () => {
    if (
      !selectedCategory ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      description.trim().length < 3
    ) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    try {
      setScreenState('processing');

      const payload = {
        user_id: USER_ID,
        amount,
        category: selectedCategory,
        type: transactionType,
        description: description.trim(),
        date: date.toISOString(),
      };

      const result = await createTransaction(payload);

      if (!result) {
        throw new Error(transactionError || 'Erro ao salvar');
      }

      setScreenState('success');

      setTimeout(resetScreen, 1200);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a transação');
      setScreenState('confirming');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top'] as const}>
      {screenState === 'recording' && (
        <>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#141414" />
            </Pressable>
            <Text style={styles.headerTitle}>Novo Gasto</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.mainTitle}>Toque para falar</Text>
            <Text style={styles.subtitle}>Gravação de áudio</Text>

            <View style={styles.audioVisualizer}>
              <Pressable
                onPress={isRecording ? handleStopRecording : handleStartRecording}
                style={[
                  styles.recordButton,
                  isRecording && styles.recordButtonActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={isRecording ? 'check' : 'microphone'}
                  size={48}
                  color="#fff"
                />
              </Pressable>
            </View>

            <Text style={styles.recordingTime}>
              {formatTime(recordingTime)}
            </Text>

            {recordingError && (
              <Text style={styles.errorText}>{recordingError}</Text>
            )}
          </ScrollView>
        </>
      )}

      {screenState === 'confirming' && (
        <>
          <View style={styles.header}>
            <Pressable onPress={resetScreen}>
              <Text style={styles.headerButton}>Cancelar</Text>
            </Pressable>
            <Pressable onPress={handleConfirm}>
              <Text style={styles.headerTitle}>Confirmar</Text>
            </Pressable>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              value={String(amount)}
              onChangeText={(v) =>
                setAmount(Number(v.replace(',', '.')))
              }
            />

            <CategorySelector
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* DATE PICKER */}
            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialCommunityIcons name="calendar" size={20} />
              <Text style={styles.dateText}>
                {date.toLocaleDateString('pt-BR')}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            <View style={styles.typeSelector}>
              <Pressable onPress={() => setTransactionType('expense')}>
                <Text
                  style={[
                    styles.typeOption,
                    transactionType === 'expense' && styles.typeActive,
                  ]}
                >
                  Despesa
                </Text>
              </Pressable>

              <Pressable onPress={() => setTransactionType('income')}>
                <Text
                  style={[
                    styles.typeOption,
                    transactionType === 'income' && styles.typeActive,
                  ]}
                >
                  Receita
                </Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição"
              multiline
            />

            {categorization && (
              <Text style={styles.confidenceText}>
                IA ({Math.round(categorization.confidence * 100)}%)
              </Text>
            )}

            <View style={styles.actionButtons}>
              <Button
                label="Cancelar"
                variant="secondary"
                onPress={resetScreen}
                fullWidth
              />
              <Button
                label="Confirmar"
                variant="primary"
                onPress={handleConfirm}
                fullWidth
              />
            </View>
          </ScrollView>
        </>
      )}

      {screenState === 'processing' && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.processingText}>Processando...</Text>
        </View>
      )}

      {screenState === 'success' && (
        <View style={styles.processingContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={64}
            color="#10B981"
          />
          <Text style={styles.processingText}>Salvo com sucesso</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: { fontWeight: '700', fontSize: 16 },
  headerButton: { color: '#6B7280' },
  headerSpacer: { width: 40 },
  closeButton: { width: 40 },

  contentContainer: { padding: 24 },

  mainTitle: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#9CA3AF', marginBottom: 24 },

  audioVisualizer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },

  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonActive: { backgroundColor: '#374151' },

  recordingTime: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
  },

  errorText: { color: '#DC2626', textAlign: 'center' },

  amountInput: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },

  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
  },

  dateText: { fontSize: 14 },

  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },

  typeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  typeActive: {
    backgroundColor: '#111827',
    color: '#fff',
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 16,
  },

  confidenceText: {
    fontSize: 12,
    color: '#16A34A',
    marginBottom: 16,
  },

  actionButtons: { gap: 12 },

  processingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  processingText: { marginTop: 12, fontWeight: '600' },
});
