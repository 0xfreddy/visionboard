'use client';

import { ElementType, ElementStyle } from '@/types';

interface ElementStyleToggleProps {
  elementType: ElementType;
  selectedStyle: ElementStyle;
  onStyleChange: (style: ElementStyle) => void;
  disabled?: boolean;
}

export default function ElementStyleToggle({
  elementType,
  selectedStyle,
  onStyleChange,
  disabled,
}: ElementStyleToggleProps) {
  const options: { value: ElementStyle; label: string }[] =
    elementType === 'text'
      ? [
          { value: 'none', label: 'Plain' },
          { value: 'sticker', label: '🎨 Sticker' },
          { value: 'paper', label: '📄 Paper' },
        ]
      : [
          { value: 'none', label: 'None' },
          { value: 'paper', label: '📄 Paper' },
        ];

  return (
    <div
      role="radiogroup"
      aria-label="Element style"
      className="flex gap-1 p-1 bg-gray-100 rounded-lg"
      style={{ height: '36px' }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={selectedStyle === option.value}
          onClick={() => onStyleChange(option.value)}
          disabled={disabled}
          className={`flex-1 rounded-md text-sm font-medium transition-all duration-150 px-2 ${
            selectedStyle === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

