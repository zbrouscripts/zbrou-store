import { StorageSerializers, useStorage } from "@vueuse/core";
import { skipHydrate } from "pinia";
import type { BasketAuthMethod, Auth } from "~/types";
import { getAuthRedirect } from "~/utils/authCallback";

export const useAuthStore = defineStore("auth", () => {
    const appConfig = useAppConfig();
    const AUTH_STORAGE_KEY = `@${titleCase(appConfig.storeName)}/auth`;

    const basketStore = useBasketStore();

    const auth = useStorage<Auth>(AUTH_STORAGE_KEY, null, undefined, {
        serializer: StorageSerializers.object,
    });

    const isAuthenticated = computed(() => {
        return !!auth.value?.username;
    });

    async function login(user: string) {
        // Create a basket for the user
        try {
            const basket = await basketStore.createBasket(user);
            auth.value = {
                username: user,
                userId: basket.username_id,
            };
        } catch (error) {
            throw new Error("Failed to login!");
        }
    }

    async function loginRedirect(method: BasketAuthMethod) {
        auth.value = {
            ...auth.value,
            method,
        };

        try {
            // Allow the storage/cookie watchers to persist the current basket
            // before leaving the site for the external identity provider.
            await nextTick();
            window.location.replace(method.url);
        } catch (error) {
            auth.value.method = undefined;
            throw new Error("Failed to redirect");
        }
    }

    async function getAuthMethods(
        redirectAfter?: string,
    ): Promise<BasketAuthMethod[]> {
        if (!basketStore.basket || basketStore.basket.complete) {
            await basketStore.createBasket();
        }

        basketStore.basketId = basketStore.basket.ident;

        const returnUrl = new URL("/", window.location.origin);
        // `success` belongs to Tebex and can be appended again by its callback.
        // Our separate marker survives regardless of the provider's flag format.
        returnUrl.searchParams.set("auth_callback", "1");
        const redirect = getAuthRedirect(redirectAfter);
        if (redirect !== "/") {
            returnUrl.searchParams.set("redirect", redirect);
        }
        return await getBasketAuthMethods(
            basketStore.basket.ident,
            returnUrl.toString(),
        );
    }

    async function loginCompleted() {
        const basket = await basketStore.getBasket();

        if (!basket?.value?.username || !basket.value.username_id) {
            throw new Error("Failed to login!");
        }

        // Update the user info
        auth.value = {
            ...auth.value,
            username: basket?.value.username,
            userId: basket?.value.username_id,
        };
    }

    function logout() {
        auth.value = null;
        basketStore.destroyBasket();
    }

    const webstoreStore = useWebstoreStore();

    const loginRoute = computed(() => {
        return webstoreStore.webstore?.platform_type.includes("Minecraft")
            ? "/login"
            : "/login-redirect";
    });

    function getLoginRoute(redirectAfter?: string) {
        const redirect = getAuthRedirect(redirectAfter);
        return (
            loginRoute.value +
            (redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : "")
        );
    }

    return {
        user: skipHydrate(auth),
        isAuthenticated,
        login,
        logout,
        loginRedirect,
        loginCompleted,
        getAuthMethods,
        loginRoute,
        getLoginRoute,
    };
});
