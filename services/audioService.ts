/**
 * @file services/audioService.ts
 * @description Serviço para gravação e reprodução de áudio usando expo-av
 * Gerencia todo o ciclo de vida do áudio (gravação, pausa, reprodução)
 */


/**
 * Interface para controle de gravação de áudio
 * @interface AudioRecording
 * @property {AudioType.Recording} recording - Instância de gravação do expo-av
 * @property {string} uri - URI do arquivo de áudio salvo
 */
interface AudioRecording {
  recording: AudioType.Recording;
  uri: string;
}

/**
 * Classe para gerenciar operações de áudio
 * Implementa padrão singleton para garantir uma única instância
 */
export class AudioService {
  private static instance: AudioService;
  private recording: AudioType.Recording | null = null;
  private sound: AudioType.Sound | null = null;
  private recordingUri: string | null = null;
  private isRecording: boolean = false;
  private isPaused: boolean = false;

  /**
   * Obtém instância única do serviço (singleton)
   * @returns {AudioService} Instância do serviço
   */
  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  /**
   * Configura as permissões de áudio necessárias
   * Deve ser chamado uma vez ao iniciar a aplicação
   * @returns {Promise<void>}
   * @throws {Error} Se as permissões não forem concedidas
   */
  async setupAudioSession(): Promise<void> {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Erro ao configurar sessão de áudio:', error);
      throw new Error('Não foi possível acessar o áudio do dispositivo');
    }
  }

  /**
   * Inicia uma nova gravação de áudio
   * @returns {Promise<string>} URI do arquivo de áudio
   * @throws {Error} Se houver erro ao iniciar a gravação
   */
  async startRecording(): Promise<string> {
    try {
      // Se há uma gravação anterior, descarta
      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
      }

      this.recording = new Audio.Recording();

      // Configura opções de gravação otimizadas
      await this.recording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      await this.recording.startAsync();
      this.isRecording = true;
      this.isPaused = false;
      this.recordingUri = null;

      return 'Gravação iniciada';
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      throw new Error('Não foi possível iniciar a gravação');
    }
  }

  /**
   * Pausa a gravação atual
   * @returns {Promise<void>}
   * @throws {Error} Se não houver gravação ativa
   */
  async pauseRecording(): Promise<void> {
    try {
      if (!this.recording) {
        throw new Error('Nenhuma gravação ativa');
      }

      await this.recording.pauseAsync();
      this.isPaused = true;
    } catch (error) {
      console.error('Erro ao pausar gravação:', error);
      throw new Error('Não foi possível pausar a gravação');
    }
  }

  /**
   * Retoma uma gravação pausada
   * @returns {Promise<void>}
   * @throws {Error} Se não houver gravação pausada
   */
  async resumeRecording(): Promise<void> {
    try {
      if (!this.recording || !this.isPaused) {
        throw new Error('Nenhuma gravação pausada');
      }

      await this.recording.startAsync();
      this.isPaused = false;
    } catch (error) {
      console.error('Erro ao retomar gravação:', error);
      throw new Error('Não foi possível retomar a gravação');
    }
  }

  /**
   * Para a gravação e retorna o URI do arquivo
   * @returns {Promise<string>} URI do arquivo de áudio gravado
   * @throws {Error} Se houver erro ao parar a gravação
   */
  async stopRecording(): Promise<string> {
    try {
      if (!this.recording) {
        throw new Error('Nenhuma gravação ativa');
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      this.isRecording = false;
      this.isPaused = false;
      this.recordingUri = uri || null;

      if (!uri) {
        throw new Error('Não foi possível obter o arquivo de áudio');
      }

      return uri;
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
      throw new Error('Não foi possível parar a gravação');
    }
  }

  /**
   * Reproduz um arquivo de áudio
   * @param {string} uri - URI do arquivo de áudio
   * @returns {Promise<void>}
   * @throws {Error} Se houver erro ao reproduzir
   */
  async playAudio(uri: string): Promise<void> {
    try {
      // Se há um som anterior, descarrega
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      this.sound = new Audio.Sound();
      await this.sound.loadAsync({ uri });
      await this.sound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      throw new Error('Não foi possível reproduzir o áudio');
    }
  }

  /**
   * Para a reprodução de áudio
   * @returns {Promise<void>}
   * @throws {Error} Se houver erro ao parar
   */
  async stopAudio(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.error('Erro ao parar áudio:', error);
      throw new Error('Não foi possível parar o áudio');
    }
  }

  /**
   * Converte arquivo de áudio para base64
   * Útil para enviar ao backend
   * @param {string} uri - URI do arquivo de áudio
   * @returns {Promise<string>} Conteúdo em base64
   * @throws {Error} Se houver erro na conversão
   */
  async audioToBase64(uri: string): Promise<string> {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error('Erro ao converter áudio para base64:', error);
      throw new Error('Não foi possível processar o arquivo de áudio');
    }
  }

  /**
   * Verifica o tamanho do arquivo de áudio
   * @param {string} uri - URI do arquivo de áudio
   * @returns {Promise<number>} Tamanho em bytes
   * @throws {Error} Se houver erro ao obter tamanho
   */
  async getAudioFileSize(uri: string): Promise<number> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists || !fileInfo.size) {
        throw new Error('Arquivo de áudio não encontrado');
      }
      return fileInfo.size;
    } catch (error) {
      console.error('Erro ao obter tamanho do áudio:', error);
      throw new Error('Não foi possível verificar o tamanho do arquivo');
    }
  }

  /**
   * Limpa recursos de áudio
   * Deve ser chamado ao desmontar componentes
   * @returns {Promise<void>}
   */
  async cleanup(): Promise<void> {
    try {
      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
        this.recording = null;
      }

      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }

      this.isRecording = false;
      this.isPaused = false;
    } catch (error) {
      console.error('Erro ao limpar recursos de áudio:', error);
    }
  }

  /**
   * Obtém status atual da gravação
   * @returns {Object} Status da gravação
   */
  getStatus() {
    return {
      isRecording: this.isRecording,
      isPaused: this.isPaused,
      recordingUri: this.recordingUri,
    };
  }
}

// Exporta instância única do serviço
export const audioService = AudioService.getInstance();
