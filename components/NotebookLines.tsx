'use client';

interface NotebookLinesProps {
  lineColor?: string;
  marginColor?: string;
  lineSpacing?: number;
}

export default function NotebookLines({
  lineColor = '#E8E8E8',
  marginColor = '#E84A5F',
  lineSpacing = 28,
}: NotebookLinesProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(90deg, 
            transparent 39px, 
            ${marginColor} 39px, 
            ${marginColor} 41px, 
            transparent 41px
          ),
          linear-gradient(${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `100% 100%, 100% ${lineSpacing}px`,
      }}
    />
  );
}

