<template>
  <header class="zb-nav">
    <div class="zb-nav__inner">
      <NuxtLink to="/" class="zb-nav__brand" aria-label="ZBrou Scripts home" @click="menuOpen = false">
        <span class="zb-nav__symbol">ZB<span>.</span></span>
        <span class="zb-nav__brand-copy"><b>ZBROU</b><small>SCRIPTS</small></span>
      </NuxtLink>

      <nav class="zb-nav__links" :class="{ 'zb-nav__links--open': menuOpen }" aria-label="Main navigation">
        <a href="/#home" @click="menuOpen = false">Home</a>
        <a href="/#phrasekill" @click="menuOpen = false">PhraseKill</a>
        <a href="/#features" @click="menuOpen = false">Features</a>
        <a href="/#activity" @click="menuOpen = false">Network</a>
        <a href="/#faq" @click="menuOpen = false">FAQ</a>
      </nav>

      <div class="zb-nav__actions">
        <NuxtLink :to="authStore.loginRoute" class="zb-nav__login">{{ authStore.isAuthenticated ? 'Account' : 'Login' }}</NuxtLink>
        <button class="zb-nav__cart" type="button" @click="uiStore.toggleItem('cart-sidebar')" aria-label="Open shopping basket">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.3 12.2a2 2 0 0 0 2 1.6H19a2 2 0 0 0 2-1.7L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg>
          <span>Cart</span><small>{{ basketStore.basket?.packages?.length ?? 0 }}</small>
        </button>
        <button type="button" class="zb-nav__mobile-toggle" :aria-expanded="menuOpen" aria-label="Toggle navigation" @click="menuOpen = !menuOpen"><i></i><i></i><i></i></button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const authStore = useAuthStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
</script>

<style scoped>
.zb-nav{position:sticky;top:0;z-index:700;width:100%;height:84px;background:#080d16eF;border-bottom:1px solid #273a58b5;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);font-family:Manrope,Arial,sans-serif}
.zb-nav__inner{max-width:1390px;padding:0 37px;margin:auto;height:100%;display:flex;align-items:center;justify-content:space-between;gap:30px}
.zb-nav__brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.zb-nav__brand:hover{text-decoration:none}
.zb-nav__symbol{color:#fff;font:900 24px "Space Grotesk",Arial,sans-serif;letter-spacing:-.12em;width:46px;height:46px;border-radius:12px;display:grid;place-items:center;border:1px solid #31528c;background:linear-gradient(145deg,#213f73,#0a1730);box-shadow:inset 0 1px #ffffff32}
.zb-nav__symbol span{color:#4691ff}
.zb-nav__brand-copy{display:flex;flex-direction:column;gap:0}
.zb-nav__brand-copy b{font-weight:900;font-size:14px;letter-spacing:.17em;line-height:1.2;color:#f1f7ff}
.zb-nav__brand-copy small{font-size:9px;font-weight:800;letter-spacing:.35em;color:#6486b5;line-height:1.7}
.zb-nav__links{display:flex;align-items:center;gap:clamp(14px,2.2vw,34px)}
.zb-nav__links a{font-size:12px;font-weight:700;color:#8499b6;text-decoration:none;transition:color .2s}
.zb-nav__links a:hover{color:#fff;text-decoration:none}
.zb-nav__actions{display:flex;align-items:center;gap:22px}
.zb-nav__login{color:#b6c8e5;font-size:12px;font-weight:800;text-decoration:none}
.zb-nav__login:hover{color:#fff;text-decoration:none}
.zb-nav__cart{border:1px solid #3e82ea;background:#0e58d8;color:#fff;border-radius:10px;display:flex;gap:10px;align-items:center;padding:12px 15px;font-size:12px;font-weight:800;transition:background .2s,transform .2s}
.zb-nav__cart:hover{background:#2572e4;transform:translateY(-2px)}
.zb-nav__cart small{min-width:21px;height:20px;padding:2px 4px;background:#ffffff29;border-radius:5px;font-size:10px}
.zb-nav__mobile-toggle{display:none;width:42px;height:42px;align-items:center;justify-content:center;flex-direction:column;gap:5px;border:1px solid #365076;border-radius:9px;background:#15243b;color:#fff}
.zb-nav__mobile-toggle i{display:block;width:19px;height:2px;background:#c9dcf9;border-radius:2px}
@media(max-width:980px){.zb-nav__links{gap:14px}.zb-nav__inner{gap:17px;padding:0 22px}.zb-nav__actions{gap:14px}}
@media(max-width:790px){.zb-nav{height:72px}.zb-nav__inner{padding:0 16px}.zb-nav__links{display:none;position:absolute;top:71px;left:0;right:0;flex-direction:column;align-items:stretch;padding:16px 22px 25px;gap:0;background:#0a1424f9;border-bottom:1px solid #314667;box-shadow:0 20px 50px #0007}.zb-nav__links--open{display:flex}.zb-nav__links a{padding:12px 0;font-size:14px}.zb-nav__mobile-toggle{display:flex}.zb-nav__login{display:none}}
@media(max-width:450px){.zb-nav__brand-copy b{font-size:12px}.zb-nav__brand-copy small{font-size:8px}.zb-nav__cart{padding:10px 12px}.zb-nav__cart span{display:none}}
@media(prefers-reduced-motion:reduce){.zb-nav__cart,.zb-nav__links a{transition:none}}
</style>