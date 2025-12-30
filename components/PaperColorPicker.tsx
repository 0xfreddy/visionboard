'use client';

interface ColorOption {
  id: string;
  color: string;
  name: string;
}

interface PaperColorPickerProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function PaperColorPicker({
  colors,
  selectedColor,
  onColorSelect,
}: PaperColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((option) => (
        <button
          key={option.id}
          aria-label={option.name}
          onClick={() => onColorSelect(option.color)}
          title={option.name}
          className={`w-7 h-7 rounded-full transition-all duration-150 ${
            selectedColor === option.color
              ? 'ring-2 ring-gray-900 ring-offset-2 scale-110'
              : 'hover:scale-105'
          }`}
          style={{ backgroundColor: option.color }}
        />
      ))}
    </div>
  );
}

