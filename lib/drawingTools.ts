import { StrokeOptions } from 'perfect-freehand';
import { DrawingTool } from '@/types/drawing';

export interface ToolConfig {
  name: string;
  icon: string;
  options: StrokeOptions;
  opacity: number;
  defaultColor: string;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  cursor: string;
}

export const TOOL_CONFIGS: Record<DrawingTool, ToolConfig> = {
  pencil: {
    name: 'Pencil',
    icon: 'Pencil',
    options: {
      size: 3,
      thinning: 0.6,
      smoothing: 0.5,
      streamline: 0.5,
      easing: (t) => t,
      start: {
        taper: 0,
        cap: true,
      },
      end: {
        taper: 0,
        cap: true,
      },
      simulatePressure: true,
    },
    opacity: 1,
    defaultColor: '#000000',
    defaultSize: 3,
    minSize: 1,
    maxSize: 8,
    cursor: 'crosshair',
  },

  brush: {
    name: 'Brush',
    icon: 'Brush',
    options: {
      size: 16,
      thinning: 0.5,
      smoothing: 0.8,
      streamline: 0.7,
      easing: (t) => Math.sin((t * Math.PI) / 2),
      start: {
        taper: 40,
        cap: true,
      },
      end: {
        taper: 40,
        cap: true,
      },
      simulatePressure: true,
    },
    opacity: 1,
    defaultColor: '#000000',
    defaultSize: 16,
    minSize: 8,
    maxSize: 48,
    cursor: 'crosshair',
  },

  highlighter: {
    name: 'Highlighter',
    icon: 'Highlighter',
    options: {
      size: 24,
      thinning: 0,
      smoothing: 0.5,
      streamline: 0.5,
      easing: (t) => t,
      start: {
        taper: 0,
        cap: false,
      },
      end: {
        taper: 0,
        cap: false,
      },
      simulatePressure: false,
    },
    opacity: 0.4,
    defaultColor: '#FFEB3B',
    defaultSize: 24,
    minSize: 16,
    maxSize: 48,
    cursor: 'crosshair',
  },

  marker: {
    name: 'Marker',
    icon: 'PenTool',
    options: {
      size: 8,
      thinning: 0.2,
      smoothing: 0.5,
      streamline: 0.5,
      easing: (t) => t,
      start: {
        taper: 0,
        cap: true,
      },
      end: {
        taper: 0,
        cap: true,
      },
      simulatePressure: false,
    },
    opacity: 1,
    defaultColor: '#000000',
    defaultSize: 8,
    minSize: 4,
    maxSize: 16,
    cursor: 'crosshair',
  },

  eraser: {
    name: 'Eraser',
    icon: 'Eraser',
    options: {
      size: 16,
      thinning: 0,
      smoothing: 0.5,
      streamline: 0.5,
      simulatePressure: false,
    },
    opacity: 1,
    defaultColor: 'transparent',
    defaultSize: 16,
    minSize: 8,
    maxSize: 48,
    cursor: 'crosshair',
  },
};

