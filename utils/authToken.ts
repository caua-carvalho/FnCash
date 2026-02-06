import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const tokenStorage = {
  async get() {
    if (Platform.OS === 'web') {
      return localStorage.getItem('auth_token');
    }
    return SecureStore.getItemAsync('auth_token');
  },

  async set(token: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem('auth_token', token);
      return;
    }
    await SecureStore.setItemAsync('auth_token', token);
  },

  async remove() {
    if (Platform.OS === 'web') {
      localStorage.removeItem('auth_token');
      return;
    }
    await SecureStore.deleteItemAsync('auth_token');
  },
};
