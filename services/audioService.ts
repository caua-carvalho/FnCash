/**
 * @file services/audioService.ts
 * @description Serviço responsável exclusivamente por gravação de áudio
 * Compatível com Expo SDK 54
 */

import { Audio } from 'expo-av';
import { Platform } from 'react-native';

class AudioService {
  private recording: Audio.Recording | null = null;
  private isPaused = false;
  private isReady = false;

  /**
   * Inicialização obrigatória
   */
  private async setup(): Promise<void> {
    if (this.isReady || Platform.OS === 'web') return;

    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      throw new Error('Permissão de microfone negada');
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    this.isReady = true;
  }

  /**
   * Inicia gravação
   */
  async startRecording(): Promise<void> {
    if (this.recording) {
      throw new Error('Gravação já em andamento');
    }

    await this.setup();

    const recording = new Audio.Recording();

    await recording.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
      },
      ios: {
        extension: '.m4a',
        audioQuality: Audio.IOSAudioQuality.HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {},
    });

    await recording.startAsync();

    this.recording = recording;
    this.isPaused = false;
  }

  /**
   * Pausa gravação
   */
  async pauseRecording(): Promise<void> {
    if (!this.recording || this.isPaused) {
      throw new Error('Nenhuma gravação ativa para pausar');
    }

    await this.recording.pauseAsync();
    this.isPaused = true;
  }

  /**
   * Retoma gravação
   */
  async resumeRecording(): Promise<void> {
    if (!this.recording || !this.isPaused) {
      throw new Error('Nenhuma gravação pausada para retomar');
    }

    await this.recording.startAsync();
    this.isPaused = false;
  }

  /**
   * Finaliza gravação
   */
  async stop(): Promise<string> {
    if (!this.recording) {
      throw new Error('Nenhuma gravação ativa');
    }

    await this.recording.stopAndUnloadAsync();
    const uri = this.recording.getURI();

    this.recording = null;
    this.isPaused = false;

    if (!uri) {
      throw new Error('Falha ao gerar arquivo de áudio');
    }

    return uri;
  }

  /**
   * Estado interno
   */
  isRecording(): boolean {
    return !!this.recording && !this.isPaused;
  }

  isPausedRecording(): boolean {
    return !!this.recording && this.isPaused;
  }
}

export const audioService = new AudioService();
