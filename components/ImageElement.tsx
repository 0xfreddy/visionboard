'use client';

interface ImageElementProps {
  src: string;
}

export default function ImageElement({ src }: ImageElementProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Generated image"
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
    </div>
  );
}

