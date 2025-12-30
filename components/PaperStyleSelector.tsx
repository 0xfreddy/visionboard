'use client';

import { PaperVariant } from '@/types';
import { PAPER_PRESETS } from '@/lib/paperPresets';

interface PaperStyleSelectorProps {
  selectedVariant: PaperVariant;
  onVariantChange: (variant: PaperVariant) => void;
  disabled?: boolean;
}

const variants: PaperVariant[] = ['torn', 'notebook', 'kraft', 'sticky'];

export default function PaperStyleSelector({
  selectedVariant,
  onVariantChange,
  disabled,
}: PaperStyleSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Paper style variant"
      className="flex gap-2"
    >
      {variants.map((variant) => {
        const preset = PAPER_PRESETS[variant];
        return (
          <button
            key={variant}
            role="radio"
            aria-checked={selectedVariant === variant}
            aria-label={preset.name}
            onClick={() => onVariantChange(variant)}
            disabled={disabled}
            title={preset.name}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-150 ${
              selectedVariant === variant
                ? 'ring-2 ring-gray-900 ring-offset-2 bg-gray-100'
                : 'bg-gray-50 hover:bg-gray-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {preset.icon}
          </button>
        );
      })}
    </div>
  );
}

