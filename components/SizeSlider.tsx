'use client';

interface SizeSliderProps {
  value: number;
  min: number;
  max: number;
  color: string;
  onChange: (value: number) => void;
}

export default function SizeSlider({
  value,
  min,
  max,
  color,
  onChange,
}: SizeSliderProps) {
  // Scale the preview dot size (max 24px)
  const previewSize = Math.min(24, Math.max(4, value));

  return (
    <div className="flex items-center gap-3" onPointerDown={(e) => e.stopPropagation()}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerDown={(e) => e.stopPropagation()}
        className="w-24 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div className="w-8 h-8 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: previewSize,
            height: previewSize,
            backgroundColor: color === 'transparent' ? '#6B7280' : color,
          }}
        />
      </div>
    </div>
  );
}

