'use client';

import { BoardElement } from '@/types';
import { generateBlobPath, DEFAULT_BLOB_CONFIG } from '@/lib/blobGenerator';
import { splitStickerText, calculateFontSize } from '@/lib/stickerTextSize';

interface StickerElementProps {
  element: BoardElement;
}

export default function StickerElement({ element }: StickerElementProps) {
  if (!element.stickerConfig) return null;

  const { fillColor, borderColor, textColor, seed } = element.stickerConfig;
  const blobPath = generateBlobPath({
    ...DEFAULT_BLOB_CONFIG,
    seed,
    size: Math.min(element.size.width, element.size.height),
  });

  const containerSize = Math.min(element.size.width, element.size.height);
  const lines = splitStickerText(element.content);
  const fontSize = calculateFontSize(element.content, containerSize);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      >
        <defs>
          <filter id={`shadow-${element.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter={`url(#shadow-${element.id})`}>
          {/* Border blob (scaled up 8%) */}
          <path
            d={blobPath}
            fill={borderColor}
            transform="translate(100,100) scale(1.08) translate(-100,-100)"
          />
          {/* Fill blob */}
          <path d={blobPath} fill={fillColor} />
        </g>

        {/* Text */}
        <text
          x="100"
          y={lines.length === 1 ? '105' : '95'}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          fill={textColor}
        >
          {lines[0]}
        </text>
        {lines.length > 1 && (
          <text
            x="100"
            y="115"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="800"
            fontSize={fontSize}
            fill={textColor}
          >
            {lines[1]}
          </text>
        )}
      </svg>
    </div>
  );
}

