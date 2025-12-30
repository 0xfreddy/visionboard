'use client';

import { Rnd } from 'react-rnd';
import { X } from 'lucide-react';
import { useBoardStore } from '@/stores/boardStore';
import { themes } from '@/lib/themes';
import { BoardElement as BoardElementType } from '@/types';
import ImageElement from './ImageElement';
import GifElement from './GifElement';
import TextElement from './TextElement';
import StickerElement from './StickerElement';
import PaperStyledElement from './PaperStyledElement';

interface BoardElementProps {
  element: BoardElementType;
  isActive: boolean;
}

export default function BoardElement({ element, isActive }: BoardElementProps) {
  const { updateElement, removeElement, bringToFront, theme } = useBoardStore();
  const currentTheme = themes[theme];

  const handleDragStop = (_e: unknown, d: { x: number; y: number }) => {
    updateElement(element.id, { position: { x: d.x, y: d.y } });
  };

  const handleResizeStop = (
    _e: unknown,
    _direction: unknown,
    ref: HTMLElement,
    _delta: unknown,
    position: { x: number; y: number }
  ) => {
    updateElement(element.id, {
      size: { width: ref.offsetWidth, height: ref.offsetHeight },
      position: { x: position.x, y: position.y },
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    bringToFront(element.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(element.id);
  };

  const renderContent = () => {
    let content: React.ReactNode = null;

    switch (element.type) {
      case 'image':
        content = <ImageElement src={element.content} />;
        break;
      case 'gif':
        content = <GifElement src={element.content} />;
        break;
      case 'text':
        if (element.elementStyle === 'sticker' || (element.textStyle === 'sticker' && element.stickerConfig)) {
          return <StickerElement element={element} />;
        }
        content = <TextElement content={element.content} fontFamily={currentTheme.fontFamily} textColor={currentTheme.textColor} />;
        break;
      default:
        return null;
    }

    // Wrap with paper style if configured
    if (element.elementStyle === 'paper' && element.paperConfig) {
      return (
        <PaperStyledElement element={element}>
          {content}
        </PaperStyledElement>
      );
    }

    return content;
  };

  return (
    <Rnd
      default={{
        x: element.position.x,
        y: element.position.y,
        width: element.size.width,
        height: element.size.height,
      }}
      position={{ x: element.position.x, y: element.position.y }}
      size={{ width: element.size.width, height: element.size.height }}
      minWidth={element.elementStyle === 'sticker' ? 80 : 50}
      minHeight={element.elementStyle === 'sticker' ? 80 : 50}
      maxWidth={element.elementStyle === 'sticker' ? 400 : 800}
      maxHeight={element.elementStyle === 'sticker' ? 400 : 800}
      bounds="parent"
      lockAspectRatio={element.type !== 'text' || element.elementStyle === 'sticker'}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={handleClick}
      style={{ zIndex: element.zIndex }}
      className={`group ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
    >
      <div className="relative w-full h-full">
        {renderContent()}
        
        {/* Delete button */}
        <button
          onClick={handleDelete}
          className={`absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-opacity ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <X size={14} />
        </button>
      </div>
    </Rnd>
  );
}

