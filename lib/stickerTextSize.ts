export function calculateFontSize(text: string, containerSize: number): number {
  const baseSize = containerSize * 0.15;
  const lengthFactor = Math.max(0.5, 1 - (text.length - 4) * 0.08);
  return Math.round(baseSize * lengthFactor);
}

export function splitStickerText(text: string): string[] {
  const words = text.trim().split(/\s+/);
  
  if (text.length <= 10 || words.length === 1) {
    return [text];
  }
  
  const midpoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midpoint).join(' '),
    words.slice(midpoint).join(' '),
  ];
}

