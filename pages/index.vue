<template>
  <main class="reference-store" :class="{ 'motion-active': motionEnabled && !reducedMotion }">
    <StoreStarfield :enabled="motionEnabled" />
    <a class="skip" href="#scripts">Ir a los scripts</a>
    <section id="inicio" ref="intro" class="scroll-intro" aria-labelledby="page-title" :style="sceneVariables">
      <div class="intro-sticky">
        <div class="hero-brand">
          <img class="hero-logo" :src="zbrouBrandImage" alt="Logotipo original de ZBrou" width="180" height="180" />
          <h1 id="page-title"><span class="brand-word">ZBROU</span><span class="brand-subtitle">SCRIPTS</span></h1>
        </div>
        <div class="intro-handoff" aria-hidden="true"><span>Scripts</span><i></i></div>
        <a class="hero-link glass" href="#scripts" :tabindex="progress > .22 ? -1 : 0" :style="{ pointerEvents: progress > .22 ? 'none' : 'auto' }">
          Ver scripts
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M10 3v14m-5-5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
        <div class="hero-rule" aria-hidden="true"><span></span></div>
        <div class="intro-progress" aria-hidden="true"><span></span></div>
      </div>
    </section>
    <section id="scripts" class="catalog" aria-labelledby="catalog-title">
      <div class="catalog-inner wrap">
        <div class="catalog-heading"><h2 id="catalog-title">Scripts</h2></div>
        <div class="filter-row">
          <button class="all glass" type="button" :aria-pressed="query === ''" @click="query = ''">Todos</button>
          <label class="search glass">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m16 16 5 5" stroke="currentColor" stroke-width="1.5"/></svg>
            <span class="sr-only">Buscar scripts</span><input v-model="query" type="search" placeholder="Buscar scripts" autocomplete="off" />
          </label>
        </div>
        <div v-if="productVisible" class="catalog-grid">
          <article class="catalog-card glass" @pointermove="moveGlass" @pointerleave="resetGlass">
            <button class="product-art" type="button" aria-label="Ver los detalles de PhraseKill" @click="openDetails">
              <img :src="phrasekillCoverImage" alt="Portada original de PhraseKill" width="1536" height="1024" loading="lazy" /><span class="art-view" aria-hidden="true">+</span>
            </button>
            <div class="card-info">
              <div class="card-title"><h3><button type="button" @click="openDetails">PhraseKill</button></h3><span>FiveM</span></div>
              <p class="card-price">{{ phrasekillPackage ? $n(phrasekillPackage.base_price, 'currency') : 'Próximamente' }}</p>
              <div class="card-actions">
                <button class="primary" type="button" :disabled="!phrasekillPackage || loading" @click="addToBasket">{{ loading ? 'Añadiendo…' : 'Añadir a la cesta' }}</button>
                <button class="quiet" type="button" @click="openDetails">Ver detalles</button>
              </div>
              <p v-if="message" class="card-status" role="status">{{ message }}</p>
            </div>
          </article>
        </div>
        <div v-else class="empty" role="status"><p>No hay scripts con ese nombre.</p><button class="quiet" type="button" @click="query = ''">Ver todos los scripts</button></div>
      </div>
    </section>
    <dialog ref="details" class="product-dialog" aria-label="Detalles de PhraseKill" @close="closeDetails" @click="clickBackdrop">
      <button class="detail-close" type="button" aria-label="Cerrar detalles" @click="details?.close()">×</button>
      <PhrasekillDetails @added="details?.close()" />
    </dialog>
    <div class="motion-row wrap"><button class="motion-control" type="button" :aria-pressed="motionEnabled" @click="toggleMotion"><span aria-hidden="true">{{ motionEnabled ? 'Ⅱ' : '▷' }}</span> {{ motionEnabled ? 'Pausar animación' : 'Activar animación' }}</button></div>
  </main>
</template>
<script setup lang="ts">
import type { CSSProperties } from "vue";
import type { Package } from "~/types";
import { zbrouBrandImage, phrasekillCoverImage } from "~/utils/brandImages";
useSeoMeta({ title: "ZBrou Scripts · Tienda FiveM", description: "Tienda oficial ZBrou Scripts. PhraseKill para FiveM. Consulta el producto y su disponibilidad en Tebex." });
const categoryStore = useCategoryStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
const details = ref<HTMLDialogElement | null>(null);
let returnFocus: HTMLElement | null = null;
let previousOverflow = "";
let detailsOpen = false;
function openDetails() {
  returnFocus = document.activeElement as HTMLElement;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  detailsOpen = true;
  details.value?.showModal();
}
function closeDetails() {
  if (!detailsOpen) return;
  detailsOpen = false;
  document.body.style.overflow = previousOverflow;
  returnFocus?.focus();
}
function clickBackdrop(event: MouseEvent) {
  if (event.target !== details.value) return;
  const box = details.value!.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) details.value?.close();
}
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const phrasekillPackage = computed<Package | undefined>(() => (categories.value ?? []).flatMap(category => category.packages ?? []).find(item => item.id === 7706999 || /phrase\s*kill/i.test(item.name)));
const query = ref("");
const productVisible = computed(() => "phrasekill phrase kill fivem frases".includes(query.value.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
const loading = ref(false);
const message = ref("");
async function addToBasket() {
  if (!phrasekillPackage.value || loading.value) return;
  loading.value = true; message.value = "";
  try { const basket = await basketStore.addPackageToBasket(phrasekillPackage.value.id, 1); if (basket) uiStore.toggleItem("cart-sidebar"); }
  catch { message.value = "No se ha podido añadir el producto. Inténtalo de nuevo."; }
  finally { loading.value = false; }
}
const intro = ref<HTMLElement | null>(null);
const motionEnabled = ref(true);
const reducedMotion = ref(false);
const progress = ref(0);
const mobile = ref(false);
const segment = (start: number, duration: number) => Math.max(0, Math.min(1, (progress.value - start) / duration));
const sceneVariables = computed(() => {
  const brand = segment(.08, .42), objects = segment(.02, .54), orbit = segment(.04, .64), handoff = segment(.46, .28), exit = segment(.77, .22);
  return {
    '--brand-y': `${brand * brand * (mobile.value ? -90 : -130)}px`, '--brand-scale': String(1 - brand * .18), '--brand-opacity': String(1 - brand * brand),
    '--cta-opacity': String(1 - segment(0, .2)), '--cta-y': `${segment(0, .2) * 20}px`,
    '--object-x': `${objects * (mobile.value ? 55 : 150)}px`, '--object-y': `${objects * -90}px`, '--object-opacity': String(.58 - objects * .43),
    '--orbit-back-scale': String(1.14 + orbit * (mobile.value ? .14 : .38)), '--orbit-front-scale': String(.95 + orbit * .45), '--orbit-rotation': `${orbit * 45}deg`, '--orbit-opacity': String(.65 - orbit * .5),
    '--field-opacity': String(1 - segment(.64, .22)), '--handoff-opacity': String(handoff * (1 - exit)), '--handoff-y': `${65 * (1 - handoff) - exit * 45}px`, '--handoff-scale': String(.84 + handoff * .16), '--progress': String(progress.value),
  } as CSSProperties;
});
let frame = 0;
let media: MediaQueryList;
function updateScene() {
  frame = 0; mobile.value = window.innerWidth <= 700;
  if (!intro.value || !motionEnabled.value || reducedMotion.value) { progress.value = 0; return; }
  const box = intro.value.getBoundingClientRect();
  progress.value = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - window.innerHeight)));
}
function scheduleScene() { if (!frame) frame = requestAnimationFrame(updateScene); }
function syncReduced() { reducedMotion.value = media.matches; scheduleScene(); }
function toggleMotion() {
  motionEnabled.value = !motionEnabled.value;
  try { localStorage.setItem("zbrou-motion", String(motionEnabled.value)); } catch {}
  nextTick(scheduleScene);
}
function moveGlass(event: PointerEvent) {
  if (event.pointerType === "touch" || !motionEnabled.value || reducedMotion.value) return;
  const node = event.currentTarget as HTMLElement, box = node.getBoundingClientRect();
  node.style.setProperty("--glass-x", `${event.clientX - box.left}px`); node.style.setProperty("--glass-y", `${event.clientY - box.top}px`);
}
function resetGlass(event: PointerEvent) { const node = event.currentTarget as HTMLElement; node.style.removeProperty("--glass-x"); node.style.removeProperty("--glass-y"); }
onMounted(() => {
  media = window.matchMedia("(prefers-reduced-motion: reduce)"); syncReduced();
  try { motionEnabled.value = localStorage.getItem("zbrou-motion") !== "false"; } catch {}
  media.addEventListener("change", syncReduced);
  window.addEventListener("scroll", scheduleScene, { passive: true }); window.addEventListener("resize", scheduleScene, { passive: true }); nextTick(scheduleScene);
});
onUnmounted(() => { if(detailsOpen) closeDetails(); cancelAnimationFrame(frame); media?.removeEventListener("change", syncReduced); window.removeEventListener("scroll", scheduleScene); window.removeEventListener("resize", scheduleScene); });
</script>
<style scoped src="~/assets/styles/reference-store.css"></style>
