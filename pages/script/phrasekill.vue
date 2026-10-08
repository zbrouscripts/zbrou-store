<template>
  <main class="product-page">
    <div class="product-page__wrap">
      <NuxtLink to="/#scripts" class="product-page__back">← Volver a la tienda</NuxtLink>
      <div class="product-page__panel"><PhrasekillDetails /></div>
      <div class="product-page__trust"><StoreGlyph name="shield" :size="17" />Compra gestionada por Tebex<StoreGlyph name="code" :size="17" />Consulta la documentación antes de elegir</div>
      <div class="product-page__motion"><button class="zb-motion-control" type="button" :aria-pressed="enabled" @click="toggle"><StoreGlyph :name="enabled ? 'pause' : 'play'" :size="15" />{{ enabled ? 'Pausar animaciones' : 'Activar animaciones' }}</button></div>
    </div>
  </main>
</template>
<script setup lang="ts">
const { enabled, toggle } = useStoreMotion();
useSeoMeta({ title: "PhraseKill · ZBrou Scripts", description: "Funciones, compatibilidad y disponibilidad del producto en ZBrou Scripts." });
</script>
<style scoped>
.product-page{padding:136px 0 70px;min-height:70vh;color:#eff3fa;font-family:Manrope,Arial,sans-serif}.product-page__wrap{width:min(1400px,calc(100% - 96px));margin:auto}.product-page__back{display:inline-flex;align-items:center;margin-bottom:26px;text-decoration:none;font-size:12px;transition:transform .25s}.product-page__back:hover{transform:translateX(-4px)}.product-page__panel{padding:40px;border:1px solid #ffffff30;border-radius:25px;backdrop-filter:blur(20px)}.product-page__trust{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 15px;padding:25px 0;font-size:10px;color:#6889b2}.product-page__motion{display:flex;justify-content:flex-end;margin-top:10px}@media(max-width:820px){.product-page__wrap{width:calc(100% - 36px)}.product-page__panel{padding:24px}}@media(max-width:480px){.product-page{padding-top:110px}.product-page__wrap{width:calc(100% - 28px)}.product-page__panel{padding:18px;border-radius:18px}.product-page__trust{font-size:9px}}
</style>
