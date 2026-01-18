declare module 'expo-symbols' {
  import type { ComponentType } from 'react';
    import type { ViewProps } from 'react-native';

  export interface MaterialSymbolsProps extends ViewProps {
    name: string;
    size?: number;
    weight?: number;
    color?: string;
    fill?: boolean;
  }

  export const MaterialSymbols: ComponentType<MaterialSymbolsProps>;
}
