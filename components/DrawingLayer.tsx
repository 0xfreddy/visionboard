'use client';

import React, { useMemo } from 'react';
import { Stroke } from '@/types/drawing';
import { strokeToSvgPath } from '@/lib/strokeToPath';

interface DrawingLayerProps {
  strokes: Stroke[];
  currentStroke: Stroke | null;
  isDrawingMode: boolean;
}

const MemoizedStroke = React.memo(function MemoizedStroke({ stroke }: { stroke: Stroke }) {
  const pathData = useMemo(() => strokeToSvgPath(stroke), [stroke]);

  return (
    <path
      d={pathData}
      fill={stroke.color}
      opacity={stroke.opacity}
    />
  );
});

export default function DrawingLayer({
  strokes,
  currentStroke,
  isDrawingMode,
}: DrawingLayerProps) {
  const currentPathData = useMemo(() => {
    if (!currentStroke || currentStroke.points.length < 2) return null;
    return strokeToSvgPath(currentStroke);
  }, [currentStroke]);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 100,
        pointerEvents: isDrawingMode ? 'auto' : 'none',
      }}
    >
      {/* Completed strokes */}
      {strokes.map((stroke) => (
        <MemoizedStroke key={stroke.id} stroke={stroke} />
      ))}

      {/* Current stroke in progress */}
      {currentStroke && currentPathData && (
        <path
          d={currentPathData}
          fill={currentStroke.color}
          opacity={currentStroke.opacity}
        />
      )}
    </svg>
  );
}

