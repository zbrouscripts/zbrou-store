const visibilityAttribute = "data-zb-animation-visible";

/** Pause decorative scene animations only while they are far outside the viewport. */
export function useVisibleAnimations(selector: string) {
    const scenes = new Map<HTMLElement, { nearViewport: boolean; previous: string | null }>();
    let observer: IntersectionObserver | undefined;

    function applyVisibility(node: HTMLElement, nearViewport: boolean) {
        const value = String(nearViewport && !document.hidden);
        if (node.getAttribute(visibilityAttribute) !== value) {
            node.setAttribute(visibilityAttribute, value);
        }
    }

    function syncDocumentVisibility() {
        for (const [node, state] of scenes) applyVisibility(node, state.nearViewport);
    }

    onMounted(() => {
        for (const node of document.querySelectorAll<HTMLElement>(selector)) {
            scenes.set(node, { nearViewport: true, previous: node.getAttribute(visibilityAttribute) });
        }
        syncDocumentVisibility();

        if (typeof IntersectionObserver !== "undefined") {
            observer = new IntersectionObserver(entries => {
                for (const entry of entries) {
                    const node = entry.target as HTMLElement, state = scenes.get(node);
                    if (!state) continue;
                    state.nearViewport = entry.isIntersecting;
                    applyVisibility(node, state.nearViewport);
                }
            }, { rootMargin: "150px", threshold: 0 });
            for (const node of scenes.keys()) observer.observe(node);
        }
        document.addEventListener("visibilitychange", syncDocumentVisibility);
    });

    onUnmounted(() => {
        observer?.disconnect();
        document.removeEventListener("visibilitychange", syncDocumentVisibility);
        for (const [node, state] of scenes) {
            if (state.previous === null) node.removeAttribute(visibilityAttribute);
            else node.setAttribute(visibilityAttribute, state.previous);
        }
        scenes.clear();
    });
}
