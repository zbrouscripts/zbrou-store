<template>
  <main class="ph-page">
    <div class="ph-ambient ph-ambient--top" aria-hidden="true"></div>

    <section id="home" class="ph-hero">
      <div class="ph-wrap ph-hero__wrap">
        <div class="ph-hero__intro">
          <p class="ph-eyebrow"><span class="ph-indicator"></span> ZBROU SCRIPTS <span class="ph-separator">//</span> FIVEM RESOURCES</p>
          <h1>Make your mark<span class="ph-accent">.</span><br /><span class="ph-hero__outline">Every single kill.</span></h1>
          <p class="ph-hero__lead">Introducing PhraseKill. Your message, your style, your moment. Give every elimination a visual identity that belongs to your server.</p>
          <div class="ph-actions">
            <a class="ph-cta ph-cta--solid" href="#phrasekill">Explore PhraseKill <span aria-hidden="true">↗</span></a>
            <a class="ph-cta ph-cta--ghost" href="#preview">See it in action <span aria-hidden="true">▷</span></a>
          </div>
          <div class="ph-hero__chips"><span>FiveM</span><span>ESX / QBCore / Qbox</span><span>Standalone</span></div>
        </div>

        <div class="ph-hero__visual" aria-label="PhraseKill product visual">
          <div class="ph-hero__halo"></div>
          <div class="ph-hero__halo ph-hero__halo--inner"></div>
          <div class="ph-preview-tile">
            <div class="ph-preview-tile__top"><span><i></i> ZBROU INTERFACE SYSTEM</span><span>PK—01</span></div>
            <img src="/phrasekill-poster.svg" alt="PhraseKill cover artwork" class="ph-preview-tile__art" />
            <div class="ph-preview-tile__bottom"><span>PHRASEKILL</span><span>FOR FIVEM ↗</span></div>
          </div>
          <div class="ph-hero__float ph-hero__float--left"><span class="ph-float-icon">✧</span><span><b>CUSTOM ANIMATIONS</b><small>Motion & effects</small></span></div>
          <div class="ph-hero__float ph-hero__float--right"><span class="ph-float-icon">⌘</span><span><b>THREE PHRASE SLOTS</b><small>Your message, your rules</small></span></div>
        </div>
      </div>
      <div class="ph-wrap ph-hero__rail"><span>BUILT BY ZBROU / 2026</span><span>DISCOVER MORE <i aria-hidden="true">↓</i></span></div>
    </section>

    <div class="ph-trust" aria-label="Store highlights">
      <div class="ph-wrap ph-trust__inner">
        <span><b>01</b> CONFIGURABLE</span>
        <i aria-hidden="true"></i>
        <span><b>02</b> FIVEM FOCUSED</span>
        <i aria-hidden="true"></i>
        <span><b>03</b> TEBEX CHECKOUT</span>
        <i aria-hidden="true"></i>
        <span><b>04</b> DOCUMENTED</span>
      </div>
    </div>

    <section id="phrasekill" class="ph-feature ph-section">
      <div class="ph-wrap">
        <div class="ph-heading">
          <p class="ph-eyebrow">01 / THE RELEASE</p>
          <h2>One resource.<br /><em>Endless personality.</em></h2>
          <p>We're starting with one thing, done with intention: PhraseKill.</p>
        </div>
        <div class="ph-feature__layout">
          <div class="ph-feature__image">
            <div class="ph-feature__art-wrap">
              <img :src="phrasekillPackage?.image || '/phrasekill-poster.svg'" alt="PhraseKill FiveM product artwork" loading="lazy" />
              <span class="ph-feature__image-corner">ZB / PHRASEKILL</span>
            </div>
            <div class="ph-feature__image-footer"><span>FIVEM SCRIPT / 001</span><span>CRAFTED BY ZBROU</span></div>
          </div>
          <div class="ph-feature__details">
            <div class="ph-feature__meta"><span class="ph-pulse"></span> {{ phrasekillPackage ? 'PUBLISHED ON TEBEX' : 'PRODUCT SHOWCASE' }} <span>•</span> DIGITAL RESOURCE</div>
            <h3>PhraseKill<span class="ph-accent">.</span></h3>
            <p class="ph-feature__copy">Custom kill messages that feel like part of your server, not a generic notification. Create, style and save the exact experience you want players to see.</p>
            <div class="ph-feature__facts">
              <div><b>03</b><span>Phrase configurations</span></div>
              <div><b>100</b><span>Font options in editor</span></div>
              <div><b>FX</b><span>Motion, color & glow</span></div>
            </div>
            <div class="ph-feature__price">
              <div><span>PRODUCT PRICE</span><strong v-if="phrasekillPackage">{{ $n(phrasekillPackage.base_price, 'currency') }}</strong><strong v-else>Not published</strong></div>
              <span v-if="phrasekillPackage" class="ph-feature__available">Available through Tebex</span>
              <span v-else class="ph-feature__await">Awaiting the live Tebex listing</span>
            </div>
            <div class="ph-actions ph-actions--wide">
              <button class="ph-cta ph-cta--solid" type="button" :disabled="!phrasekillPackage || adding" @click="addPhrasekill">
                {{ !phrasekillPackage ? 'Purchases coming soon' : adding ? 'Opening checkout…' : 'Add to basket' }} <span aria-hidden="true">↗</span>
              </button>
              <a class="ph-cta ph-cta--ghost" href="#preview">Watch preview <span aria-hidden="true">▷</span></a>
            </div>
            <p v-if="basketError" class="ph-feature__error" role="alert">{{ basketError }}</p>
            <p class="ph-feature__fineprint">Purchases and payments are handled by Tebex. The price shown comes directly from the published listing.</p>
          </div>
        </div>
      </div>
    </section>

    <ScrollShowcase />

    <section id="preview" class="ph-interactive ph-section">
      <div class="ph-wrap">
        <div class="ph-heading ph-heading--center">
          <p class="ph-eyebrow">02 / INTERACTIVE LOOK</p>
          <h2>A little preview of <em>what's possible.</em></h2>
          <p>A visual concept of different PhraseKill effects. The actual in-game editor lets you configure your own.</p>
        </div>

        <div class="ph-lab">
          <div class="ph-lab__chrome"><span><i></i><i></i><i></i></span><span>ZBROU / PHRASEKILL PREVIEW</span><span>INTERACTIVE CONCEPT</span></div>
          <div class="ph-lab__screen" :class="'ph-lab__screen--' + selectedStyle">
            <div class="ph-lab__crosshair" aria-hidden="true"><i></i><i></i></div>
            <div class="ph-lab__kill" :key="selectedStyle"><span>{{ previewCopy }}</span><small>+ 1 ELIMINATION</small></div>
            <div class="ph-lab__hud"><span>EXAMPLE EFFECT / NOT GAME FOOTAGE</span><span>PREVIEW_0{{ styles.indexOf(selectedStyle) + 1 }}</span></div>
          </div>
          <div class="ph-lab__controls">
            <div><span class="ph-lab__controls-title">CHOOSE AN EFFECT</span><p>Switch styles to see the concept adapt.</p></div>
            <div class="ph-lab__options" role="group" aria-label="PhraseKill demo effect">
              <button v-for="style in styles" :key="style" type="button" :class="{ active: selectedStyle === style }" :aria-pressed="selectedStyle === style" @click="selectedStyle = style">{{ styleLabels[style] }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ph-benefits ph-section" id="features">
      <div class="ph-wrap">
        <div class="ph-heading"><p class="ph-eyebrow">03 / THE DETAILS</p><h2>Control the <em>little things.</em></h2><p>Built around personalization and straightforward configuration.</p></div>
        <div class="ph-benefits__grid">
          <article class="ph-benefit ph-benefit--large">
            <div class="ph-benefit__number">01 / CONFIGURE</div><div class="ph-benefit__visual"><span class="ph-benefit__slot">SLOT 01 <i>ACTIVE</i></span><span class="ph-benefit__slot">SLOT 02 <i>READY</i></span><span class="ph-benefit__slot">SLOT 03 <i>READY</i></span></div>
            <div><h3>Three ways to express yourself.</h3><p>Keep multiple saved phrases and switch between fixed or random selection.</p></div>
          </article>
          <article class="ph-benefit">
            <div class="ph-benefit__number">02 / CUSTOMIZE</div><div class="ph-benefit__symbol" aria-hidden="true">Aa<span>.</span></div>
            <div><h3>Your typography.</h3><p>Choose from an extensive font selection, plus color, sizing and positioning controls.</p></div>
          </article>
          <article class="ph-benefit">
            <div class="ph-benefit__number">03 / ANIMATE</div><div class="ph-benefit__symbol ph-benefit__symbol--effects" aria-hidden="true"><span></span><span></span><span></span></div>
            <div><h3>Make it move.</h3><p>Fine-tune animations, glow, timing and the feeling of each message.</p></div>
          </article>
          <article class="ph-benefit">
            <div class="ph-benefit__number">04 / MANAGE</div><div class="ph-benefit__symbol" aria-hidden="true">⌘</div>
            <div><h3>Control access.</h3><p>Set up permissions and manage who can use PhraseKill on your server.</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="ph-video ph-section" id="demo-video">
      <div class="ph-wrap ph-video__layout">
        <div class="ph-video__copy">
          <p class="ph-eyebrow">04 / REAL PREVIEW</p>
          <h2>Don't imagine it.<br /><em>See it.</em></h2>
          <p>Watch the PhraseKill demonstration, then explore the documentation to understand the configuration.</p>
          <a class="ph-cta ph-cta--ghost" href="https://youtu.be/AYea1bq0pv4" target="_blank" rel="noopener noreferrer">Open video on YouTube ↗</a>
        </div>
        <div class="ph-video__frame"><iframe title="PhraseKill demonstration on YouTube" loading="lazy" src="https://www.youtube-nocookie.com/embed/AYea1bq0pv4" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      </div>
    </section>

    <section id="activity" class="ph-activity ph-section">
      <div class="ph-wrap">
        <div class="ph-heading ph-heading--center">
          <p class="ph-eyebrow">05 / LIVE NETWORK</p>
          <h2>Built for real <em>communities.</em></h2>
          <p>When servers opt in to sharing aggregate usage metrics, their totals will appear here automatically.</p>
        </div>
        <div class="ph-activity__panel">
          <div class="ph-activity__header">
            <div><span class="ph-pulse" :class="{ 'ph-pulse--online': usage?.connected }"></span><strong>ZBROU NETWORK</strong><small>{{ usage?.connected ? 'CONNECTED · AGGREGATED METRICS' : 'AWAITING LIVE TELEMETRY' }}</small></div>
            <span class="ph-activity__tag">{{ usage?.connected ? 'DATA CONNECTED' : 'NOT CONNECTED' }}</span>
          </div>
          <div class="ph-activity__stats">
            <div><small>ACTIVE SERVERS</small><strong>{{ displayMetric(usage?.serversActive) }}</strong><span>{{ usage?.connected ? 'Reporting currently' : 'Not yet tracked' }}</span></div>
            <div><small>ONLINE PLAYERS</small><strong>{{ displayMetric(usage?.playersOnline) }}</strong><span>{{ usage?.connected ? 'Across opted-in servers' : 'Not yet tracked' }}</span></div>
            <div><small>INSTALLATIONS</small><strong>{{ displayMetric(usage?.installations) }}</strong><span>{{ usage?.connected ? 'Reported by telemetry' : 'Not yet tracked' }}</span></div>
          </div>
          <div class="ph-activity__note"><span aria-hidden="true">ⓘ</span><p>No invented sales, player or server counts. Real activity will appear once a server-side telemetry source is configured.</p><span v-if="usage?.updatedAt" class="ph-activity__timestamp">UPDATED {{ new Date(usage.updatedAt).toLocaleString('en-GB') }}</span></div>
        </div>
      </div>
    </section>

    <section class="ph-faq ph-section" id="faq">
      <div class="ph-wrap ph-faq__layout">
        <div><p class="ph-eyebrow">06 / GOOD TO KNOW</p><h2>Questions?<br /><em>We got you.</em></h2><p>Useful answers before you install.</p><a class="ph-cta ph-cta--ghost" href="https://zbrouscripts.gitbook.io/zbrou-scripts/frasekill" target="_blank" rel="noopener noreferrer">Read documentation ↗</a></div>
        <div class="ph-faq__items">
          <details><summary>What is PhraseKill?<span>+</span></summary><p>A FiveM script that displays customizable phrases when a player gets an elimination, with several visual and configuration options.</p></details>
          <details><summary>Which frameworks are supported?<span>+</span></summary><p>The project is designed for ESX, QBCore, Qbox and standalone setups. Check the release documentation for tested versions and requirements.</p></details>
          <details><summary>Can I save different styles?<span>+</span></summary><p>Yes. PhraseKill includes three saved phrase configurations with fixed or random selection options.</p></details>
          <details><summary>How do I buy it?<span>+</span></summary><p>Once the package is published in Tebex, the product price and purchase button activate automatically. Tebex handles checkout and payment.</p></details>
          <details><summary>How do live server statistics work?<span>+</span></summary><p>The panel only displays real aggregated numbers from an opt-in server-side telemetry integration. Until one is connected, values remain unavailable.</p></details>
        </div>
      </div>
    </section>

    <section class="ph-outro">
      <div class="ph-wrap ph-outro__inside">
        <span>YOUR SERVER. YOUR SIGNATURE.</span><h2>Leave a lasting <em>impression.</em></h2>
        <div class="ph-actions"><a class="ph-cta ph-cta--solid" href="#phrasekill">Discover PhraseKill ↗</a><a class="ph-cta ph-cta--ghost" href="https://github.com/zbrouscripts/docs" target="_blank" rel="noopener noreferrer">Documentation ↗</a></div>
        <div class="ph-outro__watermark" aria-hidden="true">ZB</div>
      </div>
    </section>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import type { Package } from "~/types";
useSeoMeta({
  title: "ZBrou Scripts — PhraseKill for FiveM",
  description: "PhraseKill by ZBrou: customizable FiveM kill messages, saved phrase slots, fonts, glow and visual effects. Explore the official store and documentation.",
  ogTitle: "ZBrou Scripts | PhraseKill",
  ogDescription: "Your message. Your style. Your moment. PhraseKill for FiveM.",
  twitterCard: "summary_large_image",
});
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
  ],
});
const styles = ["classic", "aurora", "glitch"] as const;
type Style = typeof styles[number];
const styleLabels: Record<Style, string> = { classic: "Classic", aurora: "Aurora", glitch: "Glitch" };
const previewMessages: Record<Style, string> = { classic: "ELIMINATED", aurora: "NICE SHOT", glitch: "NO MERCY" };
const selectedStyle = ref<Style>("aurora");
const previewCopy = computed(() => previewMessages[selectedStyle.value]);
const categoryStore = useCategoryStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const phrasekillPackage = computed<Package | undefined>(() => {
  const products = (categories.value ?? []).flatMap((category) => category.packages ?? []);
  return products.find((pkg) => pkg.id === 7706999 || /phrase\s*kill/i.test(pkg.name));
});
interface Usage { connected: boolean; serversActive: number | null; playersOnline: number | null; installations: number | null; updatedAt: string | null }
const { data: usage } = await useFetch<Usage>("/api/usage");
const displayMetric = (number: number | null | undefined) => typeof number === "number" ? number.toLocaleString("en-US") : "—";
const adding = ref(false);
const basketError = ref("");
async function addPhrasekill() {
  if (!phrasekillPackage.value || adding.value) return;
  basketError.value = "";
  adding.value = true;
  try {
    const result = await basketStore.addPackageToBasket(phrasekillPackage.value.id, 1);
    if (result) uiStore.toggleItem("cart-sidebar");
  } catch {
    basketError.value = "Unable to start this purchase. Please try again or contact support.";
  } finally {
    adding.value = false;
  }
}
</script>

<style lang="scss">
@use "~/assets/styles/phrasekill-landing.scss";
</style>