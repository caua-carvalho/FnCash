import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  theme: any;
  onToggleTheme: () => void;
};

export default function BottomNav({ theme, onToggleTheme }: Props) {
  return (
    <View style={[styles.container, {
      backgroundColor: `${theme.bg}CC`,
      borderTopColor: theme.border,
    }]}>
      <NavItem icon="home" label="Início" active theme={theme} />
      <NavItem icon="chart-pie" label="Análise" theme={theme} />
      <View style={{ width: 48 }} />
      <NavItem icon="wallet" label="Carteira" theme={theme} />
      <NavItem icon="cog" label="Ajustes" theme={theme} onPress={onToggleTheme} />
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  theme,
  onPress,
}: any) {
  const color = active ? theme.text : theme.textSecondary;

  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: 'center',
    width: 48,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
});
