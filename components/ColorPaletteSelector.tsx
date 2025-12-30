'use client';

import { ColorPalette } from '@/types';

interface ColorPaletteSelectorProps {
  palettes: ColorPalette[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ColorPaletteSelector({
  palettes,
  selectedIndex,
  onSelect,
}: ColorPaletteSelectorProps) {
  return (
    <div
      role="listbox"
      aria-label="Color palette"
      className="flex gap-2 overflow-x-auto pb-2"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {palettes.map((palette, index) => (
        <button
          key={palette.id}
          role="option"
          aria-selected={index === selectedIndex}
          aria-label={palette.name}
          onClick={() => onSelect(index)}
          className={`flex-shrink-0 w-8 h-8 rounded-full transition-all duration-150 ${
            index === selectedIndex
              ? 'ring-2 ring-white ring-offset-2 scale-110'
              : 'hover:scale-105'
          }`}
          style={{
            background: `radial-gradient(circle, ${palette.fill} 60%, ${palette.border} 60%)`,
            boxShadow: index === selectedIndex ? `0 0 0 2px ${palette.border}` : 'none',
          }}
        />
      ))}
    </div>
  );
}

