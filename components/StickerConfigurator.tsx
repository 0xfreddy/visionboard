'use client';

import { Shuffle } from 'lucide-react';
import { StickerConfig } from '@/types';
import { STICKER_PALETTES } from '@/lib/stickerPalettes';
import { generateBlobPath, DEFAULT_BLOB_CONFIG } from '@/lib/blobGenerator';
import ColorPaletteSelector from './ColorPaletteSelector';
import StickerPreview from './StickerPreview';

interface StickerConfiguratorProps {
  text: string;
  config: StickerConfig;
  onConfigChange: (config: Partial<StickerConfig>) => void;
  onShuffle: () => void;
}

export default function StickerConfigurator({
  text,
  config,
  onConfigChange,
  onShuffle,
}: StickerConfiguratorProps) {
  const blobPath = generateBlobPath({
    seed: config.seed,
    ...DEFAULT_BLOB_CONFIG,
  });

  const handlePaletteSelect = (index: number) => {
    const palette = STICKER_PALETTES[index];
    onConfigChange({
      paletteIndex: index,
      fillColor: palette.fill,
      borderColor: palette.border,
      textColor: palette.text,
    });
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-3 mt-2 animate-fade-in"
      style={{ maxWidth: '320px' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <ColorPaletteSelector
          palettes={STICKER_PALETTES}
          selectedIndex={config.paletteIndex}
          onSelect={handlePaletteSelect}
        />
        <button
          onClick={onShuffle}
          aria-label="Shuffle sticker shape"
          className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
        >
          <Shuffle size={18} className="text-gray-700" />
        </button>
        {text && (
          <StickerPreview
            text={text}
            blobPath={blobPath}
            fillColor={config.fillColor}
            borderColor={config.borderColor}
            textColor={config.textColor}
          />
        )}
      </div>
    </div>
  );
}

