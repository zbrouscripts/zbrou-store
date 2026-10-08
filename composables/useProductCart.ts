import type { Package } from "~/types";

export const useProductCart = () => {
    const busyId = useState<number | null>("cart-product-busy", () => null);
    const basketStore = useBasketStore(), uiStore = useUIStore();
    async function addProduct(pkg: Package) {
        if (busyId.value !== null) return;
        if (basketStore.packages.has(pkg.id)) {
            uiStore.toggleItem("cart-sidebar", true);
            return;
        }
        busyId.value = pkg.id;
        try {
            const basket = await basketStore.addPackageToBasket(pkg.id, 1);
            if (basket) uiStore.toggleItem("cart-sidebar", true);
        } finally { busyId.value = null; }
    }
    return { busyId, addProduct };
};
