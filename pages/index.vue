<template>
  <main class="zb-page">
    <section class="zb-hero" aria-labelledby="zb-hero-title">
      <div class="zb-hero__grid" aria-hidden="true"></div>
      <div class="zb-container zb-hero__content">
        <div class="zb-hero__copy">
          <div class="zb-kicker"><span class="zb-status-dot"></span> OFFICIAL ZBROU STORE <span class="zb-kicker__sep">/</span> FIVEM</div>
          <h1 id="zb-hero-title">Better scripts.<br /><span>Better experiences.</span></h1>
          <p class="zb-hero__description">FiveM resources, interfaces and tools crafted by ZBrou. Explore our published releases in one place.</p>
          <div class="zb-actions">
            <a class="zb-button zb-button--primary" href="#catalog">Explore resources <span aria-hidden="true">↗</span></a>
            <a class="zb-button zb-button--subtle" href="https://github.com/zbrouscripts/docs" target="_blank" rel="noopener noreferrer">Documentation <span aria-hidden="true">↗</span></a>
          </div>
          <div class="zb-hero__details">
            <span><i aria-hidden="true"></i> FiveM resources</span>
            <span><i aria-hidden="true"></i> Secure Tebex checkout</span>
          </div>
        </div>

        <div class="zb-display" aria-hidden="true">
          <div class="zb-display__glow"></div>
          <div class="zb-display__orbit zb-display__orbit--one"></div>
          <div class="zb-display__orbit zb-display__orbit--two"></div>
          <div class="zb-display__card">
            <div class="zb-display__topbar"><span class="zb-display__dots"><b></b><b></b><b></b></span><span>ZBROU / SYSTEM</span><span>01—01</span></div>
            <div class="zb-display__body">
              <div class="zb-display__symbol">Z<span>.</span></div>
              <div class="zb-display__name">ZBROU<span>®</span></div>
              <div class="zb-display__sub">FIVEM SCRIPT COLLECTION</div>
              <div class="zb-display__bars"><b></b><b></b><b></b><b></b><b></b></div>
            </div>
            <div class="zb-display__bottom"><span>INDEPENDENT RESOURCES</span><span>EST. 2026</span></div>
          </div>
          <div class="zb-display__label zb-display__label--top"><span class="zb-display__label-dot"></span> FIVEM / DIGITAL</div>
          <div class="zb-display__label zb-display__label--bottom">DESIGNED BY ZBROU <span>↗</span></div>
        </div>
      </div>
      <div class="zb-container zb-hero__foot"><span>BUILD BETTER.</span><span>SCROLL TO EXPLORE <b>↓</b></span></div>
    </section>

    <section id="catalog" class="zb-catalog-section" aria-labelledby="catalog-title">
      <div class="zb-container">
        <div class="zb-section-heading">
          <div>
            <p class="zb-section-kicker">01 / RESOURCES</p>
            <h2 id="catalog-title">The collection<span>.</span></h2>
            <p>Only products published to our Tebex catalog are shown here.</p>
          </div>
          <span v-if="packageCount > 0" class="zb-catalog-count">{{ packageCount }} AVAILABLE</span>
        </div>

        <div v-if="publishedCategories.length" class="zb-categories">
          <section v-for="category in publishedCategories" :key="category.id" class="zb-category" :aria-label="category.name">
            <div class="zb-category__heading">
              <h3>{{ category.name }}</h3>
              <span>{{ category.packages.length }} {{ category.packages.length === 1 ? 'RESOURCE' : 'RESOURCES' }}</span>
            </div>
            <div class="zb-products">
              <PackageCard v-for="pkg in category.packages" :key="pkg.id" :pkg="pkg" hide-options />
            </div>
          </section>
        </div>

        <div v-else class="zb-empty">
          <div class="zb-empty__shape" aria-hidden="true"><span>Z.</span></div>
          <div class="zb-empty__copy">
            <span class="zb-empty__eyebrow">CATALOG / STATUS</span>
            <h3>{{ categoriesError ? 'Catalog temporarily unavailable' : 'Preparing the collection' }}</h3>
            <p>{{ categoriesError ? 'We could not load the Tebex catalog right now. Please try again later.' : 'Published ZBrou products will appear here once the Tebex catalog is ready.' }}</p>
            <a href="https://github.com/zbrouscripts/docs" target="_blank" rel="noopener noreferrer">View documentation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "ZBrou Scripts — FiveM Resources",
  description: "Official ZBrou store for FiveM scripts, interfaces and tools. Browse published resources with secure checkout through Tebex.",
  ogTitle: "ZBrou Scripts",
  ogDescription: "Official FiveM resources by ZBrou.",
  twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories, error: categoriesError } = await useAsyncData(
  "categories",
  () => categoryStore.fetchCategories(),
  { default: () => [] },
);
const publishedCategories = computed(() => (categories.value ?? []).filter(
  (category) => Array.isArray(category.packages) && category.packages.length > 0,
));
const packageCount = computed(() => publishedCategories.value.reduce(
  (count, category) => count + category.packages.length, 0,
));
</script>

<style scoped lang="scss">
.zb-page { color: #f4f7ff; background: #080d16; overflow: hidden; }
.zb-container { width: min(100% - 64px, 1320px); margin-inline: auto; }
.zb-hero { position: relative; min-height: 720px; background: radial-gradient(ellipse 62% 85% at 85% 35%, rgba(14,88,216,.16), transparent 72%), #080d16; }
.zb-hero__grid { position: absolute; inset: 0; pointer-events: none; opacity: .65; background: linear-gradient(90deg, rgba(130,161,219,.045) 1px, transparent 1px), linear-gradient(0deg, rgba(130,161,219,.045) 1px, transparent 1px); background-size: 74px 74px; mask-image: linear-gradient(90deg, transparent, black 30%, black 85%, transparent); }
.zb-hero__content { position: relative; display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 36px; min-height: 645px; padding-block: 90px 72px; }
.zb-hero__copy { position: relative; z-index: 2; }
.zb-kicker, .zb-section-kicker, .zb-empty__eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .19em; color: #90baff; }
.zb-kicker { display: inline-flex; align-items: center; gap: 11px; }
.zb-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #4b9aff; box-shadow: 0 0 0 4px rgba(75,154,255,.12); }
.zb-kicker__sep { color: #42536e; }
.zb-hero h1 { margin: 30px 0 25px; font-size: clamp(50px, 5.3vw, 88px); font-weight: 800; line-height: 1.055; letter-spacing: -.066em; color: #f6f9ff; }
.zb-hero h1 span { background: linear-gradient(95deg, #a4c7ff 0%, #397fe9 50%, #155bd7 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.zb-hero__description { max-width: 540px; margin: 0; font-size: clamp(15px, 1.35vw, 18px); line-height: 1.75; color: #9aa9c0; }
.zb-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
.zb-button { display: inline-flex; align-items: center; justify-content: center; gap: 26px; min-height: 52px; padding: 0 22px; border: 1px solid #2a3c56; border-radius: 12px; color: #e7efff; font-size: 13px; font-weight: 750; text-decoration: none; transition: transform .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.zb-button:hover { transform: translateY(-3px); color: #fff; text-decoration: none; }
.zb-button--primary { border-color: #1766ee; background: #0e58d8; box-shadow: 0 12px 44px rgba(14,88,216,.22); }
.zb-button--primary:hover { background: #2674f0; box-shadow: 0 15px 50px rgba(14,88,216,.34); }
.zb-button--subtle { background: #121d2c; }
.zb-button--subtle:hover { border-color: #6a8fc7; background: #17263b; }
.zb-button span { font-size: 19px; font-weight: 400; }
.zb-hero__details { display: flex; gap: 26px; flex-wrap: wrap; margin-top: 52px; color: #7f91a9; font-size: 12px; }
.zb-hero__details span { display: inline-flex; align-items: center; gap: 10px; }
.zb-hero__details i { display: inline-block; width: 6px; height: 6px; border: 1px solid #6c9de4; transform: rotate(45deg); }
.zb-display { position: relative; width: 100%; max-width: 560px; height: 480px; margin-left: auto; display: flex; align-items: center; justify-content: center; perspective: 900px; }
.zb-display__glow { position: absolute; width: 75%; aspect-ratio: 1; border-radius: 50%; filter: blur(75px); background: rgba(17,87,221,.24); }
.zb-display__orbit { position: absolute; width: 92%; aspect-ratio: 1; border: 1px solid rgba(83,136,231,.16); border-radius: 50%; animation: zb-spin 28s linear infinite; }
.zb-display__orbit--one::before { content: ""; position: absolute; top: 9%; left: 14%; width: 8px; height: 8px; border-radius: 50%; background: #3d91ff; box-shadow: 0 0 22px #0e58d8; }
.zb-display__orbit--two { width: 68%; border-style: dashed; border-color: rgba(114,158,232,.16); animation-duration: 36s; animation-direction: reverse; }
.zb-display__card { position: relative; display: flex; flex-direction: column; width: min(82%, 390px); height: 365px; border: 1px solid rgba(115,160,236,.32); border-radius: 20px; background: linear-gradient(145deg, rgba(29,50,84,.91), rgba(9,18,34,.96) 68%); box-shadow: 0 38px 90px rgba(0,0,0,.5), 0 0 55px rgba(26,97,222,.13), inset 0 1px rgba(255,255,255,.09); transform: rotate(-6deg); animation: zb-float 7s ease-in-out infinite; backdrop-filter: blur(20px); overflow: hidden; }
.zb-display__card::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(125deg, rgba(255,255,255,.06), transparent 38%); }
.zb-display__topbar, .zb-display__bottom { display: flex; align-items: center; justify-content: space-between; height: 54px; padding: 0 22px; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 9px; letter-spacing: .13em; color: #7f99bf; border-bottom: 1px solid rgba(139,168,222,.13); }
.zb-display__bottom { height: 43px; border-top: 1px solid rgba(139,168,222,.13); border-bottom: 0; }
.zb-display__dots { display: flex; gap: 5px; }
.zb-display__dots b { width: 5px; height: 5px; border: 1px solid #6b88b5; border-radius: 50%; }
.zb-display__dots b:first-child { background: #387ff4; border: none; }
.zb-display__body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.zb-display__symbol { font-size: 110px; font-weight: 900; letter-spacing: -.09em; line-height: 1; text-shadow: 0 6px 55px rgba(48,123,243,.35); }
.zb-display__symbol span { color: #367de9; }
.zb-display__name { margin-top: 12px; font-size: 21px; font-weight: 800; letter-spacing: .42em; padding-left: .42em; }
.zb-display__name span { position: relative; top: -7px; margin-left: 2px; font-size: 8px; letter-spacing: 0; }
.zb-display__sub { margin-top: 7px; font-size: 9px; letter-spacing: .22em; color: #7f9ac4; }
.zb-display__bars { display: flex; align-items: flex-end; gap: 5px; height: 17px; margin-top: 23px; }
.zb-display__bars b { width: 17px; height: 4px; border-radius: 20px; background: #3372cc; }
.zb-display__bars b:nth-child(2) { height: 8px; }
.zb-display__bars b:nth-child(3) { height: 14px; background: #8ebaff; }
.zb-display__bars b:nth-child(4) { height: 8px; }
.zb-display__label { position: absolute; z-index: 3; padding: 13px 17px; border: 1px solid rgba(115,160,236,.2); border-radius: 10px; background: rgba(11,22,39,.9); box-shadow: 0 15px 50px rgba(0,0,0,.3); color: #b5c8e5; font-family: ui-monospace, Consolas, monospace; font-size: 10px; letter-spacing: .08em; }
.zb-display__label--top { top: 53px; right: 0; }
.zb-display__label--bottom { bottom: 37px; left: 0; }
.zb-display__label--bottom span { color: #66a0ff; padding-left: 12px; }
.zb-display__label-dot { display: inline-block; width: 6px; height: 6px; margin-right: 8px; border-radius: 50%; background: #5395fa; box-shadow: 0 0 10px #5395fa; }
.zb-hero__foot { position: relative; display: flex; justify-content: space-between; padding-block: 20px 25px; border-top: 1px solid rgba(126,157,206,.13); color: #5d7599; font-size: 10px; font-weight: 800; letter-spacing: .17em; }
.zb-hero__foot b { color: #a5c6ff; font-size: 17px; margin-left: 10px; }
.zb-catalog-section { position: relative; padding: 115px 0 145px; background: linear-gradient(180deg, #0d1522 0%, #080d16 100%); border-top: 1px solid #192a41; scroll-margin-top: 90px; }
.zb-section-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; margin-bottom: 56px; }
.zb-section-kicker { margin-bottom: 20px; }
.zb-section-heading h2 { margin: 0; font-size: clamp(38px, 4.5vw, 62px); font-weight: 800; letter-spacing: -.055em; line-height: 1.15; color: #f5f8ff; }
.zb-section-heading h2 span { color: #2678ed; }
.zb-section-heading p:not(.zb-section-kicker) { margin: 16px 0 0; color: #93a5bf; font-size: 15px; line-height: 1.6; }
.zb-catalog-count { padding: 10px 13px; border: 1px solid #284368; border-radius: 8px; font-family: ui-monospace, Consolas, monospace; color: #a9c9ff; font-size: 11px; letter-spacing: .09em; white-space: nowrap; }
.zb-categories { display: grid; gap: 64px; }
.zb-category__heading { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; border-bottom: 1px solid #27354b; padding-bottom: 18px; margin-bottom: 24px; }
.zb-category__heading h3 { margin: 0; font-size: 27px; font-weight: 750; letter-spacing: -.03em; color: #eaf1ff; }
.zb-category__heading span { font-size: 11px; color: #8299bc; letter-spacing: .13em; }
.zb-products { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.zb-products :deep(.package-card__inner) { border: 1px solid #2a3c56; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; overflow: hidden; }
.zb-products :deep(.package-card__inner:hover) { transform: translateY(-5px); border-color: #366bc0; box-shadow: 0 24px 45px rgba(0,0,0,.22); }
.zb-empty { display: grid; grid-template-columns: minmax(200px, 37%) 1fr; align-items: center; min-height: 350px; overflow: hidden; border: 1px solid #283b57; border-radius: 23px; background: radial-gradient(circle at 16% 55%, rgba(14,88,216,.19), transparent 34%), #101b2b; }
.zb-empty__shape { display: grid; place-items: center; height: 100%; border-right: 1px solid #273c5a; background: repeating-linear-gradient(0deg, transparent 0 35px, rgba(137,166,218,.035) 36px 37px); }
.zb-empty__shape span { font-weight: 900; font-size: clamp(110px, 17vw, 200px); letter-spacing: -.13em; line-height: 1; background: linear-gradient(155deg, #9cc3ff, #1456b4); -webkit-background-clip: text; background-clip: text; color: transparent; transform: rotate(-7deg); }
.zb-empty__copy { padding: 46px min(6vw, 65px); }
.zb-empty__copy h3 { margin: 17px 0; font-size: clamp(25px, 3vw, 39px); line-height: 1.2; letter-spacing: -.045em; color: #f4f7ff; }
.zb-empty__copy p { max-width: 480px; font-size: 15px; line-height: 1.75; color: #9aacc6; }
.zb-empty__copy a { display: inline-flex; gap: 19px; margin-top: 14px; font-size: 13px; font-weight: 750; color: #a8c7ff; text-decoration: none; }
.zb-empty__copy a:hover { color: white; }
@keyframes zb-spin { to { transform: rotate(360deg); } }
@keyframes zb-float { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-15px) rotate(-4deg); } }
@media (max-width: 1020px) {
  .zb-hero__content { grid-template-columns: 1fr; gap: 5px; padding-top: 84px; }
  .zb-hero__copy { max-width: 750px; }
  .zb-display { max-width: 540px; margin: 0 auto; height: 415px; }
  .zb-hero h1 { font-size: clamp(55px, 8vw, 80px); }
  .zb-products { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 600px) {
  .zb-container { width: min(100% - 34px, 1320px); }
  .zb-hero__content { padding-top: 66px; padding-bottom: 25px; }
  .zb-hero h1 { font-size: clamp(44px, 11vw, 65px); margin-top: 24px; }
  .zb-hero__description { font-size: 15px; }
  .zb-hero__details { gap: 15px; margin-top: 30px; font-size: 10px; }
  .zb-display { height: 320px; max-width: 370px; }
  .zb-display__card { height: 240px; width: 73%; border-radius: 14px; }
  .zb-display__topbar { height: 38px; }
  .zb-display__bottom { height: 29px; }
  .zb-display__symbol { font-size: 68px; }
  .zb-display__name { margin-top: 7px; font-size: 14px; }
  .zb-display__sub { font-size: 7px; }
  .zb-display__bars { margin-top: 10px; }
  .zb-display__label { font-size: 8px; padding: 9px; }
  .zb-display__label--top { right: -4px; top: 34px; }
  .zb-display__label--bottom { bottom: 21px; }
  .zb-catalog-section { padding: 76px 0 90px; }
  .zb-section-heading { align-items: flex-start; flex-direction: column; gap: 16px; margin-bottom: 35px; }
  .zb-products { grid-template-columns: 1fr; }
  .zb-empty { grid-template-columns: 1fr; }
  .zb-empty__shape { height: 180px; border-right: 0; border-bottom: 1px solid #273c5a; }
  .zb-empty__copy { padding: 31px 26px 39px; }
  .zb-hero__foot { font-size: 9px; }
}
@media (prefers-reduced-motion: reduce) {
  .zb-display__card, .zb-display__orbit { animation: none; }
  .zb-button, .zb-products :deep(.package-card__inner) { transition: none; }
}
</style>
