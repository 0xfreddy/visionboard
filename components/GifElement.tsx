'use client';

interface GifElementProps {
  src: string;
}

export default function GifElement({ src }: GifElementProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="GIF"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

