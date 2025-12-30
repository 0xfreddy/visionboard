import { PaperVariant, PaperStyleConfig } from '@/types';

export interface PaperPreset {
  variant: PaperVariant;
  name: string;
  description: string;
  icon: string;
  defaults: Partial<PaperStyleConfig>;
  cssStyles: React.CSSProperties;
}

export const PAPER_PRESETS: Record<PaperVariant, PaperPreset> = {
  torn: {
    variant: 'torn',
    name: 'Torn Paper',
    description: 'Rough ripped edges with texture',
    icon: '📄',
    defaults: {
      tintColor: '#FFFFFF',
      rotation: 0,
    },
    cssStyles: {
      backgroundColor: '#FFFFFF',
      boxShadow: '3px 3px 8px rgba(0,0,0,0.2)',
    },
  },

  notebook: {
    variant: 'notebook',
    name: 'Notebook',
    description: 'Lined journal paper',
    icon: '📓',
    defaults: {
      tintColor: '#FFFEF9',
      rotation: 0,
    },
    cssStyles: {
      backgroundColor: '#FFFEF9',
      boxShadow: '2px 2px 6px rgba(0,0,0,0.15)',
      borderRadius: '2px',
    },
  },

  kraft: {
    variant: 'kraft',
    name: 'Kraft Paper',
    description: 'Brown craft paper texture',
    icon: '📦',
    defaults: {
      tintColor: '#C4A77D',
      rotation: 0,
    },
    cssStyles: {
      backgroundColor: '#C4A77D',
      boxShadow: '3px 3px 8px rgba(0,0,0,0.25)',
    },
  },

  sticky: {
    variant: 'sticky',
    name: 'Sticky Note',
    description: 'Post-it note style',
    icon: '📝',
    defaults: {
      tintColor: '#FFEB3B',
      rotation: 2,
    },
    cssStyles: {
      backgroundColor: '#FFEB3B',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.1), 4px 12px 16px -8px rgba(0,0,0,0.2)',
      borderRadius: '2px',
    },
  },
};

export const STICKY_NOTE_COLORS = [
  { id: 'yellow', color: '#FFEB3B', name: 'Yellow' },
  { id: 'pink', color: '#F8BBD9', name: 'Pink' },
  { id: 'blue', color: '#BBDEFB', name: 'Blue' },
  { id: 'green', color: '#C8E6C9', name: 'Green' },
  { id: 'orange', color: '#FFCC80', name: 'Orange' },
  { id: 'purple', color: '#E1BEE7', name: 'Purple' },
];

export const DEFAULT_PAPER_CONFIG: PaperStyleConfig = {
  variant: 'torn',
  seed: Math.random(),
  tintColor: '#FFFFFF',
  rotation: 0,
};

export function getDefaultPaperConfig(): PaperStyleConfig {
  return {
    ...DEFAULT_PAPER_CONFIG,
    seed: Math.random(),
  };
}

