'use client';

import { TextStyle } from '@/types';

interface TextStyleToggleProps {
  value: TextStyle;
  onChange: (style: TextStyle) => void;
  disabled?: boolean;
}

export default function TextStyleToggle({ value, onChange, disabled }: TextStyleToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Text style"
      className="flex gap-1 p-1 bg-gray-100 rounded-lg"
      style={{ height: '36px' }}
    >
      <button
        role="radio"
        aria-checked={value === 'plain'}
        onClick={() => onChange('plain')}
        disabled={disabled}
        className={`flex-1 rounded-md text-sm font-medium transition-all duration-150 ${
          value === 'plain'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Plain
      </button>
      <button
        role="radio"
        aria-checked={value === 'sticker'}
        onClick={() => onChange('sticker')}
        disabled={disabled}
        className={`flex-1 rounded-md text-sm font-medium transition-all duration-150 ${
          value === 'sticker'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        🎨 Sticker
      </button>
    </div>
  );
}

