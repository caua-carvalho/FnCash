/**
 * @file hooks/useAudioRecorder.ts
 * @description Hook customizado para gerenciar gravação de áudio
 * Encapsula a lógica de estado do AudioService em um hook reutilizável
 */

import { audioService } from '@/services';
import { useCallback, useEffect, useState } from 'react';

/**
 * Interface para o estado de gravação
 * @interface AudioRecorderState
 */
export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number; // em segundos
  recordingUri: string | null;
  error: string | null;
}

/**
 * Hook para gerenciar gravação de áudio
 * Fornece métodos para controlar e monitorar gravação
 *
 * @returns {Object} Estado e métodos de controle
 * @example
 * const { isRecording, startRecording, stopRecording, recordingTime } = useAudioRecorder();
 */
export function useAudioRecorder() {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    recordingUri: null,
    error: null,
  });

  // Timer para contar tempo de gravação
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRecording && !state.isPaused) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isRecording, state.isPaused]);

  /**
   * Inicia uma nova gravação
   * @returns {Promise<void>}
   */
  const startRecording = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      await audioService.startRecording();
      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        recordingTime: 0,
        recordingUri: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao iniciar gravação';
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, []);

  /**
   * Pausa a gravação atual
   * @returns {Promise<void>}
   */
  const pauseRecording = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      await audioService.pauseRecording();
      setState((prev) => ({ ...prev, isPaused: true }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao pausar gravação';
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, []);

  /**
   * Retoma uma gravação pausada
   * @returns {Promise<void>}
   */
  const resumeRecording = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      await audioService.resumeRecording();
      setState((prev) => ({ ...prev, isPaused: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao retomar gravação';
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, []);

  /**
   * Para a gravação e retorna o URI do arquivo
   * @returns {Promise<string|null>} URI do arquivo gravado
   */
  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      const uri = await audioService.stopRecording();
      setState((prev) => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        recordingUri: uri,
      }));
      return uri;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao parar gravação';
      setState((prev) => ({ ...prev, error: errorMessage, isRecording: false }));
      return null;
    }
  }, []);

  /**
   * Limpa o estado de gravação
   * Útil quando o usuário quer descartar a gravação
   */
  const clearRecording = useCallback(() => {
    setState({
      isRecording: false,
      isPaused: false,
      recordingTime: 0,
      recordingUri: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    clearRecording,
  };
}
