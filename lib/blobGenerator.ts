import * as blobs2 from 'blobs/v2';
import { STICKER_PALETTES, DEFAULT_PALETTE_INDEX } from './stickerPalettes';

export interface BlobConfig {
  seed: number;
  size?: number;
  extraPoints?: number;
  randomness?: number;
}

export const DEFAULT_BLOB_CONFIG = {
  size: 200,
  extraPoints: 6,
  randomness: 4,
};

export function generateBlobPath(config: BlobConfig): string {
  return blobs2.svgPath({
    seed: config.seed,
    extraPoints: config.extraPoints ?? DEFAULT_BLOB_CONFIG.extraPoints,
    randomness: config.randomness ?? DEFAULT_BLOB_CONFIG.randomness,
    size: config.size ?? DEFAULT_BLOB_CONFIG.size,
  });
}

export function generateRandomSeed(): number {
  return Math.random();
}

export function getDefaultStickerConfig() {
  return {
    seed: generateRandomSeed(),
    fillColor: STICKER_PALETTES[DEFAULT_PALETTE_INDEX].fill,
    borderColor: STICKER_PALETTES[DEFAULT_PALETTE_INDEX].border,
    textColor: STICKER_PALETTES[DEFAULT_PALETTE_INDEX].text,
    paletteIndex: DEFAULT_PALETTE_INDEX,
  };
}

