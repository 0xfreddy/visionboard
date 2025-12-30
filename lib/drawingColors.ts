export interface ColorPreset {
  id: string;
  color: string;
  name: string;
}

export const DRAWING_COLORS: ColorPreset[] = [
  { id: 'black', color: '#000000', name: 'Black' },
  { id: 'gray', color: '#6B7280', name: 'Gray' },
  { id: 'red', color: '#EF4444', name: 'Red' },
  { id: 'orange', color: '#F97316', name: 'Orange' },
  { id: 'yellow', color: '#FFEB3B', name: 'Yellow' },
  { id: 'green', color: '#22C55E', name: 'Green' },
  { id: 'blue', color: '#3B82F6', name: 'Blue' },
  { id: 'purple', color: '#8B5CF6', name: 'Purple' },
  { id: 'pink', color: '#EC4899', name: 'Pink' },
  { id: 'white', color: '#FFFFFF', name: 'White' },
];

export const HIGHLIGHTER_COLORS: ColorPreset[] = [
  { id: 'h-yellow', color: '#FFEB3B', name: 'Yellow' },
  { id: 'h-green', color: '#A7F3D0', name: 'Green' },
  { id: 'h-blue', color: '#93C5FD', name: 'Blue' },
  { id: 'h-pink', color: '#FBCFE8', name: 'Pink' },
  { id: 'h-orange', color: '#FED7AA', name: 'Orange' },
];

