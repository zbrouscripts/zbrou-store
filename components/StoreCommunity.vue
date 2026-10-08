<template>
  <section ref="section" class="zb-social zb-shell" aria-labelledby="social-title">
    <div class="zb-section-heading"><span class="zb-eyebrow">LA COMUNIDAD, EN CIFRAS</span><h2 id="social-title">Detrás de cada script, <em>hay gente.</em></h2><p>Actividad de los scripts y de la comunidad ZBrou.</p></div>
    <div class="zb-social__status"><span :class="{ 'zb-live': usage?.connected }"><i></i>{{ usage?.connected ? 'ACTIVIDAD CONECTADA' : 'ESTADÍSTICAS PRÓXIMAMENTE' }}</span></div>
    <div class="zb-metrics">
      <div v-for="(metric, index) in metrics" :key="metric.label" class="zb-metric"><div class="zb-metric__top"><StoreGlyph :name="metric.icon" :size="23" /><span>ZBROU</span></div><strong>{{ values[index] == null ? '—' : Math.round(values[index]!).toLocaleString('es-ES') }}<small v-if="values[index] != null">{{ metric.suffix }}</small></strong><h3>{{ metric.label }}</h3><p>{{ metric.description }}</p><div class="zb-metric__line" aria-hidden="true"></div></div>
    </div>
    <div class="zb-purchases">
      <div class="zb-purchases__heading"><div><span class="zb-eyebrow">ACTIVIDAD DE LA TIENDA</span><h3>Compras recientes<span>.</span></h3></div><span class="zb-feed-badge"><i></i>{{ community?.connected && purchases.length ? 'ACTUALIZADO CADA MINUTO' : 'PRÓXIMAMENTE' }}</span></div>
      <div v-if="purchases.length" class="zb-purchase-window" tabindex="0" aria-label="Compras recientes. El carrusel se detiene al colocar el puntero o el foco.">
        <div class="zb-purchase-track">
          <div v-for="copy in 2" :key="copy" class="zb-purchase-group" :aria-hidden="copy === 2 ? true : undefined">
            <article v-for="(purchase, index) in purchases" :key="index" class="zb-purchase">
              <img v-if="purchase.avatar && !brokenAvatars.has(purchase.avatar)" :src="purchase.avatar" alt="" width="46" height="46" loading="lazy" referrerpolicy="no-referrer" @error="brokenAvatars.add(purchase.avatar)" />
              <StoreAvatar v-else :seed="index + copy * 12" :name="purchase.name" />
              <div><strong>{{ purchase.name }}</strong><p>{{ purchase.product }}</p><small>{{ purchase.label }}</small></div><span class="zb-purchase__check" aria-hidden="true">✓</span>
            </article>
          </div>
        </div>
      </div>
      <div v-else class="zb-purchases__empty"><StoreGlyph name="cart" :size="23" /><span>Las primeras compras de la comunidad aparecerán aquí.</span></div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { enabled } = useStoreMotion();
const { data: usage, refresh: refreshUsage } = await useFetch("/api/usage");
const { data: community, refresh: refreshCommunity } = await useFetch("/api/community");
const section = ref<HTMLElement | null>(null), seen = ref(false);
const metrics = computed(() => [
  { icon: "players", label: "Jugadores activos", description: "Jugando con scripts ZBrou", suffix: "", value: usage.value?.playersOnline },
  { icon: "server", label: "Servidores activos", description: "Creando su propia experiencia", suffix: "", value: usage.value?.serversActive },
  { icon: "heart", label: "Clientes satisfechos", description: "Valoración de la comunidad", suffix: "%", value: community.value?.satisfaction },
  { icon: "spark", label: "Instalaciones", description: "Scripts que ya tienen un hogar", suffix: "", value: usage.value?.installations },
]);
const values = ref<Array<number | null>>([null, null, null, null]);
const clock = ref(Date.now());
const brokenAvatars = ref(new Set<string>());
const relativeTime = (time: string) => {
  const minutes = Math.max(0, Math.floor((clock.value - Date.parse(time)) / 60000));
  return minutes < 1 ? "Hace un momento" : minutes < 60 ? "Hace " + minutes + " min" : minutes < 1440 ? "Hace " + Math.floor(minutes / 60) + " h" : "Hace " + Math.floor(minutes / 1440) + " días";
};
const purchases = computed(() => (community.value?.purchases ?? []).map(p => ({ ...p, label: relativeTime(p.time) })));
let frame = 0, observer: IntersectionObserver, interval: ReturnType<typeof setInterval>;
function animateValues() {
  if (import.meta.client) cancelAnimationFrame(frame);
  const target = metrics.value.map(m => m.value ?? null);
  if (!seen.value || !enabled.value) { values.value = target; return; }
  const start = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - start) / 1500), ease = 1 - Math.pow(1 - t, 3);
    values.value = target.map(n => n === null ? null : Math.round(n * ease));
    if (t < 1) frame = requestAnimationFrame(step);
  }
  frame = requestAnimationFrame(step);
}
watch([metrics, seen], animateValues, { immediate: true });
watch(enabled, value => { if (!value) { cancelAnimationFrame(frame); values.value = metrics.value.map(m => m.value ?? null); } });
onMounted(() => {
  observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { seen.value = true; observer.disconnect(); } }, { threshold: .15 });
  if (section.value) observer.observe(section.value);
  interval = setInterval(() => { if (!document.hidden) { clock.value = Date.now(); refreshUsage(); refreshCommunity(); } }, 60000);
});
onUnmounted(() => { cancelAnimationFrame(frame); observer?.disconnect(); clearInterval(interval); });
</script>
