<template>
  <main class="zb-store">
    <!-- Ambient layers live behind the actual store, not as blocking overlays. -->
    <div class="zb-ambient" aria-hidden="true">
      <div class="zb-ambient__glow zb-ambient__glow--one"></div>
      <div class="zb-ambient__glow zb-ambient__glow--two"></div>
      <div class="zb-ambient__grid"></div>
      <span v-for="s in particles" :key="s.id" class="zb-ambient__star" :style="{ '--x': s.x + '%', '--y': s.y + '%', '--size': s.size + 'px', '--delay': s.delay + 's', '--duration': s.duration + 's' }"></span>
      <i class="zb-ambient__meteor zb-ambient__meteor--one"></i>
      <i class="zb-ambient__meteor zb-ambient__meteor--two"></i>
      <i class="zb-ambient__meteor zb-ambient__meteor--three"></i>
    </div>

    <section
      id="inicio"
      ref="hero"
      class="zb-intro"
      :style="{ '--progress': String(heroProgress), '--mx': pointer.x + 'px', '--my': pointer.y + 'px' }"
      @pointermove="movePointer"
      @pointerleave="resetPointer"
    >
      <div class="zb-shell zb-intro__layout">
        <div class="zb-intro__copy">
          <div class="zb-overline zb-intro__overline"><span class="zb-live-dot"></span> ZBROU / TIENDA OFICIAL <span class="zb-overline__slash">//</span> FIVEM</div>
          <h1>La diferencia<br />está en los <span class="zb-gradient-text">detalles.</span></h1>
          <p>Scripts que hacen que tu servidor se sienta único. Funcionales, personalizables y con una estética que se nota.</p>
          <div class="zb-intro__buttons">
            <a href="#scripts" class="zb-action zb-action--primary">
              Explorar scripts <span class="zb-action__arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://zbrouscripts.gitbook.io/zbrou-scripts" class="zb-action zb-action--secondary" target="_blank" rel="noopener noreferrer">
              Documentación <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="zb-intro__mini">
            <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4zM9 12l2 2 4-4"/></svg> Checkout con Tebex</span>
            <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17l7-10 4 6 3-4 3 8z"/></svg> Hecho para FiveM</span>
          </div>
        </div>

        <div class="zb-intro__visual" aria-label="Vista conceptual de la tienda de ZBrou">
          <div class="zb-orbit zb-orbit--first"></div>
          <div class="zb-orbit zb-orbit--second"></div>
          <div class="zb-intro__light"></div>
          <div class="zb-visual-card" :style="{ transform: 'perspective(1000px) rotateY(' + (pointer.x / 32 - 7) + 'deg) rotateX(' + (-pointer.y / 38 + 3) + 'deg) translateY(' + (-heroProgress * 36) + 'px)' }">
            <div class="zb-visual-card__top"><span><i></i> ZBROU / COLLECTION</span><span>001</span></div>
            <img :src="phrasekillCoverImage" alt="Portada de PhraseKill" class="zb-visual-card__image" />
            <div class="zb-visual-card__bottom"><span>PHRASEKILL</span><span>FIVEM RESOURCE ↗</span></div>
          </div>
          <div class="zb-float zb-float--upper"><span class="zb-float__icon">✦</span><span>Personaliza<br /><b>cada detalle</b></span></div>
          <div class="zb-float zb-float--lower"><span class="zb-float__dot"></span><span>NUEVO RECURSO<br /><b>PhraseKill</b></span></div>
        </div>
      </div>
      <a href="#scripts" class="zb-intro__scroll">DESCUBRE LA COLECCIÓN <span aria-hidden="true">↓</span></a>
    </section>

    <div class="zb-ticker" aria-hidden="true">
      <div class="zb-ticker__track">
        <span v-for="n in 2" :key="n" class="zb-ticker__set">
          <b>ZBROU SCRIPTS</b><i>✦</i><b>FIVEM</b><i>✦</i><b>RECURSOS CON PERSONALIDAD</b><i>✦</i><b>DISEÑADOS AL DETALLE</b><i>✦</i>
        </span>
      </div>
    </div>

    <section id="scripts" class="zb-section zb-catalog">
      <div class="zb-shell">
        <div class="zb-heading zb-appear">
          <div><span class="zb-kicker">01 / LA COLECCIÓN</span><h2>Algo más que <em>scripts.</em></h2></div>
          <span class="zb-heading__aside">{{ phrasekillPackage ? '1 PRODUCTO DISPONIBLE' : 'PRIMER LANZAMIENTO' }}</span>
        </div>

        <article class="zb-product zb-appear" @pointermove="moveProductPointer" @pointerleave="resetProductPointer" :style="{ '--shine-x': shine.x + '%', '--shine-y': shine.y + '%' }">
          <NuxtLink class="zb-product__art" to="/script/phrasekill" aria-label="Ver ficha de PhraseKill">
            <img :src="phrasekillCoverImage" alt="Arte de PhraseKill, script de mensajes de eliminación para FiveM" loading="lazy" />
            <div class="zb-product__art-halo" aria-hidden="true"></div>
            <span class="zb-product__top-tag"><span class="zb-live-dot"></span> DESTACADO</span>
            <span class="zb-product__image-label">ZBROU / 001</span>
          </NuxtLink>
          <div class="zb-product__info">
            <div class="zb-product__category"><span>FIVEM RESOURCE</span><span class="zb-product__divider"></span><span>SCRIPT #001</span></div>
            <h3>PhraseKill<span>.</span></h3>
            <p>Haz que cada eliminación tenga tu sello. Configura frases, estilos y efectos desde un único script.</p>
            <div class="zb-product__features">
              <span><i>✓</i> Frases personalizadas</span>
              <span><i>✓</i> Efectos visuales</span>
              <span><i>✓</i> Configuración a tu gusto</span>
            </div>
            <div class="zb-product__purchase">
              <div><small>PRECIO EN TEBEX</small><strong>{{ phrasekillPackage ? $n(phrasekillPackage.base_price, 'currency') : 'Próximamente' }}</strong></div>
              <NuxtLink to="/script/phrasekill" class="zb-action zb-action--primary">Ver producto <span class="zb-action__arrow" aria-hidden="true">↗</span></NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section ref="experience" class="zb-experience" :style="{ '--scene': String(experienceProgress) }" aria-labelledby="experience-title">
      <div class="zb-experience__sticky">
        <div class="zb-shell zb-experience__layout">
          <div class="zb-experience__copy">
            <span class="zb-kicker">02 / EN ACCIÓN</span>
            <h2 id="experience-title">Una frase.<br /><span>Todo el impacto.</span></h2>
            <p>Una pequeña muestra visual de la personalización que puedes conseguir con PhraseKill.</p>
            <NuxtLink to="/script/phrasekill" class="zb-text-link">Descubre PhraseKill <span aria-hidden="true">↗</span></NuxtLink>
            <div class="zb-progress" aria-hidden="true"><span :style="{ width: Math.round(experienceProgress * 100) + '%' }"></span></div>
            <div class="zb-experience__index">0{{ activePhrase + 1 }} <i>/</i> 03</div>
          </div>
          <div class="zb-experience__scene">
            <div class="zb-scene__glow"></div>
            <div class="zb-scene__frame">
              <div class="zb-scene__frame-top"><span><i class="zb-live-dot"></i> DEMO VISUAL</span><span>PK / FX</span></div>
              <div class="zb-scene__reticle" aria-hidden="true"></div>
              <div class="zb-scene__message" :key="activePhrase">
                <span class="zb-scene__badge">PHRASEKILL</span>
                <strong>{{ phrases[activePhrase].title }}</strong>
                <small>{{ phrases[activePhrase].caption }}</small>
              </div>
              <div class="zb-scene__frame-bottom"><span>PERSONALIZA TU ESTILO</span><span>ELIMINACIÓN +1</span></div>
            </div>
            <div class="zb-scene__satellite zb-scene__satellite--a">✦ <span>COLOR</span></div>
            <div class="zb-scene__satellite zb-scene__satellite--b">↗ <span>ANIMACIÓN</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="comunidad" class="zb-section zb-community">
      <div class="zb-shell">
        <div class="zb-community__panel zb-appear">
          <div class="zb-community__heading">
            <div><span class="zb-kicker">03 / COMUNIDAD</span><h2>Hecho para servidores<br />que quieren destacar.</h2></div>
            <p>La actividad aparecerá aquí cuando conectemos datos reales de los servidores que decidan compartirlos.</p>
          </div>
          <div class="zb-community__stats">
            <div><span>SERVIDORES ACTIVOS</span><strong>{{ formatMetric(usage?.serversActive) }}</strong><small>{{ usage?.connected ? 'Datos conectados' : 'Pendiente de conectar' }}</small></div>
            <div><span>JUGADORES EN LÍNEA</span><strong>{{ formatMetric(usage?.playersOnline) }}</strong><small>{{ usage?.connected ? 'Datos conectados' : 'Pendiente de conectar' }}</small></div>
            <div><span>INSTALACIONES</span><strong>{{ formatMetric(usage?.installations) }}</strong><small>{{ usage?.connected ? 'Datos conectados' : 'Pendiente de conectar' }}</small></div>
          </div>
        </div>
      </div>
    </section>

    <section class="zb-ending zb-section">
      <div class="zb-shell zb-ending__content zb-appear">
        <img :src="zbrouBrandImage" alt="" width="64" height="64" />
        <span class="zb-kicker">ZBROU SCRIPTS</span>
        <h2>Los detalles lo<br /><em>cambian todo.</em></h2>
        <NuxtLink class="zb-action zb-action--primary" to="/#scripts">Explorar la tienda <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Package } from "~/types";
import { zbrouBrandImage, phrasekillCoverImage } from "~/utils/brandImages";

useSeoMeta({
  title: "ZBrou Scripts · Tienda para FiveM",
  description: "Tienda oficial ZBrou Scripts: recursos para FiveM, PhraseKill y futuros lanzamientos. Compras a través de Tebex.",
});
useHead({ link: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Oxanium:wght@400;500;600;700;800&display=swap" }] });

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const products = computed<Package[]>(() => (categories.value ?? []).flatMap((category) => category.packages ?? []));
const phrasekillPackage = computed(() => products.value.find((item) => item.id === 7706999 || /phrase\s*kill/i.test(item.name)));

interface Usage { connected: boolean; serversActive: number | null; playersOnline: number | null; installations: number | null; updatedAt: string | null }
const { data: usage } = await useFetch<Usage>("/api/usage");
const formatMetric = (value: number | null | undefined) => typeof value === "number" ? value.toLocaleString("es-ES") : "—";

const particles = Array.from({ length: 36 }, (_, id) => ({
  id,
  x: (id * 37 + 17) % 100,
  y: (id * 71 + 9) % 100,
  size: 1 + (id % 3) * .5,
  delay: -(id * .71) % 13,
  duration: 9 + (id % 9) * 1.5,
}));

const hero = ref<HTMLElement | null>(null);
const experience = ref<HTMLElement | null>(null);
const heroProgress = ref(0);
const experienceProgress = ref(0);
const pointer = reactive({ x: 0, y: 0 });
const shine = reactive({ x: 50, y: 50 });

const phrases = [
  { title: "ELIMINADO", caption: "Esta partida lleva tu firma" },
  { title: "BUENA PUNTERÍA", caption: "El siguiente será más difícil" },
  { title: "HASTA LA PRÓXIMA", caption: "Y otra más para la colección" },
];
const activePhrase = computed(() => Math.min(2, Math.floor(experienceProgress.value * 2.99)));

const movePointer = (event: PointerEvent) => {
  if (event.pointerType === "touch" || !hero.value) return;
  const rect = hero.value.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width) - .5) * 2 * 65;
  pointer.y = ((event.clientY - rect.top) / Math.max(1, rect.height) - .5) * 2 * 65;
};
const resetPointer = () => { pointer.x = 0; pointer.y = 0; };
const moveProductPointer = (event: PointerEvent) => {
  if (event.pointerType === "touch") return;
  const node = event.currentTarget as HTMLElement;
  const box = node.getBoundingClientRect();
  shine.x = Math.round((event.clientX - box.left) / Math.max(1, box.width) * 100);
  shine.y = Math.round((event.clientY - box.top) / Math.max(1, box.height) * 100);
};
const resetProductPointer = () => { shine.x = 50; shine.y = 50; };

let animationFrame = 0;
let observer: IntersectionObserver | null = null;
function calculate() {
  animationFrame = 0;
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroProgress.value = 0;
    experienceProgress.value = .5;
    return;
  }
  if (hero.value) {
    const box = hero.value.getBoundingClientRect();
    heroProgress.value = Math.max(0, Math.min(1, -box.top / Math.max(box.height, 1)));
  }
  if (experience.value) {
    const box = experience.value.getBoundingClientRect();
    experienceProgress.value = Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - window.innerHeight)));
  }
}
function requestCalculate() {
  if (!animationFrame) animationFrame = requestAnimationFrame(calculate);
}
onMounted(() => {
  window.addEventListener("scroll", requestCalculate, { passive: true });
  window.addEventListener("resize", requestCalculate, { passive: true });
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("zb-visible"); });
  }, { threshold: .13 });
  document.querySelectorAll(".zb-appear").forEach((element) => observer?.observe(element));
  requestCalculate();
});
onUnmounted(() => {
  window.removeEventListener("scroll", requestCalculate);
  window.removeEventListener("resize", requestCalculate);
  observer?.disconnect();
  if (animationFrame) cancelAnimationFrame(animationFrame);
});
</script>

<style lang="scss">
@use "~/assets/styles/zbrou-storefront.scss";
</style>