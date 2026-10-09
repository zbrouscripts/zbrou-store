<template>
  <footer class="zb-footer">
    <div class="zb-shell">
      <div class="zb-footer__main">
        <div class="zb-footer__brand"><NuxtLink to="/" class="zb-brand" aria-label="ZBrou Scripts — Inicio"><img :src="zbrouBrandImage" width="45" height="45" alt="" /><span>ZBROU<small>SCRIPTS</small></span></NuxtLink><p>Scripts con personalidad para FiveM.</p><a class="zb-footer__social zb-icon-btn" :href="discordUrl || '/#comunidad'" :target="discordUrl ? '_blank' : undefined" rel="noopener noreferrer" aria-label="Discord de ZBrou"><StoreGlyph name="discord" :size="21" /></a></div>
        <div class="zb-footer__col"><h3>Explora ZBrou</h3><a href="/#inicio">Inicio</a><a href="/#scripts">Todos los scripts</a><a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer">Documentación <StoreGlyph name="external" :size="12" /></a><a :href="discordUrl || '/#comunidad'" :target="discordUrl ? '_blank' : undefined" rel="noopener noreferrer">Comunidad <StoreGlyph name="discord" :size="13" /></a></div>
        <div class="zb-footer__col"><h3>Ayuda con tu compra</h3><a href="https://checkout.tebex.io/terms" target="_blank" rel="noopener noreferrer">Condiciones de compra</a><a href="https://www.tebex.io/contact/checkout" target="_blank" rel="noopener noreferrer">Soporte de pagos <StoreGlyph name="external" :size="12" /></a><a href="https://checkout.tebex.io/privacy" target="_blank" rel="noopener noreferrer">Privacidad</a></div>
      </div>
      <div class="zb-footer__payments">
        <p class="zb-footer__payment-label"><StoreGlyph name="shield" :size="17" />Métodos de pago mediante Tebex<small>Disponibilidad según país, moneda y tipo de compra.</small></p>
        <div class="zb-payment-logos" aria-label="Visa, Mastercard y PayPal">
          <span class="zb-payment-logo"><svg viewBox="0 0 80 32" role="img" aria-label="Visa"><text x="5" y="26" font-family="Arial,sans-serif" font-size="30" font-weight="900" font-style="italic" fill="#d7e7ff">VISA</text></svg></span>
          <span class="zb-payment-logo"><svg viewBox="0 0 54 32" role="img" aria-label="Mastercard"><circle cx="20" cy="16" r="13" fill="#e55556"/><circle cx="35" cy="16" r="13" fill="#efb85b" opacity=".9"/></svg></span>
          <span class="zb-payment-logo zb-payment-logo--paypal"><svg viewBox="0 0 88 32" role="img" aria-label="PayPal"><text x="1" y="24" font-family="Arial,sans-serif" font-size="23" font-weight="700" font-style="italic" fill="#accdff">Pay<tspan fill="#6dbcec">Pal</tspan></text></svg></span>
        </div>
      </div>
      <div class="zb-footer__legal">
        <div class="zb-footer__legal-top"><a class="zb-footer__tebex" href="https://www.tebex.io/" target="_blank" rel="noopener noreferrer" aria-label="Powered by Tebex"><span>POWERED BY</span><Icon name="tebex" width="66px" :font-controlled="false" /></a><p>Esta web y su proceso de compra están operados por nuestro distribuidor y vendedor oficial, Tebex Limited (Merchant of Record), que también gestiona las consultas sobre pedidos y los reembolsos.</p><div class="zb-footer__legal-links"><a href="https://checkout.tebex.io/impressum" target="_blank" rel="noopener noreferrer">Aviso legal</a><a href="https://checkout.tebex.io/terms" target="_blank" rel="noopener noreferrer">Condiciones</a><a href="https://checkout.tebex.io/privacy" target="_blank" rel="noopener noreferrer">Privacidad</a></div></div>
        <div class="zb-footer__copyright"><span>© {{ year }} ZBrou Scripts. Todos los derechos reservados.</span><span>ZBrou Scripts no está afiliado a Rockstar Games ni a Take-Two Interactive.</span></div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { zbrouBrandImage } from "~/utils/brandImages";
const year = new Date().getFullYear();
const discordUrl = computed(() => String(useRuntimeConfig().public.discordUrl || useAppConfig().discordUrl || ""));
</script>
