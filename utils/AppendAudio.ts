import { Platform } from 'react-native';

export async function appendAudio(
  formData: FormData,
  audioUri: string
) {
  if (Platform.OS === 'web') {
    const response = await fetch(audioUri);
    const blob = await response.blob();

    formData.append('audio', blob, 'audio.ogg');
    return;
  }

  // Android / iOS
  formData.append('audio', {
    uri: audioUri,
    name: 'audio.ogg',
    type: 'audio/ogg',
  } as any);

}
