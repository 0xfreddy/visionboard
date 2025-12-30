'use client';

import { useBoardStore } from '@/stores/boardStore';
import BoardElement from './BoardElement';

export default function Canvas() {
  const { elements, activeElementId, setActiveElement } = useBoardStore();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveElement(null);
    }
  };

  return (
    <div
      id="vision-board-canvas"
      className="absolute inset-0 w-full h-full"
      onClick={handleCanvasClick}
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
  );
}

