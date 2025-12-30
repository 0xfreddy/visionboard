'use client';

import { useState, useEffect, useCallback } from 'react';
import { Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useBoardStore } from '@/stores/boardStore';
import { GifResult } from '@/types';
import GifSearchResults from './GifSearchResults';

export default function InputBar() {
  const {
    selectedTool,
    isGenerating,
    setIsGenerating,
    addElement,
    canAddElement,
  } = useBoardStore();

  const [inputValue, setInputValue] = useState('');
  const [gifResults, setGifResults] = useState<GifResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced GIF search
  useEffect(() => {
    if (selectedTool !== 'gif' || !inputValue.trim()) {
      setGifResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search-gifs?q=${encodeURIComponent(inputValue)}&limit=12`);
        const data = await res.json();
        if (data.success) {
          setGifResults(data.gifs);
        }
      } catch {
        console.error('Failed to search GIFs');
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, selectedTool]);

  const getRandomPosition = useCallback(() => {
    const padding = 100;
    const maxX = window.innerWidth - 256 - padding;
    const maxY = window.innerHeight - 256 - padding;
    return {
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY),
    };
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim() || !selectedTool) return;

    if (!canAddElement()) {
      toast.error('Maximum 20 elements reached. Remove one to add more.');
      return;
    }

    if (selectedTool === 'image') {
      setIsGenerating(true);
      try {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputValue }),
        });
        const data = await res.json();

        if (data.success && data.imageUrl) {
          addElement({
            type: 'image',
            content: data.imageUrl,
            position: getRandomPosition(),
            size: { width: 256, height: 256 },
          });
          setInputValue('');
          toast.success('Image generated!');
        } else {
          toast.error(data.error || 'Failed to generate image');
        }
      } catch {
        toast.error('Failed to generate image. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    } else if (selectedTool === 'text') {
      addElement({
        type: 'text',
        content: inputValue,
        position: getRandomPosition(),
        size: { width: 300, height: 150 },
      });
      setInputValue('');
      toast.success('Text added!');
    }
  };

  const handleGifSelect = (gif: GifResult) => {
    if (!canAddElement()) {
      toast.error('Maximum 20 elements reached. Remove one to add more.');
      return;
    }

    addElement({
      type: 'gif',
      content: gif.url,
      position: getRandomPosition(),
      size: { width: Math.min(gif.width, 300), height: Math.min(gif.height, 300) },
    });
    setInputValue('');
    setGifResults([]);
    toast.success('GIF added!');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedTool === 'text') {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        handleSubmit();
      }
    } else {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  if (!selectedTool) return null;

  const isTextMode = selectedTool === 'text';
  const placeholder =
    selectedTool === 'image'
      ? 'Describe your image...'
      : selectedTool === 'gif'
      ? 'Search for a GIF...'
      : 'Enter your text...';

  return (
    <div className="relative animate-slide-in">
      {/* GIF Results */}
      {selectedTool === 'gif' && gifResults.length > 0 && (
        <GifSearchResults
          results={gifResults}
          isLoading={isSearching}
          onSelect={handleGifSelect}
          onClose={() => setGifResults([])}
        />
      )}

      {/* Input Container */}
      <div
        className="flex items-end gap-2 p-3 rounded-2xl bg-white shadow-lg border border-gray-200"
        style={{ width: '320px' }}
      >
        {isTextMode ? (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isGenerating}
            maxLength={1000}
            className="flex-1 resize-none border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent"
            style={{ minHeight: '40px', maxHeight: '200px' }}
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isGenerating}
            maxLength={500}
            className="flex-1 border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent h-10"
          />
        )}

        <div className="flex items-center gap-1">
          {inputValue && (
            <button
              onClick={() => setInputValue('')}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          )}
          
          {(selectedTool !== 'gif' || !inputValue) && inputValue && (
            <button
              onClick={handleSubmit}
              disabled={isGenerating || !inputValue.trim()}
              className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

