'use client';

import { Shuffle } from 'lucide-react';
import { PaperStyleConfig } from '@/types';
import { PAPER_PRESETS, STICKY_NOTE_COLORS } from '@/lib/paperPresets';
import PaperStyleSelector from './PaperStyleSelector';
import PaperColorPicker from './PaperColorPicker';

interface PaperConfiguratorProps {
  config: PaperStyleConfig;
  onConfigChange: (config: Partial<PaperStyleConfig>) => void;
  onShuffle: () => void;
}

export default function PaperConfigurator({
  config,
  onConfigChange,
  onShuffle,
}: PaperConfiguratorProps) {
  const showColorPicker = config.variant === 'sticky';
  const showShuffle = config.variant === 'torn' || config.variant === 'kraft';

  const handleVariantChange = (variant: PaperStyleConfig['variant']) => {
    const preset = PAPER_PRESETS[variant];
    onConfigChange({
      variant,
      tintColor: preset.defaults.tintColor,
      rotation: preset.defaults.rotation,
    });
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-3 mt-2 animate-fade-in"
      style={{ maxWidth: '320px' }}
    >
      <div className="flex flex-col gap-3">
        <PaperStyleSelector
          selectedVariant={config.variant}
          onVariantChange={handleVariantChange}
        />

        <div className="flex items-center gap-3">
          {showColorPicker && (
            <PaperColorPicker
              colors={STICKY_NOTE_COLORS}
              selectedColor={config.tintColor}
              onColorSelect={(color) => onConfigChange({ tintColor: color })}
            />
          )}

          {showShuffle && (
            <button
              onClick={onShuffle}
              aria-label="Shuffle paper pattern"
              className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            >
              <Shuffle size={18} className="text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

