import { StrokeOptions } from 'perfect-freehand';

export type DrawingTool = 'pencil' | 'brush' | 'highlighter' | 'marker' | 'eraser';

// Point with optional pressure
export interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
}

// Single stroke/path
export interface Stroke {
  id: string;
  tool: DrawingTool;
  points: DrawingPoint[];
  color: string;
  size: number;
  opacity: number;
  options: StrokeOptions;
  timestamp: number;
}

// Drawing state
export interface DrawingState {
  strokes: Stroke[];
  currentStroke: Stroke | null;
  undoStack: Stroke[][];
  redoStack: Stroke[][];
}

// Drawing tool state (for toolbar)
export interface DrawingToolState {
  activeTool: DrawingTool;
  activeColor: string;
  activeSize: number;
  isDrawingMode: boolean;
}

