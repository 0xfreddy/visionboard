'use client';

import { Pencil, Brush, Highlighter, PenTool, Eraser } from 'lucide-react';
import { DrawingTool } from '@/types/drawing';

interface ToolButtonProps {
  tool: DrawingTool;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const TOOL_ICONS: Record<DrawingTool, React.ElementType> = {
  pencil: Pencil,
  brush: Brush,
  highlighter: Highlighter,
  marker: PenTool,
  eraser: Eraser,
};

export default function ToolButton({
  tool,
  isActive,
  onClick,
  disabled = false,
}: ToolButtonProps) {
  const Icon = TOOL_ICONS[tool];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
        isActive
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={tool.charAt(0).toUpperCase() + tool.slice(1)}
    >
      <Icon size={20} />
    </button>
  );
}

