<template>
  <div class="zb-product-detail">
    <div class="zb-product-detail__media"><img :src="pkg.image || zbrouBrandImage" :alt="'Portada de ' + pkg.name" width="1536" height="1024" /></div>
    <div class="zb-product-detail__info">
      <span class="zb-eyebrow">SCRIPT PARA FIVEM</span><h1>{{ pkg.name }}</h1>
      <p class="zb-product-detail__description">{{ productText(pkg.description) || 'Consulta la documentación o contacta con ZBrou para conocer este recurso.' }}</p>
      <div class="zb-product-detail__purchase"><span class="zb-eyebrow">PRECIO</span><strong>{{ $n(pkg.base_price, 'currency') }}</strong><button type="button" class="zb-btn zb-btn--primary" :disabled="busyId !== null" @click="add"><StoreGlyph name="cart" :size="19" />{{ busyId === pkg.id ? 'Añadiendo…' : 'Añadir a la cesta' }}</button><p v-if="message" role="status">{{ message }}</p><small>El precio procede de Tebex. Las compras se procesan mediante Tebex.</small></div>
      <a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer" class="zb-product-detail__docs">Documentación <StoreGlyph name="external" :size="15" /></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Package } from '~/types';
import { productText } from '~/utils/storeCatalog';
import { zbrouBrandImage } from '~/utils/brandImages';
const props = defineProps<{ pkg: Package }>();
const { busyId, addProduct } = useProductCart();
const message = ref('');
async function add() {
  message.value = '';
  try { await addProduct(props.pkg); }
  catch { message.value = 'No se ha podido añadir el producto. Inténtalo de nuevo.'; }
}
</script>
<style scoped>
.zb-product-detail{display:grid;grid-template-columns:minmax(0,1.13fr) minmax(300px,.87fr);gap:30px}.zb-product-detail__media{min-width:0}.zb-product-detail__media img{width:100%;aspect-ratio:1.5;object-fit:cover;border-radius:18px;border:1px solid #ffffff28;background:#101927}.zb-product-detail h1{font:700 32px/1.2 Oxanium,sans-serif;margin:15px 0 22px;overflow-wrap:anywhere}.zb-product-detail__description{white-space:pre-line;color:#a8b6c9;font-size:14px;line-height:1.8;overflow-wrap:anywhere}.zb-product-detail__purchase{margin-top:28px;display:flex;flex-direction:column;align-items:flex-start;gap:11px}.zb-product-detail__purchase strong{font:700 25px Oxanium,sans-serif}.zb-product-detail__purchase .zb-btn{margin-top:6px}.zb-product-detail__purchase small{font-size:10px;line-height:1.7;color:#7c90aa}.zb-product-detail__purchase p{font-size:12px;color:#e6c3c3}.zb-product-detail__docs{display:inline-flex;align-items:center;gap:8px;margin-top:28px;color:#c6d8ed;font-size:13px;text-decoration:underline;text-underline-offset:5px}@media(max-width:820px){.zb-product-detail{grid-template-columns:1fr;gap:34px}}
</style>
