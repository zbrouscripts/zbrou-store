<template>
  <header class="store-header">
    <div class="store-header__inner">
      <NuxtLink class="store-header__brand" to="/" aria-label="ZBrou Scripts — Inicio" @click="menuOpen = false">
        <img :src="zbrouBrandImage" width="42" height="42" alt="" />
        <span>ZBROU<small>SCRIPTS</small></span>
      </NuxtLink>
      <nav class="store-header__nav" :class="{ 'store-header__nav--open': menuOpen }" aria-label="Navegación principal">
        <a href="/#inicio" @click="menuOpen = false">Inicio</a>
        <a href="/#scripts" @click="menuOpen = false">Scripts</a>
        <a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer" @click="menuOpen = false">Documentación <span aria-hidden="true">↗</span></a>
      </nav>
      <div class="store-header__actions">
        <NuxtLink class="store-header__account" :to="authStore.loginRoute">{{ authStore.isAuthenticated ? 'Mi cuenta' : 'Acceder' }}</NuxtLink>
        <button type="button" class="store-header__cart" @click="uiStore.toggleItem('cart-sidebar')" aria-label="Abrir cesta">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.6 13.3a2 2 0 0 0 2 1.7H20l2-11H6"/></svg>
          <span>Cesta</span>
          <small v-if="basketStore.basket?.packages?.length">{{ basketStore.basket.packages.length }}</small>
        </button>
        <button class="store-header__menu" type="button" :aria-expanded="menuOpen" aria-label="Abrir menú" @click="menuOpen = !menuOpen"><i></i><i></i><i></i></button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { zbrouBrandImage } from "~/utils/brandImages";
const authStore = useAuthStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
const menuOpen = ref(false);
</script>

<style scoped>
.store-header{position:sticky;top:0;z-index:700;padding:14px 20px 0;background:transparent;font-family:Manrope,Arial,sans-serif}
.store-header__inner{display:flex;align-items:center;gap:38px;min-height:70px;width:min(1200px,100%);padding:10px 18px;margin:auto;border:1px solid #ffffff29;border-radius:23px;background:linear-gradient(145deg,#22252bfa,#111317fa 55%,#252930f8);box-shadow:0 18px 42px #0005;backdrop-filter:blur(25px)}
.store-header__brand{display:flex;gap:8px;align-items:center;text-decoration:none;min-width:172px}
.store-header__brand:hover{text-decoration:none}
.store-header__brand img{width:40px;height:40px;object-fit:contain}
.store-header__brand>span{font:700 17px Oxanium,Arial,sans-serif;letter-spacing:.14em;color:#fff;line-height:1}
.store-header__brand small{display:block;margin-top:5px;font:600 8px Manrope,sans-serif;letter-spacing:.38em;color:#d9e1ec}
.store-header__nav{display:flex;align-items:center;gap:28px}
.store-header__nav a{color:#c3c7cf;text-decoration:none;font-size:13px;font-weight:600;transition:color .2s}
.store-header__nav a:hover{color:#fff;text-decoration:none}
.store-header__nav span{color:#a9bedb}
.store-header__actions{display:flex;align-items:center;gap:20px;margin-left:auto}
.store-header__account{color:#e4e8ef;font-size:13px;font-weight:600;text-decoration:none}
.store-header__account:hover{color:#fff;text-decoration:none}
.store-header__cart{display:flex;align-items:center;gap:9px;justify-content:center;min-height:43px;padding:0 17px;border:0;border-radius:12px;background:#c4d5e9;color:#11233b;font-size:13px;font-weight:800;transition:background .2s,transform .2s}
.store-header__cart:hover{background:#e0ebf8;transform:translateY(-2px)}
.store-header__cart small{background:#11233b;color:#fff;border-radius:6px;padding:1px 6px}
.store-header__menu{display:none;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:41px;height:41px;border:1px solid #ffffff30;background:#2b313a;border-radius:10px}
.store-header__menu i{width:17px;height:2px;border-radius:5px;background:#fff}
@media(max-width:750px){.store-header__inner{gap:13px}.store-header__nav{display:none;position:absolute;top:77px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:12px 22px;border:1px solid #ffffff26;border-radius:17px;background:#1a1d23;box-shadow:0 19px 35px #0008}.store-header__nav--open{display:flex}.store-header__nav a{padding:12px 0}.store-header__menu{display:flex}.store-header__account{display:none}}
@media(max-width:440px){.store-header{padding:9px 11px 0}.store-header__inner{padding:9px 12px;min-height:62px;border-radius:17px}.store-header__brand{min-width:auto}.store-header__brand img{width:34px;height:34px}.store-header__brand>span{font-size:14px}.store-header__brand small{font-size:7px}.store-header__cart{min-height:39px;padding:0 12px}.store-header__cart span{display:none}.store-header__actions{gap:9px}}
@media(prefers-reduced-motion:reduce){.store-header__cart,.store-header__nav a{transition:none}}
</style>