'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useBoardStore } from '@/stores/boardStore';
import { Theme } from '@/types';
import { themes } from '@/lib/themes';

const themeOptions: { value: Theme; label: string }[] = [
  { value: 'floral', label: 'Floral' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'simple', label: 'Simple' },
];

export default function ThemePalette() {
  const { theme, setTheme } = useBoardStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <Palette size={22} className="text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}
              className={`w-40 h-11 flex items-center px-4 text-left hover:bg-gray-50 transition-colors ${
                theme === option.value ? 'bg-gray-100 font-medium' : ''
              }`}
              style={{ fontFamily: themes[option.value].fontFamily }}
            >
              <span
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: themes[option.value].accentColor }}
              />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

