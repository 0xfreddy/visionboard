'use client';

import { Image, Film, Type, Pencil, Sticker } from 'lucide-react';
import { useBoardStore } from '@/stores/boardStore';
import { ToolType } from '@/types';
import DockToolButton from './DockToolButton';
import InputBar from './InputBar';

export default function Dock() {
  const { selectedTool, setSelectedTool, isGenerating, drawingTool } = useBoardStore();

  const handleToolSelect = (tool: ToolType) => {
    if (selectedTool === tool) {
      setSelectedTool(null);
    } else {
      setSelectedTool(tool);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-3 z-50">
      {/* Input Bar - appears to the left when tool is selected */}
      <InputBar />

      {/* Tool Buttons */}
      <div
        className="flex items-center gap-2 p-3 rounded-2xl shadow-lg"
        style={{
          background: 'var(--dock-bg)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--dock-shadow)',
        }}
      >
        <DockToolButton
          icon={Image}
          isSelected={selectedTool === 'image'}
          isDisabled={isGenerating || drawingTool.isDrawingMode}
          onClick={() => handleToolSelect('image')}
          tooltip="Add AI Image"
        />
        <DockToolButton
          icon={Film}
          isSelected={selectedTool === 'gif'}
          isDisabled={isGenerating || drawingTool.isDrawingMode}
          onClick={() => handleToolSelect('gif')}
          tooltip="Add GIF"
        />
        <DockToolButton
          icon={Type}
          isSelected={selectedTool === 'text'}
          isDisabled={isGenerating || drawingTool.isDrawingMode}
          onClick={() => handleToolSelect('text')}
          tooltip="Add Text"
        />
        <DockToolButton
          icon={Pencil}
          isSelected={selectedTool === 'draw'}
          isDisabled={isGenerating}
          onClick={() => handleToolSelect('draw')}
          tooltip="Draw"
        />
        <DockToolButton
          icon={Sticker}
          isSelected={selectedTool === 'sticker'}
          isDisabled={isGenerating || drawingTool.isDrawingMode}
          onClick={() => handleToolSelect('sticker')}
          tooltip="Add Sticker"
        />
      </div>
    </div>
  );
}

