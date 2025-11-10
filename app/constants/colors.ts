/**
 * Renk Sabitleri - Inc. Mimarlık
 * Tüm projede kullanılacak renkler bu dosyada tanımlanmıştır.
 * Hardcoded renk kodları kullanmayın, bu sabitleri kullanın.
 */

export const colors = {
  // Primary Colors
  primary: '#0A0A0A',
  accent: '#B8976A',
  
  // Background Colors
  backgroundGradientTop: '#fff6eb',
  backgroundGradientBottom: '#ffffff',
  backgroundLight: '#FAF8F3',
  backgroundMedium: '#F5F1E8',
  backgroundDark: '#E8E1D3',
  
  // Text Colors
  textPrimary: '#0A0A0A',
  textSecondary: '#2A2A2A',
  
  // UI Colors
  white: '#ffffff',
  whiteSemiTransparent: 'rgba(255, 255, 255, 0.9)',
  whiteTransparent: 'rgba(255, 255, 255, 0.95)',
} as const;

export type ColorKey = keyof typeof colors;
