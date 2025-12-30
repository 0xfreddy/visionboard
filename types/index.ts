export type ElementType = 'image' | 'gif' | 'text';

export type Theme = 'floral' | 'dubai' | 'simple';

export type TextStyle = 'plain' | 'sticker';

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
  selectedTool: ElementType | null;
  isGenerating: boolean;
  activeElementId: string | null;
  stickerConfig: StickerConfig;
  textStyle: TextStyle;

  addElement: (element: Omit<BoardElement, 'id' | 'zIndex' | 'createdAt'>) => boolean;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  removeElement: (id: string) => void;
  bringToFront: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setSelectedTool: (tool: ElementType | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setActiveElement: (id: string | null) => void;
  canAddElement: () => boolean;
  setStickerConfig: (config: Partial<StickerConfig>) => void;
  shuffleStickerShape: () => void;
  resetStickerConfig: () => void;
  setTextStyle: (style: TextStyle) => void;
}

