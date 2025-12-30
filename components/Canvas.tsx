'use client';

import { useRef } from 'react';
import { useBoardStore } from '@/stores/boardStore';
import { themes } from '@/lib/themes';
import BoardElement from './BoardElement';
import DrawingLayer from './DrawingLayer';
import { useDrawing } from '@/hooks/useDrawing';

const MAX_ELEMENTS = 50;

export default function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { elements, activeElementId, setActiveElement, drawing, drawingTool, theme } =
    useBoardStore();
  const currentTheme = themes[theme];

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDrawing({
    canvasRef,
  });

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !drawingTool.isDrawingMode) {
      setActiveElement(null);
    }
  };

  const isEmpty = elements.length === 0 && drawing.strokes.length === 0;
  const isFull = elements.length >= MAX_ELEMENTS;

  return (
    <div
      id="vision-board-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
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
      {/* Default centered text when board is empty */}
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center" style={{ color: currentTheme.textColor, opacity: 0.3 }}>
            <div className="text-8xl font-bold leading-none">2026</div>
            <div className="text-4xl font-light mt-2">vision board</div>
          </div>
        </div>
      )}

      {/* Message when board is full */}
      {isFull && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: currentTheme.accentColor,
              color: theme === 'simple' ? '#fff' : currentTheme.textColor,
            }}
          >
            enough goals for 2026
          </div>
        </div>
      )}

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
