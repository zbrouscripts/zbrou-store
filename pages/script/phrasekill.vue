<template>
  <main class="detail">
    <div class="detail__aurora" aria-hidden="true"></div>
    <div class="detail__wrap">
      <NuxtLink to="/#scripts" class="detail__back">← Volver a la tienda</NuxtLink>
      <div class="detail__grid">
        <div class="detail__media">
          <div class="detail__art">
            <img :src="phrasekillCoverImage" alt="PhraseKill para FiveM" />
            <span class="detail__corner">ZBROU / SCRIPT 001</span>
            <span class="detail__corner detail__corner--bottom">PERSONALIZA CADA ELIMINACIÓN</span>
          </div>
          <div class="detail__video"><iframe title="Vídeo de PhraseKill" loading="lazy" src="https://www.youtube-nocookie.com/embed/AYea1bq0pv4" allow="encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        </div>
        <div class="detail__info">
          <span class="detail__type"><i></i> PRODUCTO ZBROU / FIVEM</span>
          <h1>PhraseKill<span>.</span></h1>
          <p class="detail__intro">Personaliza los mensajes que aparecen al eliminar a otro jugador. Configura tus frases, efectos y estilos desde el propio script.</p>
          <dl class="detail__features">
            <div><dt>Frases</dt><dd>3 configuraciones guardadas, selección fija o aleatoria</dd></div>
            <div><dt>Estilo</dt><dd>Fuentes, colores, brillo, animaciones y posición</dd></div>
            <div><dt>Gestión</dt><dd>Panel de administración y permisos</dd></div>
            <div><dt>Compatibilidad</dt><dd>ESX, QBCore, Qbox y Standalone</dd></div>
          </dl>
          <div class="detail__purchase">
            <span>PRECIO</span>
            <strong>{{ pkg ? $n(pkg.base_price, "currency") : "Próximamente" }}</strong>
            <button type="button" :disabled="!pkg || loading" @click="addToBasket">{{ !pkg ? 'Aún no disponible' : loading ? 'Añadiendo…' : 'Añadir a la cesta' }}</button>
            <p v-if="message" role="status">{{ message }}</p>
            <small>El precio procede de Tebex. Las compras se procesan mediante Tebex.</small>
          </div>
          <div class="detail__links">
            <a href="https://zbrouscripts.gitbook.io/zbrou-scripts/frasekill" target="_blank" rel="noopener noreferrer">Documentación ↗</a>
            <a href="https://youtu.be/AYea1bq0pv4" target="_blank" rel="noopener noreferrer">Ver vídeo en YouTube ↗</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import type { Package } from "~/types";
import { phrasekillCoverImage } from "~/utils/brandImages";
useSeoMeta({ title: "PhraseKill · ZBrou Scripts", description: "PhraseKill: mensajes de eliminación personalizados para FiveM. Consulta sus opciones, demostración y disponibilidad." });
const categoryStore = useCategoryStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
const { data: categories } = await useAsyncData("categories", () => categoryStore.fetchCategories());
const pkg = computed<Package | undefined>(() => (categories.value ?? []).flatMap((c) => c.packages ?? []).find((p) => p.id === 7706999 || /phrase\s*kill/i.test(p.name)));
const loading = ref(false);
const message = ref("");
async function addToBasket() {
  if (!pkg.value || loading.value) return;
  loading.value = true;
  message.value = "";
  try {
    const basket = await basketStore.addPackageToBasket(pkg.value.id, 1);
    if (basket) uiStore.toggleItem("cart-sidebar");
  } catch {
    message.value = "No se ha podido añadir el producto. Inténtalo de nuevo.";
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped>
.detail{min-height:calc(100vh - 250px);position:relative;isolation:isolate;background:radial-gradient(circle at 72% 15%,#143b7133,transparent 47%),linear-gradient(180deg,#070c16,#0a111d 60%,#070b13);color:#f4f8ff;padding:62px 0 120px;font-family:Manrope,Arial,sans-serif;overflow:hidden}
.detail__aurora{position:absolute;top:-270px;right:-260px;width:800px;height:800px;background:radial-gradient(circle,#237ae828,transparent 67%);filter:blur(90px);z-index:-1;pointer-events:none;animation:detail-glow 14s ease-in-out infinite}
.detail__wrap{width:min(1190px,calc(100% - 42px));margin:auto}
.detail__back{display:inline-flex;align-items:center;margin-bottom:32px;color:#a3c4ec;text-decoration:none;font-size:12px;font-weight:750;transition:transform .25s,color .25s}
.detail__back:hover{color:#fff;transform:translateX(-4px)}
.detail__grid{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(320px,.88fr);gap:53px}
.detail__media{min-width:0;display:flex;flex-direction:column;gap:17px}
.detail__art{position:relative;overflow:hidden;border-radius:23px;border:1px solid #81abe659;background:linear-gradient(130deg,#213c63,#0a1423);box-shadow:0 35px 85px #0008,0 0 55px #2d7ad223}
.detail__art:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(130deg,#ffffff14,transparent 36%,transparent 71%,#8ebfff13)}
.detail__art img{display:block;width:100%;aspect-ratio:1.5;object-fit:cover;transition:transform .7s,filter .7s;filter:saturate(.93)}
.detail__art:hover img{transform:scale(1.045);filter:saturate(1.14)}
.detail__corner{position:absolute;top:19px;left:19px;padding:10px 12px;border:1px solid #9bc7ff65;border-radius:9px;background:#0b1a2dd9;backdrop-filter:blur(12px);color:#cfe5ff;font:700 10px Oxanium,Arial,sans-serif;letter-spacing:.13em}
.detail__corner--bottom{top:auto;left:auto;bottom:19px;right:19px;font-size:8px}
.detail__video{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border:1px solid #597da94a;border-radius:17px;background:#080a0c;box-shadow:0 20px 45px #0005}
.detail__video iframe{width:100%;height:100%;border:0}
.detail__info{min-width:0;animation:detail-rise .7s both}
.detail__type{display:inline-flex;align-items:center;gap:12px;font:700 11px Oxanium,Arial,sans-serif;letter-spacing:.18em;color:#9ac2f5}
.detail__type i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#8ccaff;box-shadow:0 0 15px #8ccaff}
.detail__info h1{font:750 clamp(45px,5.8vw,73px)/1 Oxanium,Arial,sans-serif;letter-spacing:-.064em;margin:25px 0}
.detail__info h1 span{color:#71b6ff}
.detail__intro{color:#a5b8d2;font-size:15px;line-height:1.9}
.detail__features{margin:32px 0;display:grid;gap:0}
.detail__features>div{display:grid;grid-template-columns:115px 1fr;gap:16px;padding:16px 0;border-bottom:1px solid #95bbf52a}
.detail__features dt{font-size:12px;font-weight:750;color:#d8e9ff}
.detail__features dd{font-size:12px;line-height:1.6;color:#9aacbf;margin:0}
.detail__purchase{margin-top:36px;display:flex;flex-direction:column;align-items:flex-start;gap:13px;padding:26px;border:1px solid #628db652;border-radius:18px;background:linear-gradient(140deg,#1a2a42ba,#111a2ad9)}
.detail__purchase>span{font:700 10px Oxanium,sans-serif;letter-spacing:.18em;color:#93b3de}
.detail__purchase strong{font:750 31px Oxanium,Arial,sans-serif}
.detail__purchase button{min-height:48px;width:100%;margin-top:4px;padding:0 24px;border:1px solid #c9e2ff;border-radius:12px;background:linear-gradient(130deg,#eff7ff,#b4d3f9);color:#0d233c;font-weight:850;font-size:13px;transition:transform .2s,box-shadow .2s}
.detail__purchase button:not(:disabled):hover{transform:translateY(-3px);box-shadow:0 11px 30px #5a9cff50}
.detail__purchase button:disabled{opacity:.55;cursor:not-allowed}
.detail__purchase small{color:#8da7c7;font-size:11px;line-height:1.7}
.detail__purchase p{color:#f2bbbb;font-size:12px}
.detail__links{display:flex;gap:23px;flex-wrap:wrap;margin-top:29px}
.detail__links a{color:#b5d3f5;font-size:12px;font-weight:750;text-decoration:underline;text-underline-offset:5px;transition:color .2s}
.detail__links a:hover{color:#fff}
@keyframes detail-rise{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}
@keyframes detail-glow{50%{transform:translate(-60px,60px)}}
@media(max-width:820px){.detail__grid{grid-template-columns:1fr;gap:36px}.detail{padding:43px 0 85px}}
@media(max-width:450px){.detail{padding:28px 0 75px}.detail__wrap{width:calc(100% - 24px)}.detail__features>div{grid-template-columns:94px 1fr}.detail__purchase{padding:20px}.detail__corner{font-size:8px}.detail__corner--bottom{display:none}}
@media(prefers-reduced-motion:reduce){.detail__aurora,.detail__info{animation:none}.detail__art img,.detail__links a,.detail__back,.detail__purchase button{transition:none}}
</style>