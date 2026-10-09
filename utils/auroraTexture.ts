export const AURORA_BLUR = 85;
export const AURORA_PADDING = AURORA_BLUR * 3;
export const AURORA_RESOLUTION = 0.5;

const rendered = new WeakMap<HTMLCanvasElement, string>();

/** Rasterize the original CSS ellipse and its blur once, rather than filtering an animated layer. */
export function renderAuroraTexture(canvas: HTMLCanvasElement, width: number, height: number, color: string): boolean {
    const key = `${width}:${height}:${color}`;
    if (rendered.get(canvas) === key) return true;
    const context = canvas.getContext('2d');
    if (!context || !('filter' in context)) return false;

    const resolution = AURORA_RESOLUTION, padding = AURORA_PADDING;
    const source = document.createElement('canvas');
    source.width = Math.ceil((width + padding * 2) * resolution);
    source.height = Math.ceil((height + padding * 2) * resolution);
    const paint = source.getContext('2d');
    if (!paint) return false;

    // CSS's centered farthest-corner ellipse has radii width/sqrt(2), height/sqrt(2).
    paint.setTransform(resolution, 0, 0, resolution, 0, 0);
    paint.translate(padding + width / 2, padding + height / 2);
    paint.scale(width / Math.SQRT2, height / Math.SQRT2);
    const gradient = paint.createRadialGradient(0, 0, 0, 0, 0, 1);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.68, 'transparent');
    paint.fillStyle = gradient;
    paint.fillRect(-1, -1, 2, 2);

    canvas.width = source.width; canvas.height = source.height;
    context.filter = `blur(${AURORA_BLUR * resolution}px)`;
    // Unsupported filters keep the existing CSS fallback instead of changing the artwork.
    if (context.filter === 'none') return false;
    context.drawImage(source, 0, 0);
    context.filter = 'none';
    rendered.set(canvas, key);
    return true;
}
