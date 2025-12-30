'use client';

import { Undo2, Redo2, Trash2, Check } from 'lucide-react';
import { DrawingTool } from '@/types/drawing';
import { DRAWING_COLORS, HIGHLIGHTER_COLORS } from '@/lib/drawingColors';
import { TOOL_CONFIGS } from '@/lib/drawingTools';
import ToolButton from './ToolButton';
import DrawingColorPicker from './DrawingColorPicker';
import SizeSlider from './SizeSlider';

interface DrawingToolbarProps {
  activeTool: DrawingTool;
  activeColor: string;
  activeSize: number;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDone: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const TOOLS: DrawingTool[] = ['pencil', 'brush', 'highlighter', 'marker', 'eraser'];

export default function DrawingToolbar({
  activeTool,
  activeColor,
  activeSize,
  onToolChange,
  onColorChange,
  onSizeChange,
  onUndo,
  onRedo,
  onClear,
  onDone,
  canUndo,
  canRedo,
}: DrawingToolbarProps) {
  const toolConfig = TOOL_CONFIGS[activeTool];
  const colors = activeTool === 'highlighter' ? HIGHLIGHTER_COLORS : DRAWING_COLORS;
  const showColorPicker = activeTool !== 'eraser';

  return (
    <div 
      className="flex flex-col gap-3 p-4 rounded-2xl bg-white shadow-lg border border-gray-200 animate-slide-in"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Tools Row */}
      <div className="flex gap-2">
        {TOOLS.map((tool) => (
          <ToolButton
            key={tool}
            tool={tool}
            isActive={activeTool === tool}
            onClick={() => onToolChange(tool)}
          />
        ))}
      </div>

      {/* Color Picker (hidden for eraser) */}
      {showColorPicker && (
        <DrawingColorPicker
          colors={colors}
          selectedColor={activeColor}
          onColorSelect={onColorChange}
        />
      )}

      {/* Size Slider */}
      <SizeSlider
        value={activeSize}
        min={toolConfig.minSize}
        max={toolConfig.maxSize}
        color={activeColor}
        onChange={onSizeChange}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onUndo(); }}
            disabled={!canUndo}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRedo(); }}
            disabled={!canRedo}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 text-red-600 hover:bg-red-50"
            title="Clear All"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDone(); }}
          className="px-4 h-9 rounded-lg flex items-center gap-1.5 bg-gray-900 text-white hover:bg-gray-800"
        >
          <Check size={16} />
          <span className="text-sm font-medium">Done</span>
        </button>
      </div>
    </div>
  );
}

