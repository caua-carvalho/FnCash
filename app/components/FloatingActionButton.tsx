import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  isDark: boolean;
  accent: string;
};

export default function FloatingActionButton({ isDark, accent }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: isDark ? '#FFFFFF' : '#141414',
            shadowColor: isDark ? '#FFFFFF' : '#141414',
          },
        ]}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="microphone" size={32} color={accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
