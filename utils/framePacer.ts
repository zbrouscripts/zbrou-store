// Keep a fixed cadence without discarding the fractional time between refreshes.
// Rendering still advances by real elapsed time, independently of monitor Hz.
export function createFramePacer(fps = 30) {
    const interval = 1000 / fps;
    const tolerance = 0.5;
    let nextFrame: number | null = null;
    let lastDraw: number | null = null;

    return {
        sample(timestamp: number): number | null {
            if (nextFrame === null || lastDraw === null) {
                nextFrame = timestamp + interval;
                lastDraw = timestamp;
                return 0;
            }
            if (timestamp + tolerance < nextFrame) return null;

            const elapsed = Math.max(0, (timestamp - lastDraw) / 1000);
            lastDraw = timestamp;
            // Skip missed deadlines instead of issuing a burst of catch-up draws.
            nextFrame += (Math.floor((timestamp + tolerance - nextFrame) / interval) + 1) * interval;
            return Math.min(elapsed, 0.08);
        },
        reset() {
            nextFrame = null;
            lastDraw = null;
        },
    };
}
