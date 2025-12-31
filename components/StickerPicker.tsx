'use client';

import Image from 'next/image';
import { useBoardStore } from '@/stores/boardStore';

const STICKERS = [
  { id: 'flower1', path: '/stickers/flower1.png', name: 'Pink Peony' },
  { id: 'flower2', path: '/stickers/flower2.png', name: 'Red Poppy' },
];

export default function StickerPicker() {
  const { addElement, canAddElement } = useBoardStore();

  const getRandomPosition = () => {
    const padding = 100;
    const maxX = window.innerWidth - 256 - padding;
    const maxY = window.innerHeight - 256 - padding;
    return {
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY),
    };
  };

  const handleStickerSelect = (sticker: typeof STICKERS[0]) => {
    if (!canAddElement()) {
      return;
    }

    addElement({
      type: 'image',
      content: sticker.path,
      position: getRandomPosition(),
      size: { width: 256, height: 256 },
    });
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white shadow-lg border border-gray-200 animate-slide-in">
      <div className="text-sm font-medium text-gray-700 mb-1">Choose a sticker</div>
      <div className="grid grid-cols-2 gap-3">
        {STICKERS.map((sticker) => (
          <button
            key={sticker.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleStickerSelect(sticker);
            }}
            className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-colors bg-gray-50 group"
          >
            <div className="absolute inset-0 p-2">
              <Image
                src={sticker.path}
                alt={sticker.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

