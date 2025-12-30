export type ElementType = 'image' | 'gif' | 'text';

export type Theme = 'floral' | 'dubai' | 'simple';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoardElement {
  id: string;
  type: ElementType;
  content: string;
  position: Position;
  size: Size;
  zIndex: number;
  createdAt: number;
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

  addElement: (element: Omit<BoardElement, 'id' | 'zIndex' | 'createdAt'>) => boolean;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  removeElement: (id: string) => void;
  bringToFront: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setSelectedTool: (tool: ElementType | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setActiveElement: (id: string | null) => void;
  canAddElement: () => boolean;
}

