<template>
  <main class="store-home">
    <section id="inicio" ref="hero" class="store-hero" :style="{ '--shift': String(scrollProgress) }">
      <div class="store-hero__ambience" aria-hidden="true"></div>
      <div class="store-hero__content">
        <div class="store-hero__identity">
          <img class="store-hero__mark" src="/zbrou-original-logo.svg" width="110" height="110" alt="Logotipo de ZBrou" />
          <span>TIENDA OFICIAL · FIVEM</span>
        </div>
        <h1>ZBROU <span>SCRIPTS</span></h1>
        <p>Recursos para FiveM. Diseñados con detalle.</p>
        <div class="store-hero__actions">
          <a href="#scripts" class="store-btn store-btn--primary">Explorar scripts <span aria-hidden="true">↗</span></a>
          <a href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer" class="store-btn store-btn--secondary">Documentación <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <a href="#scripts" class="store-hero__scroll">DESLIZA PARA EXPLORAR <span aria-hidden="true">↓</span></a>
    </section>

    <section id="scripts" class="store-catalog">
      <div class="store-wrap">
        <div class="store-section-title">
          <div>
            <span>CATÁLOGO</span>
            <h2>Nuestros scripts<span class="store-dot">.</span></h2>
          </div>
          <small>{{ totalPackages ? totalPackages + (totalPackages === 1 ? ' recurso publicado' : ' recursos publicados') : 'Catálogo en preparación' }}</small>
        </div>

        <div class="store-grid">
          <article class="store-product">
            <NuxtLink to="/script/phrasekill" class="store-product__image" aria-label="Ver los detalles de PhraseKill">
              <img :src="phrasekillPackage?.image || '/phrasekill-original-cover.svg'" alt="PhraseKill para FiveM" loading="lazy" />
              <span class="store-product__tag">FiveM</span>
            </NuxtLink>
            <div class="store-product__body">
              <div class="store-product__heading">
                <h3><NuxtLink to="/script/phrasekill">PhraseKill</NuxtLink></h3>
                <span v-if="phrasekillPackage" class="store-product__price">{{ $n(phrasekillPackage.base_price, 'currency') }}</span>
                <span v-else class="store-product__pending">Próximamente</span>
              </div>
              <p>Mensajes de eliminación personalizados.</p>
              <NuxtLink to="/script/phrasekill" class="store-product__detail">Ver producto <span aria-hidden="true">↗</span></NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="store-activity" aria-labelledby="activity-heading">
      <div class="store-wrap store-activity__row">
        <div class="store-activity__intro">
          <span>COMUNIDAD</span>
          <h2 id="activity-heading">ZBrou en servidores reales</h2>
          <p>Los datos aparecerán cuando conectemos servidores que acepten compartir su actividad.</p>
        </div>
        <div class="store-activity__numbers">
          <div><strong>{{ formatMetric(usage?.serversActive) }}</strong><span>Servidores activos</span></div>
          <div><strong>{{ formatMetric(usage?.playersOnline) }}</strong><span>Jugadores conectados</span></div>
        </div>
      </div>
    </section>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import type { Package } from "~/types";
useSeoMeta({
  title: "ZBrou Scripts · Tienda FiveM",
  description: "Tienda oficial ZBrou Scripts. Recursos para servidores FiveM: PhraseKill y próximos lanzamientos. Compra segura con Tebex.",
});
useHead({link:[{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Oxanium:wght@400;500;600;700;800&display=swap"}]});
const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const products = computed<Package[]>(() => (categories.value ?? []).flatMap((cat) => cat.packages ?? []));
const totalPackages = computed(() => products.value.length);
const phrasekillPackage = computed(() => products.value.find((p) => p.id === 7706999 || /phrase\s*kill/i.test(p.name)));
interface Usage { connected: boolean; serversActive: number | null; playersOnline: number | null; installations: number | null; updatedAt: string | null }
const { data: usage } = await useFetch<Usage>("/api/usage");
const formatMetric = (value: number | null | undefined) => typeof value === "number" ? value.toLocaleString("es-ES") : "—";
const hero = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
let frame = 0;
function updateScroll() {
  frame = 0;
  if (!hero.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = hero.value.getBoundingClientRect();
  scrollProgress.value = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
}
function onScroll() { if (!frame) frame = window.requestAnimationFrame(updateScroll); }
onMounted(() => { window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); onScroll(); });
onUnmounted(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); });
</script>

<style scoped>
.store-home{background:#000;color:#f4f6fa;font-family:Manrope,Arial,sans-serif;min-width:0;overflow:clip}
.store-wrap{width:min(1200px,calc(100% - 40px));margin:auto}
.store-hero{min-height:750px;min-height:calc(100svh - 40px);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;isolation:isolate;overflow:hidden;padding:105px 20px 95px;background:#000}
.store-hero__ambience{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse 55% 48% at 50% 45%,#24436a2b,transparent 85%),radial-gradient(circle at 82% 32%,#507fb013,transparent 37%);transform:translateY(calc(var(--shift)*-70px)) scale(calc(1 + var(--shift)*.25))}
.store-hero__ambience:after{content:"";position:absolute;inset:0;opacity:.15;background-image:radial-gradient(#f2f7ff 0.7px,transparent .9px);background-size:67px 62px;mask-image:linear-gradient(transparent,#000 30%,#000 75%,transparent)}
.store-hero__content{text-align:center;display:flex;align-items:center;flex-direction:column;position:relative;z-index:1;transform:translateY(calc(var(--shift)*-100px)) scale(calc(1 - var(--shift)*.07));opacity:calc(1 - var(--shift)*.75);will-change:transform,opacity}
.store-hero__identity{display:flex;flex-direction:column;align-items:center;gap:16px}
.store-hero__mark{width:110px;height:110px;object-fit:contain;filter:drop-shadow(0 12px 22px #b9dcff16)}
.store-hero__identity>span{font:600 11px Oxanium,Arial,sans-serif;letter-spacing:.29em;color:#aab8ca}
.store-hero h1{font:700 clamp(58px,9vw,120px)/.95 Oxanium,Arial,sans-serif;letter-spacing:.035em;margin:30px 0 10px;color:#fff}
.store-hero h1 span{color:#b9cbe3}
.store-hero p{margin:18px 0 0;color:#a8b5c7;font-size:clamp(14px,1.4vw,17px);letter-spacing:.01em}
.store-hero__actions{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:37px}
.store-btn{min-height:48px;min-width:165px;padding:0 19px;display:inline-flex;align-items:center;justify-content:center;gap:24px;font-weight:700;font-size:13px;text-decoration:none;border-radius:11px;border:1px solid #ffffff2f;transition:background .2s,border-color .2s,transform .2s}
.store-btn:hover{text-decoration:none;transform:translateY(-2px)}
.store-btn--primary{background:#c3d4e9;color:#132438}.store-btn--primary:hover{background:#e7f0fc;color:#132438}
.store-btn--secondary{background:#1b2029;color:#e6ecf6}.store-btn--secondary:hover{background:#272e3a;color:white}
.store-hero__scroll{position:absolute;bottom:35px;color:#7d90a6;font:600 10px Oxanium,sans-serif;letter-spacing:.17em;text-decoration:none}
.store-hero__scroll span{margin-left:15px;color:#bdcee4;font-size:18px}
.store-hero__scroll:hover{color:#dae5f3}
.store-catalog{scroll-margin-top:95px;padding:78px 0 110px;background:linear-gradient(#07090c,#0c1017);border-top:1px solid #ffffff13}
.store-section-title{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:27px}
.store-section-title>div>span,.store-activity__intro>span{font:600 11px Oxanium,Arial,sans-serif;letter-spacing:.2em;color:#9bb8d8}
.store-section-title h2{font:700 clamp(30px,4vw,44px)/1.15 Oxanium,sans-serif;letter-spacing:-.02em;margin:10px 0 0}
.store-dot{color:#a9c4e5}
.store-section-title small{font-size:12px;color:#8b9bae;padding-bottom:5px}
.store-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr));gap:22px}
.store-product{max-width:355px;border:1px solid #ffffff2a;border-radius:23px;background:linear-gradient(145deg,#182330,#0c131c);overflow:hidden;box-shadow:inset 0 1px #ffffff13;transition:transform .25s,border-color .25s}
.store-product:hover{transform:translateY(-5px);border-color:#9bb8df77}
.store-product__image{position:relative;height:212px;display:block;overflow:hidden;background:#0c131d}
.store-product__image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
.store-product:hover img{transform:scale(1.055)}
.store-product__tag{position:absolute;right:12px;top:12px;color:#ebf3ff;background:#182536dc;border:1px solid #ffffff47;padding:6px 10px;border-radius:7px;font:600 10px Oxanium,Arial,sans-serif}
.store-product__body{padding:22px}
.store-product__heading{display:flex;align-items:center;justify-content:space-between;gap:15px}
.store-product h3{font:700 23px Oxanium,sans-serif;margin:0}
.store-product h3 a{color:#fff;text-decoration:none}
.store-product__price{color:#e3ecf8;font-size:16px;font-weight:700}
.store-product__pending{color:#aab8ce;font-size:12px}
.store-product__body p{color:#97a7bc;font-size:12px;margin:10px 0 20px}
.store-product__detail{display:flex;justify-content:space-between;gap:15px;align-items:center;min-height:40px;border-top:1px solid #ffffff23;padding-top:15px;color:#d9e5f5;text-decoration:none;font-size:12px;font-weight:700}
.store-product__detail:hover{color:#fff}
.store-activity{padding:36px 0 47px;background:#0e1219;border-top:1px solid #ffffff19}
.store-activity__row{display:flex;justify-content:space-between;align-items:center;gap:35px}
.store-activity__intro h2{font:600 21px Oxanium,sans-serif;margin:9px 0}
.store-activity__intro p{color:#8293a8;font-size:12px;margin:0;max-width:420px;line-height:1.6}
.store-activity__numbers{display:flex;gap:0}
.store-activity__numbers>div{padding:6px 32px;border-left:1px solid #ffffff24;text-align:center}
.store-activity__numbers strong{display:block;font:700 30px Oxanium,Arial,sans-serif;color:#d5e4f8}
.store-activity__numbers span{display:block;color:#8d9fb6;font-size:11px;margin-top:4px}
@media(max-width:800px){.store-hero{min-height:700px}.store-hero h1{font-size:clamp(52px,10vw,83px)}.store-activity__row{flex-direction:column;align-items:flex-start}.store-activity__numbers{width:100%}.store-activity__numbers>div{flex:1;text-align:left;padding:6px 20px}.store-activity__numbers>div:first-child{padding-left:0;border-left:0}}
@media(max-width:480px){.store-hero{min-height:650px;padding:85px 18px}.store-hero__mark{width:90px;height:90px}.store-hero h1{font-size:clamp(41px,10.5vw,60px);white-space:nowrap}.store-hero p{font-size:13px}.store-hero__identity>span{font-size:9px}.store-hero__actions{width:100%;gap:10px}.store-btn{flex:1;min-width:0;font-size:11px;gap:10px;padding:0 10px}.store-section-title{align-items:flex-start;flex-direction:column}.store-catalog{padding:58px 0 78px}.store-product{max-width:100%}.store-activity{padding:30px 0}}
@media(prefers-reduced-motion:reduce){.store-hero__content,.store-hero__ambience{transform:none!important;opacity:1!important;will-change:auto}.store-btn,.store-product,.store-product img{transition:none!important}}
</style>