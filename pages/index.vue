<template>
  <main class="zb-store">
    <a class="zb-skip" href="#scripts">Ir a los scripts</a>
    <section id="inicio" ref="hero" class="zb-hero" aria-labelledby="page-title">
      <div class="zb-hero__light" aria-hidden="true"></div>
      <div class="zb-hero__content" :style="heroStyle">
        <span class="zb-eyebrow zb-hero__eyebrow"><i></i> RECURSOS PARA FIVEM</span>
        <img class="zb-hero__logo" :src="zbrouBrandImage" width="112" height="112" alt="Logotipo original de ZBrou" />
        <h1 id="page-title"><span>ZBROU</span><small>SCRIPTS</small></h1>
        <p class="zb-hero__tagline">Tu servidor. <span>Tu estilo.</span></p>
        <p class="zb-hero__copy">Dale a tu comunidad algo que se sienta diferente.</p>
        <div class="zb-hero__actions">
          <a class="zb-btn zb-btn--primary" href="#scripts"><StoreGlyph name="spark" :size="18" />Ver scripts<StoreGlyph name="arrow" :size="19" /></a>
          <a class="zb-btn zb-btn--glass" href="#comunidad"><StoreGlyph name="discord" :size="20" />La comunidad</a>
        </div>
        <div class="zb-hero__meta"><span><StoreGlyph name="code" :size="15" />ESX · QBCore · Qbox · Standalone</span><span><StoreGlyph name="shield" :size="15" />Checkout con Tebex</span></div>
      </div>
      <div class="zb-hero__side zb-hero__side--left" aria-hidden="true"><span class="zb-orbit-dot"></span> HECHO PARA TU SERVIDOR <small>01 / ZBROU COLLECTION</small></div>
      <div class="zb-hero__side zb-hero__side--right" aria-hidden="true"><StoreGlyph name="code" :size="18" /> TU PRÓXIMO SCRIPT.<small>HECHO POR ZBROU.</small></div>
      <a class="zb-scroll-cue" href="#scripts" aria-label="Bajar al catálogo"><span>EXPLORA LA COLECCIÓN</span><StoreGlyph name="down" :size="18" /></a>
    </section>

    <div class="zb-frameworks zb-shell"><span>UN MISMO ESTILO.<br /><strong>TU FRAMEWORK.</strong></span><div><b>ESX</b><b>QBCore</b><b>Qbox</b><b>Standalone</b><b class="zb-frameworks__fivem"><StoreGlyph name="fivem" :size="22" />FiveM</b></div></div>

    <section id="scripts" class="zb-catalog zb-shell" aria-labelledby="catalog-title">
      <div class="zb-section-heading"><span class="zb-eyebrow">LA COLECCIÓN</span><h2 id="catalog-title">Un nuevo nivel para <em>tu servidor.</em></h2><p>Explora los scripts. Encuentra el que encaja contigo.</p></div>
      <div class="zb-catalog__toolbar">
        <div class="zb-filters" role="group" aria-label="Filtrar por tipo">
          <button v-for="filter in filters" :key="filter" type="button" :class="{ active: selectedFilter === filter }" :aria-pressed="selectedFilter === filter" @click="selectedFilter = filter">{{ filter }}<small v-if="filter === 'Todos'">{{ products.length }}</small></button>
        </div>
        <label class="zb-search"><StoreGlyph name="search" :size="19" /><span class="sr-only">Buscar scripts</span><input v-model="query" type="search" aria-label="Buscar scripts" placeholder="Busca tu próximo script…" autocomplete="off" /></label>
        <label class="zb-sort"><span class="sr-only">Ordenar scripts</span><select v-model="sort" aria-label="Ordenar scripts"><option value="featured">Destacados</option><option value="name">Nombre: A–Z</option><option value="price">Precio: menor primero</option></select></label>
      </div>
      <p class="zb-catalog__count" role="status">{{ visibleProducts.length }} {{ visibleProducts.length === 1 ? 'script' : 'scripts' }}<span v-if="query"> para «{{ query }}»</span></p>
      <div v-if="visibleProducts.length" class="zb-product-grid" :class="{ 'zb-product-grid--single': visibleProducts.length === 1 }">
        <article v-for="product in visibleProducts" :key="product.id" class="zb-product" :class="{ 'zb-product--featured': product.featured }" @pointermove="moveCard" @pointerleave="resetCard">
          <div class="zb-product__art">
            <a class="zb-product__image-link" :href="product.href" target="_blank" rel="noopener noreferrer" :aria-label="'Ver detalles de ' + product.name + ' en una pestaña nueva'">
              <img :src="product.image" :alt="'Portada de ' + product.name" width="1536" height="1024" loading="lazy" />
              <span class="zb-product__badge">ZBROU ORIGINAL</span>
            </a>
            <button class="zb-product__open" type="button" :disabled="!product.pkg || busyId !== null" :aria-label="'Añadir ' + product.name + ' a la cesta'" :aria-busy="busyId === product.pkg?.id" :title="product.pkg ? 'Añadir a la cesta' : 'Próximamente en Tebex'" @click="addToBasket(product)"><StoreGlyph name="cart" :size="22" /></button>
          </div>
          <div class="zb-product__body">
            <div class="zb-product__category"><span>{{ product.category }}</span><span>FIVEM</span></div>
            <h3><a :href="product.href" target="_blank" rel="noopener noreferrer">{{ product.name }}</a></h3>
            <p>{{ product.description }}</p>
            <div class="zb-product__bottom"><div><small>{{ product.pkg ? 'DESDE' : 'DISPONIBILIDAD' }}</small><strong>{{ product.pkg ? $n(product.price, 'currency') : 'Próximamente' }}</strong></div><a class="zb-product__detail" :href="product.href" target="_blank" rel="noopener noreferrer" :aria-label="'Detalles de ' + product.name"><StoreGlyph name="arrow" :size="21" /></a></div>
            <button v-if="product.pkg" class="zb-btn zb-btn--primary zb-product__buy" :disabled="busyId !== null" type="button" @click="addToBasket(product)">{{ busyId === product.pkg.id ? 'Añadiendo…' : 'Añadir a la cesta' }}<StoreGlyph name="cart" :size="17" /></button>
            <a v-else class="zb-product__text-link zb-btn zb-btn--glass" :href="product.href" target="_blank" rel="noopener noreferrer">Ver detalles del producto<StoreGlyph name="external" :size="14" /></a>
            <p v-if="message && failedId === product.id" class="zb-product__status" role="status">{{ message }}</p>
          </div>
        </article>
      </div>
      <div v-else class="zb-empty"><StoreGlyph name="search" :size="32" /><h3>No hemos encontrado ese script.</h3><p>Prueba otro nombre o vuelve a ver la colección.</p><button class="zb-btn zb-btn--glass" type="button" @click="query = ''; selectedFilter = 'Todos'">Ver todos los scripts</button></div>
    </section>

    <StoreCommunity />

    <section class="zb-experience zb-shell" aria-labelledby="experience-title">
      <div class="zb-section-heading"><span class="zb-eyebrow">LA EXPERIENCIA ZBROU</span><h2 id="experience-title">Cuida cada <em>detalle.</em></h2></div>
      <div class="zb-bento">
        <a class="zb-bento__code" href="https://zbrouscripts.gitbook.io/zbrou-scripts" target="_blank" rel="noopener noreferrer"><StoreGlyph name="code" :size="27" /><h3>A tu manera.</h3><p>Configuración y documentación para darle tu propia identidad.</p><div class="zb-code-art" aria-hidden="true"><span><i>01</i><b>Config</b> = {</span><span><i>02</i> theme = <em>"your_style"</em>,</span><span><i>03</i> framework = <em>"auto"</em>,</span><span><i>04</i> possibilities = <b>∞</b></span><span><i>05</i>}</span></div><span class="zb-bento__link">Explorar documentación <StoreGlyph name="external" :size="17" /></span></a>
        <div class="zb-bento__checkout"><StoreGlyph name="shield" :size="27" /><h3>Checkout con Tebex.</h3><p>Compra a través de Tebex, con gestión de pedidos y soporte de pago.</p><div class="zb-security-art" aria-hidden="true"><StoreGlyph name="shield" :size="60" /><span></span><span></span><span></span></div><a href="https://checkout.tebex.io/terms" target="_blank" rel="noopener noreferrer" class="zb-bento__link">Condiciones de compra <StoreGlyph name="external" :size="17" /></a></div>
        <div class="zb-bento__framework"><StoreGlyph name="spark" :size="27" /><h3>Encaja contigo.</h3><p>Consulta la compatibilidad de cada producto antes de elegir.</p><div class="zb-framework-art" aria-hidden="true"><span>ESX</span><span>QB</span><span>Qbox</span><span>SA</span></div><a href="#scripts" class="zb-bento__link">Encuentra tu script <StoreGlyph name="arrow" :size="17" /></a></div>
      </div>
    </section>
    <section id="comunidad" class="zb-community-cta zb-shell" aria-labelledby="community-title">
      <div class="zb-community-cta__art" aria-hidden="true"><StoreGlyph name="discord" :size="85" /><span></span><span></span></div>
      <div><span class="zb-eyebrow">NOS VEMOS EN DISCORD</span><h2 id="community-title">Forma parte de <em>ZBrou Scripts.</em></h2><p>Novedades, scripts y un sitio para compartir lo que estás creando.</p></div>
      <a v-if="discordUrl" class="zb-btn zb-btn--primary" :href="discordUrl" target="_blank" rel="noopener noreferrer"><StoreGlyph name="discord" :size="21" />Entrar en Discord<StoreGlyph name="external" :size="18" /></a>
      <div v-else class="zb-community-cta__pending"><span class="zb-btn zb-btn--glass"><StoreGlyph name="discord" :size="21" />Discord · próximamente</span><small>Enlace de la comunidad pendiente.</small></div>
    </section>
    <div class="zb-motion-bar zb-shell"><span>ZBROU SCRIPTS <i>·</i> HECHO PARA TU SERVIDOR</span><button type="button" class="zb-motion-control" :aria-pressed="motionEnabled" @click="toggle"><StoreGlyph :name="motionEnabled ? 'pause' : 'play'" :size="15" />{{ motionEnabled ? 'Pausar animaciones' : 'Activar animaciones' }}</button></div>
    <NuxtPage />
  </main>
</template>
<script setup lang="ts">
import { zbrouBrandImage } from "~/utils/brandImages";
import { getCatalogProducts, type StoreProduct } from "~/utils/storeCatalog";
useSeoMeta({ title: "ZBrou Scripts · Tienda FiveM", description: "Recursos para FiveM con identidad ZBrou. Explora la colección y compra a través de Tebex." });
const config = useRuntimeConfig();
const discordUrl = computed(() => String(config.public.discordUrl || useAppConfig().discordUrl || ""));
const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const products = computed(() => getCatalogProducts(categories.value ?? []));
const query = ref(""), sort = ref("featured"), selectedFilter = ref("Todos");
const filters = computed(() => ["Todos", ...new Set(products.value.map(product => product.category))]);
const normalize = (value: string) => value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const visibleProducts = computed(() => {
  const items = products.value.filter(p => (selectedFilter.value === "Todos" || p.category === selectedFilter.value) && normalize(p.name + " " + p.category + " fivem").includes(normalize(query.value.trim())));
  return sort.value === "name" ? items.sort((a, b) => a.name.localeCompare(b.name, "es")) : sort.value === "price" ? items.sort((a, b) => a.price - b.price) : items;
});
const { busyId, addProduct } = useProductCart();
const message = ref(""), failedId = ref("");
async function addToBasket(product: StoreProduct) {
  if (!product.pkg) return;
  message.value = ""; failedId.value = product.id;
  try { await addProduct(product.pkg); }
  catch { message.value = "No se ha podido añadir el producto. Inténtalo de nuevo."; }
}
const { enabled: motionEnabled, toggle } = useStoreMotion();
const hero = ref<HTMLElement | null>(null), progress = ref(0);
const heroStyle = computed(() => ({ transform: "translateY(" + progress.value * 70 + "px) scale(" + (1 - progress.value * .08) + ")", opacity: 1 - progress.value * .8 }));
let frame = 0, cardFrame = 0;
let cardPointer: { node: HTMLElement; x: number; y: number } | null = null;
function updateScene() {
  frame = 0;
  if (!motionEnabled.value || !hero.value) return;
  const box = hero.value.getBoundingClientRect(); progress.value = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height)));
}
function scheduleScene() { if (!frame) frame = requestAnimationFrame(updateScene); }
function moveCard(event: PointerEvent) {
  if (!motionEnabled.value || event.pointerType === "touch") return;
  cardPointer = { node: event.currentTarget as HTMLElement, x: event.clientX, y: event.clientY };
  if (!cardFrame) cardFrame = requestAnimationFrame(updateCard);
}
function updateCard() {
  cardFrame = 0;
  if (!motionEnabled.value || !cardPointer) return;
  const { node, x, y } = cardPointer, box = node.getBoundingClientRect();
  node.style.setProperty("--shine-x", (x - box.left) + "px"); node.style.setProperty("--shine-y", (y - box.top) + "px");
  node.style.setProperty("--tilt-x", ((y - box.top) / box.height - .5) * -4 + "deg");
  node.style.setProperty("--tilt-y", ((x - box.left) / box.width - .5) * 5 + "deg");
}
function clearCard() {
  cancelAnimationFrame(cardFrame); cardFrame = 0;
  if (cardPointer) ["--shine-x", "--shine-y", "--tilt-x", "--tilt-y"].forEach(p => cardPointer!.node.style.removeProperty(p));
  cardPointer = null;
}
function resetCard() { clearCard(); }
watch(motionEnabled, enabled => { if (enabled) scheduleScene(); else { progress.value = 0; clearCard(); } });
onMounted(() => { window.addEventListener("scroll", scheduleScene, { passive: true }); window.addEventListener("resize", scheduleScene, { passive: true }); scheduleScene(); });
onUnmounted(() => { cancelAnimationFrame(frame); clearCard(); window.removeEventListener("scroll", scheduleScene); window.removeEventListener("resize", scheduleScene); });
</script>
