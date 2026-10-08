<template>
  <footer class="store-footer">
    <div class="store-footer__top">
      <NuxtLink to="/" class="store-footer__brand" aria-label="ZBrou Scripts"><img :src="zbrouBrandImage" width="28" height="28" alt="" /><span>ZBROU SCRIPTS</span></NuxtLink>
      <div class="store-footer__links"><a href="/#scripts">Scripts</a><a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer">Documentación</a><a href="https://checkout.tebex.io/terms" target="_blank" rel="noopener noreferrer">Condiciones</a><a href="https://checkout.tebex.io/privacy" target="_blank" rel="noopener noreferrer">Privacidad</a></div>
    </div>
    <div class="store-footer__bottom"><span>© 2026 ZBrou Scripts.</span><span>Pagos y pedidos gestionados por <a href="https://www.tebex.io/" target="_blank" rel="noopener noreferrer">Tebex</a> como vendedor oficial.</span></div>
  </footer>
</template>
<script setup lang="ts">
import { zbrouBrandImage } from "~/utils/brandImages";
</script>
<style scoped>
.store-footer{background:#080a0e;color:#8796a9;border-top:1px solid #ffffff1e;font-family:Manrope,Arial,sans-serif}
.store-footer__top,.store-footer__bottom{max-width:1200px;margin:auto;padding-inline:20px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.store-footer__top{min-height:110px}
.store-footer__brand{display:flex;align-items:center;gap:10px;color:#e7eef9;font:700 13px Oxanium,Arial,sans-serif;letter-spacing:.08em;text-decoration:none}
.store-footer__brand img{width:30px;height:30px;object-fit:contain}
.store-footer__links{display:flex;gap:24px;flex-wrap:wrap}
.store-footer__links a{color:#9caec6;font-size:12px;text-decoration:none}
.store-footer__links a:hover{color:white}
.store-footer__bottom{padding-block:18px 27px;border-top:1px solid #ffffff13;font-size:11px}
.store-footer__bottom a{color:#bdd5ef}
@media(max-width:700px){.store-footer__top,.store-footer__bottom{flex-direction:column;align-items:flex-start}.store-footer__top{padding-top:27px;padding-bottom:25px}.store-footer__bottom{padding-top:20px}.store-footer__links{gap:15px}}
.store-footer{background:#000;border-top:0}.store-footer__top,.store-footer__bottom{width:min(1160px,calc(100% - 96px));padding-inline:0}.store-footer__brand img{width:64px;height:64px;mix-blend-mode:screen}.store-footer__brand span{display:none}.store-footer__links a{font-size:11px}.store-footer__bottom{font-size:10px;color:#8290a4}
@media(max-width:700px){.store-footer__top,.store-footer__bottom{width:calc(100% - 40px)}}
</style>
