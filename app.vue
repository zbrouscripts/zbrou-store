<template>
    <Head>
        <link rel="icon" type="image/png" sizes="64x64" :href="zbrouFaviconImage" />
    </Head>

    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
        <Toast />
    </ClientOnly>
</template>

<script lang="ts" setup>
import { zbrouFaviconImage } from "~/utils/brandImages";
import { getAuthRedirect, isLoginCallback } from "~/utils/authCallback";
import "~/assets/styles/main.scss";
import "~/assets/styles/brand-fonts.css";
import "~/assets/styles/storefront.css";

const appConfig = useAppConfig();
const { enabled: motionEnabled } = useStoreMotion();
let motionMedia: MediaQueryList;
function syncMotion() {
    let preference: string | null = null;
    try { preference = localStorage.getItem("zbrou-motion"); } catch {}
    motionEnabled.value = preference === "true" || (preference !== "false" && !motionMedia.matches);
}
onMounted(() => {
    motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    syncMotion();
    motionMedia.addEventListener("change", syncMotion);
});
onUnmounted(() => motionMedia?.removeEventListener("change", syncMotion));
useHead(() => ({ htmlAttrs: { "data-zb-motion": motionEnabled.value ? "on" : "off" } }));

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} | ${appConfig.titlePrefix}`
            : appConfig.titlePrefix;
    },
});

const webstoreStore = useWebstoreStore();

const { data: webstore } = await useAsyncData("webstore", () =>
    webstoreStore.fetchWebstore(),
);

const { setNumberFormat, locale } = useI18n();

watchEffect(() => {
    if (!webstore.value) return;

    setNumberFormat(locale.value, {
        currency: {
            style: "currency",
            notation: "standard",
            currency: webstore.value?.currency ?? "USD",
        },
    });
});

const authStore = useAuthStore();
const toastStore = useToastStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    if (!isLoginCallback(route.query)) return;
    const redirect = getAuthRedirect(route.query.redirect);
    try {
        await authStore.loginCompleted();
        await router.replace(redirect);
        toastStore.addToast("Has iniciado sesión correctamente.", { type: "success" });
    } catch {
        toastStore.addToast("No se ha podido confirmar el acceso con Tebex. Recarga para reintentar o vuelve a acceder con FiveM.", { type: "error", timeout: 10000 });
    }
});
</script>
