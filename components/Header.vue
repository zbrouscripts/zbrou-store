<template>
  <header class="zb-header">
    <div class="zb-header__inner zb-shell">
      <NuxtLink class="zb-brand" to="/" aria-label="ZBrou Scripts — Inicio" @click="menuOpen = false">
        <img :src="zbrouBrandImage" width="44" height="44" alt="" /><span>ZBROU<small>SCRIPTS</small></span>
      </NuxtLink>
      <nav id="store-nav" class="zb-nav" :class="{ 'zb-nav--open': menuOpen }" aria-label="Navegación principal">
        <a href="/#inicio" @click="menuOpen = false">Inicio</a>
        <a href="/#scripts" @click="menuOpen = false">Scripts</a>
        <a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer" @click="menuOpen = false">Documentación <StoreGlyph name="external" :size="13" /></a>
        <NuxtLink class="zb-nav__mobile-login" :to="authStore.loginRoute" @click="menuOpen = false"><StoreGlyph name="fivem" :size="17" />{{ authStore.isAuthenticated ? 'Mi cuenta' : 'Entrar con FiveM' }}</NuxtLink>
      </nav>
      <div class="zb-header__actions">
        <a class="zb-icon-btn zb-discord-link" :href="discordUrl || '/#comunidad'" :target="discordUrl ? '_blank' : undefined" rel="noopener noreferrer" aria-label="Comunidad de ZBrou en Discord"><StoreGlyph name="discord" :size="20" /></a>
        <button type="button" class="zb-icon-btn zb-cart-btn" @click="uiStore.toggleItem('cart-sidebar')" aria-label="Abrir cesta"><StoreGlyph name="cart" :size="21" /><small v-if="basketStore.basket?.packages?.length">{{ basketStore.basket.packages.length }}</small></button>
        <NuxtLink class="zb-btn zb-btn--login" :to="authStore.loginRoute"><StoreGlyph name="fivem" :size="19" /><span>{{ authStore.isAuthenticated ? 'Mi cuenta' : 'Entrar con FiveM' }}</span></NuxtLink>
        <button class="zb-icon-btn zb-menu-btn" type="button" :aria-expanded="menuOpen" aria-controls="store-nav" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="menuOpen = !menuOpen"><span></span><span></span></button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { zbrouBrandImage } from "~/utils/brandImages";
const authStore = useAuthStore(), basketStore = useBasketStore(), uiStore = useUIStore();
const menuOpen = ref(false);
const discordUrl = computed(() => String(useRuntimeConfig().public.discordUrl || useAppConfig().discordUrl || ""));
const route = useRoute();
watch(() => route.fullPath, () => { menuOpen.value = false; });
</script>
