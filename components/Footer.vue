<template>
  <footer class="zb-footer">
    <div class="zb-footer__main">
      <div class="zb-footer__brand">
        <NuxtLink to="/" class="zb-footer__logo">ZB<span>.</span><small>ZBROU SCRIPTS</small></NuxtLink>
        <p>Independent FiveM resources. Built with purpose, detail and room to make every server feel different.</p>
      </div>
      <div class="zb-footer__column"><h3>Explore</h3><a href="/#phrasekill">PhraseKill</a><a href="/#features">Features</a><a href="/#activity">Network</a><a href="/#faq">Questions</a></div>
      <div class="zb-footer__column"><h3>Resources</h3><a href="https://github.com/zbrouscripts/docs" target="_blank" rel="noopener noreferrer">Documentation</a><a href="https://zbrouscripts.gitbook.io/zbrou-scripts/frasekill" target="_blank" rel="noopener noreferrer">PhraseKill guide</a><a href="https://youtu.be/AYea1bq0pv4" target="_blank" rel="noopener noreferrer">Video demo</a></div>
      <div class="zb-footer__column"><h3>Legal</h3><a href="https://checkout.tebex.io/terms" target="_blank" rel="noopener noreferrer">Terms of service</a><a href="https://checkout.tebex.io/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</a><a href="https://checkout.tebex.io/impressum" target="_blank" rel="noopener noreferrer">Imprint</a></div>
    </div>
    <div class="zb-footer__bottom"><span>© 2026 ZBrou Scripts. All rights reserved.</span><span>Purchases and order-related support are handled by <a href="https://www.tebex.io/" target="_blank" rel="noopener noreferrer">Tebex</a> as Merchant of Record.</span></div>
  </footer>
</template>

<style scoped>
.zb-footer{background:#050a12;border-top:1px solid #29456a;color:#8fa1bb;font-family:Manrope,Arial,sans-serif}
.zb-footer__main{max-width:1310px;margin:auto;display:grid;grid-template-columns:2fr repeat(3,1fr);gap:46px;padding:82px 38px 70px}
.zb-footer__logo{display:flex;align-items:center;gap:16px;text-decoration:none;color:#f5f8ff;font:900 47px "Space Grotesk",Arial,sans-serif;letter-spacing:-.12em}
.zb-footer__logo span{color:#367fe6}
.zb-footer__logo small{font:800 12px Manrope,Arial,sans-serif;letter-spacing:.15em;color:#d1e0f5}
.zb-footer__brand p{max-width:290px;font-size:13px;line-height:1.8;color:#8497b2;margin:22px 0 0}
.zb-footer__column{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.zb-footer__column h3{font:800 11px Manrope,sans-serif;letter-spacing:.1em;color:#e3edfc;margin:0 0 8px}
.zb-footer__column a{color:#899ebc;font-size:12px;text-decoration:none;transition:color .2s}
.zb-footer__column a:hover{color:#f4f8ff}
.zb-footer__bottom{border-top:1px solid #20334d;max-width:1310px;margin:auto;display:flex;gap:25px;align-items:center;justify-content:space-between;padding:28px 38px 36px;color:#697c97;font-size:11px}
.zb-footer__bottom a{color:#abc5ed;text-decoration:underline}
@media(max-width:800px){.zb-footer__main{grid-template-columns:repeat(2,1fr);gap:40px}.zb-footer__bottom{flex-direction:column;align-items:start}}
@media(max-width:460px){.zb-footer__main{grid-template-columns:repeat(2,1fr);gap:35px 25px;padding:60px 20px}.zb-footer__brand{grid-column:span 2}.zb-footer__bottom{padding:25px 20px}.zb-footer__logo{font-size:40px}}
</style>