'use client';

import { GifResult } from '@/types';

interface GifSearchResultsProps {
  results: GifResult[];
  isLoading: boolean;
  onSelect: (gif: GifResult) => void;
  onClose: () => void;
}

export default function GifSearchResults({
  results,
  isLoading,
  onSelect,
}: GifSearchResultsProps) {
  return (
    <div
      className="absolute bottom-full mb-2 left-0 bg-white rounded-xl shadow-xl border border-gray-200 p-3 animate-fade-in"
      style={{ width: '400px', maxHeight: '300px', overflow: 'auto' }}
    >
      {isLoading ? (
        <div className="grid grid-cols-4 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No GIFs found</p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {results.map((gif) => (
            <button
              key={gif.id}
              onClick={() => onSelect(gif)}
              className="aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gif.previewUrl}
                alt="GIF"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

