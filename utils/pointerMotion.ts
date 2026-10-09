type PointerRuntime = {
    requestFrame: (callback: FrameRequestCallback) => number;
    cancelFrame: (id: number) => void;
    scroll: () => { x: number; y: number };
};

/** A short, refresh-independent ease for the card tilt; reflections stay direct. */
export function followPointer(current: number, target: number, seconds: number) {
    return current + (target - current) * (1 - Math.exp(-Math.max(0, seconds) / 0.035));
}

/** Keep pointer work outside Vue and move an already painted reflection layer. */
export function createProductMotion(enabled: () => boolean, runtime: PointerRuntime = {
    requestFrame: callback => requestAnimationFrame(callback),
    cancelFrame: id => cancelAnimationFrame(id),
    scroll: () => ({ x: window.scrollX, y: window.scrollY }),
}) {
    let frame = 0;
    let lastTime: number | null = null;
    let pointer: { node: HTMLElement; x: number; y: number } | null = null;
    let active: {
        node: HTMLElement;
        shine: HTMLElement | null;
        left: number; top: number; width: number; height: number;
        tiltX: number; tiltY: number;
    } | null = null;

    function release() {
        if (!active) return;
        // Restore the CSS transition only for the gentle return to rest.
        active.node.classList.remove('zb-product--tracking');
        active.node.style.removeProperty('transform');
        active.shine?.style.removeProperty('transform');
        active = null;
        lastTime = null;
    }

    function reset() {
        runtime.cancelFrame(frame);
        frame = 0;
        pointer = null;
        release();
    }

    function update(timestamp: number) {
        frame = 0;
        if (!enabled() || !pointer) { reset(); return; }
        const { node, x, y } = pointer;
        const scroll = runtime.scroll();
        if (active?.node !== node) {
            release();
            // Cache page coordinates before applying tilt. Scroll changes the
            // viewport origin, so following it needs no new layout reads.
            const box = node.getBoundingClientRect();
            active = { node, shine: node.querySelector<HTMLElement>('.zb-product__shine'),
                left: box.left + scroll.x, top: box.top + scroll.y,
                width: Math.max(1, box.width), height: Math.max(1, box.height), tiltX: 0, tiltY: 0 };
            node.classList.add('zb-product--tracking');
        }
        const localX = x + scroll.x - active.left;
        const localY = y + scroll.y - active.top;
        const tiltX = (Math.max(0, Math.min(1, localY / active.height)) - .5) * -4;
        const tiltY = (Math.max(0, Math.min(1, localX / active.width)) - .5) * 5;
        const seconds = lastTime === null ? 1 / 60 : Math.min(.05, Math.max(0, (timestamp - lastTime) / 1000));
        lastTime = timestamp;
        active.tiltX = followPointer(active.tiltX, tiltX, seconds);
        active.tiltY = followPointer(active.tiltY, tiltY, seconds);
        const settling = Math.abs(active.tiltX - tiltX) > .01 || Math.abs(active.tiltY - tiltY) > .01;
        if (!settling) { active.tiltX = tiltX; active.tiltY = tiltY; }
        // Ease the small rotation only, with no restartable CSS transition.
        // The reflection still uses the latest pointer position immediately.
        node.style.transform = `perspective(850px) rotateX(${active.tiltX}deg) rotateY(${active.tiltY}deg)`;
        if (active.shine) {
            const reflection = `translate3d(${localX - 250}px,${localY - 250}px,0)`;
            if (active.shine.style.transform !== reflection) active.shine.style.transform = reflection;
        }
        if (settling) frame = runtime.requestFrame(update);
        else lastTime = null;
    }

    function move(event: PointerEvent) {
        if (!enabled() || event.pointerType === 'touch') return;
        pointer = { node: event.currentTarget as HTMLElement, x: event.clientX, y: event.clientY };
        if (!frame) frame = runtime.requestFrame(update);
    }

    return { move, reset };
}
