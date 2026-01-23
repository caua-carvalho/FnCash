/**
 * @file components/Button.tsx
 * @description Componente de botão customizado e reutilizável
 * Suporta diferentes variantes e tamanhos
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from 'react-native';

/**
 * Variantes de estilo do botão
 * @type {string}
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Tamanhos do botão
 * @type {string}
 */
type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props do componente Button
 * @interface ButtonProps
 */
interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Texto do botão */
  label: string;
  /** Variante de estilo */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Se o botão está carregando */
  loading?: boolean;
  /** Ícone a exibir à esquerda do texto */
  leftIcon?: string;
  /** Ícone a exibir à direita do texto */
  rightIcon?: string;
  /** Largura customizada */
  fullWidth?: boolean;
  /** Callback quando pressionado */
  onPress?: () => void;
  /** Se o botão está desativado */
  disabled?: boolean;
}

/**
 * Componente de botão customizado
 * Suporta múltiplas variantes e tamanhos
 *
 * @component
 * @example
 * <Button label="Adicionar" variant="primary" onPress={() => {}} />
 * <Button label="Cancelar" variant="ghost" size="small" />
 * <Button label="Carregando..." loading={true} />
 */
export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onPress,
  disabled = false,
  ...props
}: ButtonProps) {
  // Define estilos baseado na variante
  const getBackgroundColor = () => {
    if (disabled || loading) return '#E5E7EB';
    switch (variant) {
      case 'primary':
        return '#141414';
      case 'secondary':
        return '#F3F4F6';
      case 'danger':
        return '#EF4444';
      case 'ghost':
        return 'transparent';
      default:
        return '#141414';
    }
  };

  const getTextColor = () => {
    if (disabled || loading) return '#9CA3AF';
    switch (variant) {
      case 'primary':
        return '#fff';
      case 'secondary':
        return '#141414';
      case 'danger':
        return '#fff';
      case 'ghost':
        return '#141414';
      default:
        return '#fff';
    }
  };

  // Define tamanho e padding
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 12,
        };
      case 'medium':
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingHorizontal: 20,
          paddingVertical: 16,
          fontSize: 16,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 14,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          width: fullWidth ? '100%' : 'auto',
          opacity: pressed && !disabled ? 0.8 : 1,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
      ]}
      {...props}
    >
      <View style={styles.content}>
        {/* Ícone esquerdo */}
        {leftIcon && !loading && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={20}
            color={getTextColor()}
            style={styles.icon}
          />
        )}

        {/* Indicador de carregamento */}
        {loading && <ActivityIndicator color={getTextColor()} size="small" style={styles.icon} />}

        {/* Texto */}
        <Text style={[styles.text, { color: getTextColor(), fontSize: sizeStyles.fontSize }]}>
          {label}
        </Text>

        {/* Ícone direito */}
        {rightIcon && !loading && (
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={getTextColor()}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
