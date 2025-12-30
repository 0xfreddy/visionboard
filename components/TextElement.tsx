'use client';

interface TextElementProps {
  content: string;
  fontFamily: string;
  textColor: string;
}

export default function TextElement({ content, fontFamily, textColor }: TextElementProps) {
  return (
    <div
      className="w-full h-full p-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg overflow-auto"
      style={{ fontFamily, color: textColor }}
    >
      <p className="text-xl whitespace-pre-wrap break-words m-0">{content}</p>
    </div>
  );
}

