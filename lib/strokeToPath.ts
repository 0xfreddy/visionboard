import { getStroke } from 'perfect-freehand';
import { Stroke, DrawingPoint } from '@/types/drawing';

/**
 * Convert stroke points to SVG path data
 */
export function strokeToSvgPath(stroke: Stroke): string {
  const points = stroke.points.map((p) => [p.x, p.y, p.pressure ?? 0.5]);

  const outlinePoints = getStroke(points, {
    ...stroke.options,
    size: stroke.size,
  });

  return getSvgPathFromStroke(outlinePoints);
}

/**
 * Convert outline points to SVG path string
 * From perfect-freehand documentation
 */
function getSvgPathFromStroke(points: number[][]): string {
  if (!points.length) return '';

  const d = points.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...points[0], 'Q']
  );

  d.push('Z');
  return d.join(' ');
}

/**
 * Check if a point is near a stroke (for eraser)
 */
export function isPointNearStroke(
  point: DrawingPoint,
  stroke: Stroke,
  threshold: number = 10
): boolean {
  return stroke.points.some((p) => {
    const dx = p.x - point.x;
    const dy = p.y - point.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
  });
}

