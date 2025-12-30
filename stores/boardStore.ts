import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { BoardState, BoardElement, DrawingPoint, DrawingTool } from '@/types';
import { Stroke } from '@/types/drawing';
import { getDefaultStickerConfig } from '@/lib/blobGenerator';
import { getDefaultPaperConfig } from '@/lib/paperPresets';
import { TOOL_CONFIGS } from '@/lib/drawingTools';

const MAX_ELEMENTS = 20;
const MAX_UNDO_STEPS = 50;

const initialDrawingState = {
  strokes: [] as Stroke[],
  currentStroke: null as Stroke | null,
  undoStack: [] as Stroke[][],
  redoStack: [] as Stroke[][],
};

const initialDrawingToolState = {
  activeTool: 'pencil' as DrawingTool,
  activeColor: '#000000',
  activeSize: TOOL_CONFIGS.pencil.defaultSize,
  isDrawingMode: false,
};

export const useBoardStore = create<BoardState>((set, get) => ({
  elements: [],
  theme: 'simple',
  selectedTool: null,
  isGenerating: false,
  activeElementId: null,
  stickerConfig: getDefaultStickerConfig(),
  textStyle: 'plain',
  paperConfig: getDefaultPaperConfig(),
  elementStyle: 'none',

  // Drawing state
  drawing: initialDrawingState,
  drawingTool: initialDrawingToolState,

  addElement: (elementData) => {
    const state = get();
    if (state.elements.length >= MAX_ELEMENTS) {
      return false;
    }

    const maxZIndex = Math.max(0, ...state.elements.map((e) => e.zIndex));
    const newElement: BoardElement = {
      ...elementData,
      id: uuidv4(),
      zIndex: maxZIndex + 1,
      createdAt: Date.now(),
    };

    set({ elements: [...state.elements, newElement] });
    return true;
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  },

  removeElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      activeElementId: state.activeElementId === id ? null : state.activeElementId,
    }));
  },

  bringToFront: (id) => {
    const state = get();
    const maxZIndex = Math.max(0, ...state.elements.map((e) => e.zIndex));
    set({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, zIndex: maxZIndex + 1 } : el
      ),
      activeElementId: id,
    });
  },

  setTheme: (theme) => set({ theme }),
  setSelectedTool: (tool) => {
    if (tool === 'draw') {
      set({ 
        selectedTool: tool,
        drawingTool: { ...get().drawingTool, isDrawingMode: true },
      });
    } else {
      set({ 
        selectedTool: tool,
        drawingTool: { ...get().drawingTool, isDrawingMode: false },
      });
    }
  },
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setActiveElement: (id) => set({ activeElementId: id }),
  canAddElement: () => get().elements.length < MAX_ELEMENTS,
  setStickerConfig: (config) => {
    set((state) => ({
      stickerConfig: { ...state.stickerConfig, ...config },
    }));
  },
  shuffleStickerShape: () => {
    set((state) => ({
      stickerConfig: { ...state.stickerConfig, seed: Math.random() },
    }));
  },
  resetStickerConfig: () => {
    set({ stickerConfig: getDefaultStickerConfig() });
  },
  setTextStyle: (style) => set({ textStyle: style }),
  setPaperConfig: (config) => {
    set((state) => ({
      paperConfig: { ...state.paperConfig, ...config },
    }));
  },
  shufflePaperStyle: () => {
    set((state) => ({
      paperConfig: { ...state.paperConfig, seed: Math.random() },
    }));
  },
  resetPaperConfig: () => {
    set({ paperConfig: getDefaultPaperConfig() });
  },
  setElementStyle: (style) => set({ elementStyle: style }),

  // Drawing mode
  setDrawingMode: (enabled) => {
    set({
      drawingTool: { ...get().drawingTool, isDrawingMode: enabled },
      selectedTool: enabled ? 'draw' : null,
    });
  },

  // Tool selection
  setActiveTool: (tool) => {
    const config = TOOL_CONFIGS[tool];
    set({
      drawingTool: {
        ...get().drawingTool,
        activeTool: tool,
        activeSize: config.defaultSize,
        activeColor: tool === 'highlighter' ? '#FFEB3B' : get().drawingTool.activeColor,
      },
    });
  },

  // Color selection
  setDrawingColor: (color) => {
    set({
      drawingTool: { ...get().drawingTool, activeColor: color },
    });
  },

  // Size selection
  setDrawingSize: (size) => {
    set({
      drawingTool: { ...get().drawingTool, activeSize: size },
    });
  },

  // Start new stroke
  startStroke: (point) => {
    const { drawingTool } = get();
    const config = TOOL_CONFIGS[drawingTool.activeTool];

    const newStroke: Stroke = {
      id: uuidv4(),
      tool: drawingTool.activeTool,
      points: [point],
      color: drawingTool.activeColor,
      size: drawingTool.activeSize,
      opacity: config.opacity,
      options: config.options,
      timestamp: Date.now(),
    };

    set({
      drawing: { ...get().drawing, currentStroke: newStroke },
    });
  },

  // Add point to current stroke
  addPointToStroke: (point) => {
    const { drawing } = get();
    if (!drawing.currentStroke) return;

    set({
      drawing: {
        ...drawing,
        currentStroke: {
          ...drawing.currentStroke,
          points: [...drawing.currentStroke.points, point],
        },
      },
    });
  },

  // Finish stroke and add to strokes array
  finishStroke: () => {
    const { drawing } = get();
    if (!drawing.currentStroke) return;

    // Only add stroke if it has more than 1 point
    if (drawing.currentStroke.points.length < 2) {
      set({ drawing: { ...drawing, currentStroke: null } });
      return;
    }

    const newStrokes = [...drawing.strokes, drawing.currentStroke];
    const newUndoStack = [...drawing.undoStack, drawing.strokes].slice(-MAX_UNDO_STEPS);

    set({
      drawing: {
        strokes: newStrokes,
        currentStroke: null,
        undoStack: newUndoStack,
        redoStack: [],
      },
    });
  },

  // Erase stroke by ID
  eraseStroke: (strokeId) => {
    const { drawing } = get();
    const newStrokes = drawing.strokes.filter((s) => s.id !== strokeId);
    const newUndoStack = [...drawing.undoStack, drawing.strokes].slice(-MAX_UNDO_STEPS);

    set({
      drawing: {
        ...drawing,
        strokes: newStrokes,
        undoStack: newUndoStack,
        redoStack: [],
      },
    });
  },

  // Undo last stroke action
  undoStroke: () => {
    const { drawing } = get();
    if (drawing.undoStack.length === 0) return;

    const previousState = drawing.undoStack[drawing.undoStack.length - 1];
    const newUndoStack = drawing.undoStack.slice(0, -1);
    const newRedoStack = [...drawing.redoStack, drawing.strokes];

    set({
      drawing: {
        ...drawing,
        strokes: previousState,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
      },
    });
  },

  // Redo previously undone action
  redoStroke: () => {
    const { drawing } = get();
    if (drawing.redoStack.length === 0) return;

    const nextState = drawing.redoStack[drawing.redoStack.length - 1];
    const newRedoStack = drawing.redoStack.slice(0, -1);
    const newUndoStack = [...drawing.undoStack, drawing.strokes];

    set({
      drawing: {
        ...drawing,
        strokes: nextState,
        undoStack: newUndoStack,
        redoStack: newRedoStack,
      },
    });
  },

  // Clear all strokes
  clearAllStrokes: () => {
    const { drawing } = get();
    if (drawing.strokes.length === 0) return;

    const newUndoStack = [...drawing.undoStack, drawing.strokes].slice(-MAX_UNDO_STEPS);

    set({
      drawing: {
        ...drawing,
        strokes: [],
        undoStack: newUndoStack,
        redoStack: [],
      },
    });
  },
}));
