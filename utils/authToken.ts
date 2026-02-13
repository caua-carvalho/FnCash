import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  async get(): Promise<string | null> {
    try {
      // Web usa AsyncStorage abstraction (localStorage wrapper interno)
      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(TOKEN_KEY);
      }

      // Mobile: tenta SecureStore primeiro
      const secureToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (secureToken) {
        return secureToken;
      }

      // fallback AsyncStorage
      return await AsyncStorage.getItem(TOKEN_KEY);

    } catch {
      return null;
    }
  },

  async set(token: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log("token" + token);
        return;
      }

      console.log("token" + token);

      // salva nos dois: segurança + fallback
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await AsyncStorage.setItem(TOKEN_KEY, token);

    } catch {
      // fallback mínimo
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }
  },

  async remove(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(TOKEN_KEY);
        return;
      }

      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);

    } catch {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  },
};
