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
        <a href="/#comunidad" @click="menuOpen = false">Comunidad</a>
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
.store-header{position:sticky;top:0;z-index:700;padding:16px 20px 0;background:transparent;font-family:Manrope,Arial,sans-serif}
.store-header__inner{display:flex;align-items:center;gap:38px;min-height:68px;width:min(1190px,100%);padding:10px 17px;margin:auto;border:1px solid #85b5ed37;border-radius:18px;background:linear-gradient(135deg,#15253adf,#0b1323e9 70%);box-shadow:0 20px 52px #0008, inset 0 1px #ffffff11;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.store-header__brand{display:flex;gap:11px;align-items:center;text-decoration:none;min-width:174px}
.store-header__brand:hover{text-decoration:none}
.store-header__brand img{width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 0 12px #9ec8ff3d);transition:transform .35s}
.store-header__brand:hover img{transform:rotate(-7deg) scale(1.08)}
.store-header__brand>span{font:750 16px Oxanium,Arial,sans-serif;letter-spacing:.14em;color:#f5f9ff;line-height:1}
.store-header__brand small{display:block;margin-top:6px;font:650 8px Manrope,sans-serif;letter-spacing:.37em;color:#8baed8}
.store-header__nav{display:flex;align-items:center;gap:26px}
.store-header__nav a{position:relative;color:#b7c8e1;text-decoration:none;font-size:12px;font-weight:750;transition:color .2s}
.store-header__nav a:after{content:"";position:absolute;bottom:-9px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#9acaff,transparent);opacity:0;transform:translateY(4px);transition:all .22s}
.store-header__nav a:hover{color:#fff;text-decoration:none}
.store-header__nav a:hover:after{opacity:1;transform:translateY(0)}
.store-header__nav span{color:#80afe7}
.store-header__actions{display:flex;align-items:center;gap:19px;margin-left:auto}
.store-header__account{color:#d4e3fa;font-size:12px;font-weight:750;text-decoration:none;transition:color .2s}
.store-header__account:hover{color:#fff;text-decoration:none}
.store-header__cart{display:flex;align-items:center;gap:9px;justify-content:center;min-height:43px;padding:0 16px;border:1px solid #eaf6ff60;border-radius:11px;background:linear-gradient(145deg,#eff7ff,#bad6fb);color:#14243c;font-size:12px;font-weight:850;transition:transform .24s,background .24s,box-shadow .24s}
.store-header__cart:hover{background:#fff;transform:translateY(-3px);box-shadow:0 9px 28px #5393ee52}
.store-header__cart small{background:#1d3350;color:#fff;border-radius:6px;padding:1px 6px}
.store-header__menu{display:none;flex-direction:column;align-items:center;justify-content:center;gap:5px;width:41px;height:41px;border:1px solid #83abdc56;background:#1b2c45;border-radius:10px}
.store-header__menu i{width:17px;height:2px;border-radius:5px;background:#eaf3ff}
@media(max-width:900px){.store-header__inner{gap:23px}.store-header__nav{gap:14px}.store-header__brand{min-width:153px}}
@media(max-width:750px){.store-header{padding:10px 15px 0}.store-header__inner{gap:13px}.store-header__nav{display:none;position:absolute;top:76px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:13px 23px;border:1px solid #618cbe70;border-radius:16px;background:#101d31fa;box-shadow:0 22px 45px #0009}.store-header__nav--open{display:flex}.store-header__nav a{padding:13px 0}.store-header__nav a:after{display:none}.store-header__menu{display:flex}.store-header__account{display:none}}
@media(max-width:440px){.store-header{padding:8px 10px 0}.store-header__inner{padding:9px 12px;min-height:59px;border-radius:16px}.store-header__brand{min-width:auto}.store-header__brand img{width:34px;height:34px}.store-header__brand>span{font-size:14px}.store-header__brand small{font-size:7px}.store-header__cart{min-height:39px;padding:0 12px}.store-header__cart span{display:none}.store-header__actions{gap:9px}}
@media(prefers-reduced-motion:reduce){.store-header__cart,.store-header__nav a,.store-header__brand img{transition:none}}
</style>