<template>
  <main class="product-page">
    <div class="product-page__wrap">
      <NuxtLink to="/#scripts" class="product-page__back">← Volver a la tienda</NuxtLink>
      <div class="product-page__panel"><PhrasekillDetails /></div>
    </div>
  </main>
</template>
<script setup lang="ts">
useSeoMeta({ title: "PhraseKill · ZBrou Scripts", description: "PhraseKill para FiveM. Consulta sus funciones, compatibilidad y disponibilidad." });
</script>
<style scoped>
.product-page{padding:128px 0 80px;min-height:70vh;background:#000;color:#eff3fa;font-family:Manrope,Arial,sans-serif}.product-page__wrap{width:min(1160px,calc(100% - 64px));margin:auto}.product-page__back{display:inline-block;margin-bottom:24px;color:#aebed4;text-decoration:none;font-size:13px}.product-page__panel{padding:30px;border:1px solid #ffffff30;border-radius:28px;background:linear-gradient(145deg,#ffffff0b,#ffffff03 48%,#ffffff08);backdrop-filter:blur(20px)}@media(max-width:700px){.product-page{padding-top:108px}.product-page__wrap{width:calc(100% - 30px)}.product-page__panel{padding:20px;border-radius:22px}}
</style>
