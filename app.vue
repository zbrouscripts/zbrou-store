<template>
    <Head>
        <link rel="icon" type="image/png" :href="zbrouBrandImage" />
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
import { zbrouBrandImage } from "~/utils/brandImages";
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
    if (route.query.success !== "true") return;
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
    await router.replace(redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/");
    try {
        await authStore.loginCompleted();
        toastStore.addToast("Has iniciado sesión correctamente.", { type: "success" });
    } catch {
        toastStore.addToast("No se ha podido completar el acceso. Vuelve a intentarlo.", { type: "error" });
    }
});
</script>
