'use client';

import { useRef } from 'react';
import { useBoardStore } from '@/stores/boardStore';
import BoardElement from './BoardElement';
import DrawingLayer from './DrawingLayer';
import { useDrawing } from '@/hooks/useDrawing';

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { elements, activeElementId, setActiveElement, drawing, drawingTool } =
    useBoardStore();

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDrawing({
    canvasRef,
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !drawingTool.isDrawingMode) {
      setActiveElement(null);
    }
  };

  return (
    <div
      id="vision-board-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      onClick={handleCanvasClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        cursor: drawingTool.isDrawingMode ? 'crosshair' : 'default',
        touchAction: drawingTool.isDrawingMode ? 'none' : 'auto',
      }}
    >
      {/* Board elements - dimmed when in drawing mode */}
      <div
        style={{
          opacity: drawingTool.isDrawingMode ? 0.7 : 1,
          pointerEvents: drawingTool.isDrawingMode ? 'none' : 'auto',
        }}
      >
        {elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => (
            <BoardElement
              key={element.id}
              element={element}
              isActive={activeElementId === element.id}
            />
          ))}
      </div>

      {/* Drawing layer - on top of elements */}
      <DrawingLayer
        strokes={drawing.strokes}
        currentStroke={drawing.currentStroke}
        isDrawingMode={drawingTool.isDrawingMode}
      />
    </div>
  );
}
