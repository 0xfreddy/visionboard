import { Theme, ThemeConfig } from '@/types';

export const themes: Record<Theme, ThemeConfig> = {
  floral: {
    name: 'floral',
    font: 'Instrument Serif',
    fontFamily: 'var(--font-instrument)',
    background: '/backgrounds/floral.png',
    accentColor: '#d4a373',
    textColor: '#2d2d2d',
  },
  dubai: {
    name: 'dubai',
    font: 'Roboto',
    fontFamily: 'var(--font-roboto)',
    background: '/backgrounds/dubai.jpg',
    accentColor: '#c9a227',
    textColor: '#1a1a1a',
  },
  simple: {
    name: 'simple',
    font: 'Inter',
    fontFamily: 'var(--font-inter)',
    background: '#fafafa',
    accentColor: '#171717',
    textColor: '#171717',
  },
};

