'use client';

import { useCallback, useRef } from 'react';
import { useBoardStore } from '@/stores/boardStore';
import { DrawingPoint } from '@/types/drawing';
import { isPointNearStroke } from '@/lib/strokeToPath';

interface UseDrawingOptions {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export function useDrawing({ canvasRef }: UseDrawingOptions) {
  const isDrawing = useRef(false);

  const {
    drawing,
    drawingTool,
    startStroke,
    addPointToStroke,
    finishStroke,
    eraseStroke,
  } = useBoardStore();

  const getPointerPosition = useCallback(
    (e: React.PointerEvent): DrawingPoint => {
      if (!canvasRef.current) return { x: 0, y: 0 };

      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure || 0.5,
      };
    },
    [canvasRef]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!drawingTool.isDrawingMode) return;

      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      isDrawing.current = true;
      const point = getPointerPosition(e);

      if (drawingTool.activeTool === 'eraser') {
        // Check if clicking on any stroke
        const strokeToErase = drawing.strokes.find((stroke) =>
          isPointNearStroke(point, stroke, drawingTool.activeSize / 2)
        );
        if (strokeToErase) {
          eraseStroke(strokeToErase.id);
        }
      } else {
        startStroke(point);
      }
    },
    [
      drawingTool.isDrawingMode,
      drawingTool.activeTool,
      drawingTool.activeSize,
      drawing.strokes,
      getPointerPosition,
      startStroke,
      eraseStroke,
    ]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDrawing.current || !drawingTool.isDrawingMode) return;
      if (drawingTool.activeTool === 'eraser') {
        // Check for strokes while moving eraser
        const point = getPointerPosition(e);
        const strokeToErase = drawing.strokes.find((stroke) =>
          isPointNearStroke(point, stroke, drawingTool.activeSize / 2)
        );
        if (strokeToErase) {
          eraseStroke(strokeToErase.id);
        }
        return;
      }

      const point = getPointerPosition(e);
      addPointToStroke(point);
    },
    [
      drawingTool.isDrawingMode,
      drawingTool.activeTool,
      drawingTool.activeSize,
      drawing.strokes,
      getPointerPosition,
      addPointToStroke,
      eraseStroke,
    ]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDrawing.current) return;

      isDrawing.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);

      if (drawingTool.activeTool !== 'eraser') {
        finishStroke();
      }
    },
    [drawingTool.activeTool, finishStroke]
  );

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

