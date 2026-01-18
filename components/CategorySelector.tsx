/**
 * @file components/CategorySelector.tsx
 * @description Componente para seleção de categoria
 * Exibe todas as categorias com ícones e cores
 */

import { CATEGORIES, CATEGORY_CONFIG } from '@/constants/categories';
import type { Category } from '@/types/transaction';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Props do componente CategorySelector
 * @interface CategorySelectorProps
 */
interface CategorySelectorProps {
  /** Categoria selecionada */
  selected?: Category;
  /** Callback quando categoria é selecionada */
  onSelect: (category: Category) => void;
}

/**
 * Componente para seleção de categoria
 * Mostra todas as categorias com ícones
 *
 * @component
 * @example
 * <CategorySelector
 *   selected="Alimentação"
 *   onSelect={(category) => setCategory(category)}
 * />
 */
export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
    >
      {CATEGORIES.map((category) => {
        const config = CATEGORY_CONFIG[category];
        const isSelected = selected === category;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            style={[
              styles.categoryButton,
              isSelected && [styles.categoryButtonSelected, { borderColor: config.color }],
            ]}
          >
            <View
              style={[styles.categoryIconBox, { backgroundColor: config.colorLight }]}
            >
              <MaterialCommunityIcons
                name={config.icon as any}
                size={24}
                color={config.color}
              />
            </View>
            <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
  },
  categoryButtonSelected: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
  },
  categoryIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#141414',
    fontWeight: '600',
  },
});
