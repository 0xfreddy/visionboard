import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { BoardState, BoardElement } from '@/types';

const MAX_ELEMENTS = 20;

export const useBoardStore = create<BoardState>((set, get) => ({
  elements: [],
  theme: 'simple',
  selectedTool: null,
  isGenerating: false,
  activeElementId: null,

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
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setActiveElement: (id) => set({ activeElementId: id }),
  canAddElement: () => get().elements.length < MAX_ELEMENTS,
}));

