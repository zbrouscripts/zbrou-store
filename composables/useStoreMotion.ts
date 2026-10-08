// One preference controls the canvas, scroll effects and CSS animation across every page.
export const useStoreMotion = () => {
    const enabled = useState<boolean>("zbrou-motion-enabled", () => false);
    function toggle() {
        enabled.value = !enabled.value;
        try { localStorage.setItem("zbrou-motion", String(enabled.value)); } catch {}
    }
    return { enabled, toggle };
};
