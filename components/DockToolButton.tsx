'use client';

import { LucideIcon } from 'lucide-react';

interface DockToolButtonProps {
  icon: LucideIcon;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  tooltip: string;
}

export default function DockToolButton({
  icon: Icon,
  isSelected,
  isDisabled,
  onClick,
  tooltip,
}: DockToolButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      title={tooltip}
      className={`
        w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-150
        ${isSelected 
          ? 'bg-gray-900 text-white shadow-md' 
          : 'bg-transparent text-gray-700 hover:bg-gray-100'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <Icon size={22} />
    </button>
  );
}

