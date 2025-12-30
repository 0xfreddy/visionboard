'use client';

import { generateBlobPath, DEFAULT_BLOB_CONFIG } from '@/lib/blobGenerator';
import { splitStickerText, calculateFontSize } from '@/lib/stickerTextSize';

interface StickerPreviewProps {
  text: string;
  blobPath: string;
  fillColor: string;
  borderColor: string;
  textColor: string;
  size?: number;
}

export default function StickerPreview({
  text,
  blobPath,
  fillColor,
  borderColor,
  textColor,
  size = 80,
}: StickerPreviewProps) {
  const lines = splitStickerText(text);
  const fontSize = calculateFontSize(text, size);

  return (
    <div className="flex-shrink-0" style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="drop-shadow-md"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      >
        <defs>
          <filter id="preview-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter="url(#preview-shadow)">
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

