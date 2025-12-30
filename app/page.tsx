'use client';

import { useBoardStore } from '@/stores/boardStore';
import { themes } from '@/lib/themes';
import Canvas from '@/components/Canvas';
import Dock from '@/components/Dock';
import ThemePalette from '@/components/ThemePalette';
import ScreenshotButton from '@/components/ScreenshotButton';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function Home() {
  const { theme, isGenerating } = useBoardStore();
  const currentTheme = themes[theme];

  return (
    <main
      className="relative h-screen w-screen overflow-hidden theme-transition"
      style={{
        fontFamily: currentTheme.fontFamily,
        background: currentTheme.background.startsWith('/')
          ? `url(${currentTheme.background}) center/cover no-repeat`
          : currentTheme.background,
      }}
    >
      <Canvas />
      <Dock />
      <ThemePalette />
      <ScreenshotButton />
      {isGenerating && <LoadingOverlay />}
    </main>
  );
}

