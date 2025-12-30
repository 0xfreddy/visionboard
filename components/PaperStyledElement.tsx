'use client';

import { BoardElement } from '@/types';
import { PAPER_PRESETS } from '@/lib/paperPresets';
import NotebookLines from './NotebookLines';

interface PaperStyledElementProps {
  element: BoardElement;
  children: React.ReactNode;
}

export default function PaperStyledElement({
  element,
  children,
}: PaperStyledElementProps) {
  if (!element.paperConfig) return <>{children}</>;

  const { variant, tintColor, rotation, seed } = element.paperConfig;
  const preset = PAPER_PRESETS[variant];

  // Generate pseudo-random torn edge effect using CSS clip-path
  const getTornEdgeStyle = (): React.CSSProperties => {
    if (variant !== 'torn' && variant !== 'kraft') return {};

    // Use seed to create reproducible but varied torn edges
    const seedNum = seed * 1000;
    const points: string[] = [];
    const steps = 20;

    // Top edge
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 100;
      const y = Math.sin(seedNum + i * 0.5) * 2 + 1;
      points.push(`${x}% ${y}%`);
    }

    // Right edge
    for (let i = 0; i <= steps; i++) {
      const x = 99 + Math.sin(seedNum + i * 0.7) * 1;
      const y = (i / steps) * 100;
      points.push(`${x}% ${y}%`);
    }

    // Bottom edge (reverse)
    for (let i = steps; i >= 0; i--) {
      const x = (i / steps) * 100;
      const y = 99 + Math.sin(seedNum + i * 0.6) * 1;
      points.push(`${x}% ${y}%`);
    }

    // Left edge (reverse)
    for (let i = steps; i >= 0; i--) {
      const x = 1 + Math.sin(seedNum + i * 0.8) * 1;
      const y = (i / steps) * 100;
      points.push(`${x}% ${y}%`);
    }

    return {
      clipPath: `polygon(${points.join(', ')})`,
    };
  };

  const containerStyle: React.CSSProperties = {
    ...preset.cssStyles,
    backgroundColor: tintColor,
    transform: `rotate(${rotation}deg)`,
    ...getTornEdgeStyle(),
  };

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${
        variant === 'notebook' ? 'p-4 pl-12' : 'p-3'
      }`}
      style={containerStyle}
    >
      {variant === 'notebook' && <NotebookLines />}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

