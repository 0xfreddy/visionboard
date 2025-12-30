'use client';

import { Check } from 'lucide-react';
import { ColorPreset } from '@/lib/drawingColors';

interface DrawingColorPickerProps {
  colors: ColorPreset[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function DrawingColorPicker({
  colors,
  selectedColor,
  onColorSelect,
}: DrawingColorPickerProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {colors.map((preset) => {
        const isSelected = selectedColor === preset.color;
        const isWhite = preset.color === '#FFFFFF';

        return (
          <button
            type="button"
            key={preset.id}
            onClick={(e) => { e.stopPropagation(); onColorSelect(preset.color); }}
            className={`w-6 h-6 rounded-full relative flex items-center justify-center transition-transform hover:scale-110 ${
              isSelected ? 'ring-2 ring-gray-900 ring-offset-1' : ''
            } ${isWhite ? 'border border-gray-300' : ''}`}
            style={{ backgroundColor: preset.color }}
            title={preset.name}
          >
            {isSelected && (
              <Check
                size={14}
                className={isWhite ? 'text-gray-900' : 'text-white'}
                style={{ filter: isWhite ? 'none' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

