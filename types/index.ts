import { DrawingState, DrawingToolState, DrawingTool, DrawingPoint } from './drawing';

export type ElementType = 'image' | 'gif' | 'text';

export type ToolType = ElementType | 'draw';

export type Theme = 'floral' | 'dubai' | 'simple';

export type { DrawingState, DrawingToolState, DrawingTool, DrawingPoint };

export type TextStyle = 'plain' | 'sticker';

export type PaperVariant = 'torn' | 'notebook' | 'kraft' | 'sticky';

export type ElementStyle = 'none' | 'sticker' | 'paper';

export interface PaperStyleConfig {
  variant: PaperVariant;
  seed: number;
  tintColor: string;
  rotation: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StickerConfig {
  seed: number;
  fillColor: string;
  borderColor: string;
  textColor: string;
  paletteIndex: number;
}

export interface ColorPalette {
  id: string;
  fill: string;
  border: string;
  text: string;
  name: string;
}

export interface BoardElement {
  id: string;
  type: ElementType;
  content: string;
  position: Position;
  size: Size;
  zIndex: number;
  createdAt: number;
  textStyle?: TextStyle;
  stickerConfig?: StickerConfig;
  elementStyle?: ElementStyle;
  paperConfig?: PaperStyleConfig;
}

export interface ThemeConfig {
  name: Theme;
  font: string;
  fontFamily: string;
  background: string;
  accentColor: string;
  textColor: string;
}

export interface GifResult {
  id: string;
  url: string;
  previewUrl: string;
  width: number;
  height: number;
}

export interface BoardState {
  elements: BoardElement[];
  theme: Theme;
  selectedTool: ToolType | null;
  isGenerating: boolean;
  activeElementId: string | null;
  stickerConfig: StickerConfig;
  textStyle: TextStyle;
  paperConfig: PaperStyleConfig;
  elementStyle: ElementStyle;

  // Drawing state
  drawing: DrawingState;
  drawingTool: DrawingToolState;

  addElement: (element: Omit<BoardElement, 'id' | 'zIndex' | 'createdAt'>) => boolean;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  removeElement: (id: string) => void;
  bringToFront: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setSelectedTool: (tool: ToolType | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setActiveElement: (id: string | null) => void;
  canAddElement: () => boolean;
  setStickerConfig: (config: Partial<StickerConfig>) => void;
  shuffleStickerShape: () => void;
  resetStickerConfig: () => void;
  setTextStyle: (style: TextStyle) => void;
  setPaperConfig: (config: Partial<PaperStyleConfig>) => void;
  shufflePaperStyle: () => void;
  resetPaperConfig: () => void;
  setElementStyle: (style: ElementStyle) => void;

  // Drawing actions
  setDrawingMode: (enabled: boolean) => void;
  setActiveTool: (tool: DrawingTool) => void;
  setDrawingColor: (color: string) => void;
  setDrawingSize: (size: number) => void;
  startStroke: (point: DrawingPoint) => void;
  addPointToStroke: (point: DrawingPoint) => void;
  finishStroke: () => void;
  eraseStroke: (strokeId: string) => void;
  undoStroke: () => void;
  redoStroke: () => void;
  clearAllStrokes: () => void;
}

