'use client';

import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ScreenshotButton() {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleScreenshot = async () => {
    setIsCapturing(true);

    try {
      const { toPng } = await import('html-to-image');
      const canvas = document.getElementById('vision-board-canvas');

      if (!canvas) {
        toast.error('Canvas not found');
        return;
      }

      const dataUrl = await toPng(canvas, {
        quality: 0.95,
        backgroundColor: '#ffffff',
      });

      const blob = await fetch(dataUrl).then((r) => r.blob());

      if (navigator.clipboard && ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        toast.success('Copied to clipboard!');
      } else {
        // Fallback: download the image
        const link = document.createElement('a');
        link.download = 'vision-board.png';
        link.href = dataUrl;
        link.click();
        toast.success('Image downloaded!');
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      toast.error('Failed to capture. Try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <button
      onClick={handleScreenshot}
      disabled={isCapturing}
      className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors disabled:opacity-50 z-50"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {isCapturing ? (
        <Loader2 size={22} className="text-gray-700 animate-spin" />
      ) : (
        <Camera size={22} className="text-gray-700" />
      )}
    </button>
  );
}

