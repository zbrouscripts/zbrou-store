<template>
  <div class="detail">
    <div class="detail__wrap">
      
      <div class="detail__grid">
        <div class="detail__media">
          <img :src="pkg?.image || phrasekillCoverImage" alt="PhraseKill para FiveM" />
          <div v-if="videoId" class="detail__video"><iframe title="Vídeo de PhraseKill" loading="lazy" :src="`https://www.youtube-nocookie.com/embed/${videoId}`" allow="encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        </div>
        <div class="detail__info">
          <span class="detail__type">SCRIPT PARA FIVEM</span>
          <h1>PhraseKill</h1>
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
            <a v-if="videoId" :href="`https://youtu.be/${videoId}`" target="_blank" rel="noopener noreferrer">Ver vídeo en YouTube ↗</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Package } from "~/types";
import { phrasekillCoverImage } from "~/utils/brandImages";

const categoryStore = useCategoryStore();
const basketStore = useBasketStore();
const uiStore = useUIStore();
const emit = defineEmits<{ added: [] }>();
const videoId = computed(() => String(useRuntimeConfig().public.phrasekillVideoId || ""));
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
    if (basket) { emit('added'); uiStore.toggleItem("cart-sidebar"); }
  } catch {
    message.value = "No se ha podido añadir el producto. Inténtalo de nuevo.";
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped>
.detail{min-height:calc(100vh - 250px);background:#000;color:#f2f5f9;padding:128px 0 110px;font-family:Manrope,Arial,sans-serif}
.detail__wrap{width:min(1200px,calc(100% - 40px));margin:auto}
.detail__back{display:inline-block;margin-bottom:25px;color:#acbfd7;text-decoration:none;font-size:13px}
.detail__back:hover{color:#fff}
.detail__grid{display:grid;grid-template-columns:minmax(0,1.13fr) minmax(300px,.87fr);gap:48px}
.detail__media{min-width:0;display:flex;flex-direction:column;gap:17px}
.detail__media>img{display:block;width:100%;aspect-ratio:1.5;object-fit:cover;border-radius:18px;border:1px solid #ffffff28;background:#101927}
.detail__video{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border:1px solid #ffffff28;border-radius:17px;background:#080a0c}
.detail__video iframe{width:100%;height:100%;border:0}
.detail__type{font:700 11px Oxanium,Arial,sans-serif;letter-spacing:.17em;color:#aec5e0}
.detail__info h1{font:700 clamp(42px,5vw,66px)/1 Oxanium,Arial,sans-serif;margin:15px 0 22px}
.detail__intro{color:#a8b6c9;font-size:15px;line-height:1.8}
.detail__features{margin:28px 0;display:grid;gap:0}
.detail__features>div{display:grid;grid-template-columns:115px 1fr;gap:16px;padding:13px 0;border-bottom:1px solid #ffffff21}
.detail__features dt{font-size:12px;font-weight:700;color:#dbe4f1}
.detail__features dd{font-size:12px;line-height:1.6;color:#9cabbe;margin:0}
.detail__purchase{margin-top:30px;display:flex;flex-direction:column;align-items:flex-start;gap:11px}
.detail__purchase>span{font:700 10px Oxanium,sans-serif;letter-spacing:.18em;color:#93a9c6}
.detail__purchase strong{font:700 28px Oxanium,Arial,sans-serif}
.detail__purchase button{min-height:47px;margin-top:6px;padding:0 24px;border:0;border-radius:11px;background:#bfd2eb;color:#11263c;font-weight:800;font-size:13px}
.detail__purchase button:disabled{opacity:.57;cursor:not-allowed}
.detail__purchase small{color:#7c90aa;font-size:11px;line-height:1.7}
.detail__purchase p{color:#e6c3c3;font-size:12px}
.detail__links{display:flex;gap:23px;flex-wrap:wrap;margin-top:28px}
.detail__links a{color:#c6d8ed;font-size:13px;text-decoration:underline;text-underline-offset:5px}
@media(max-width:820px){.detail__grid{grid-template-columns:1fr;gap:34px}}
@media(max-width:450px){.detail{padding:108px 0 75px}.detail__wrap{width:calc(100% - 24px)}.detail__features>div{grid-template-columns:94px 1fr}}
.detail__grid{padding:25px;border:1px solid #ffffff30;border-radius:28px;background:linear-gradient(145deg,#ffffff0b,#ffffff03 48%,#ffffff08);backdrop-filter:blur(20px) saturate(155%);gap:30px}.detail__wrap{max-width:1160px}.detail__info h1{font-size:42px}.detail__features dt,.detail__features dd{font-size:12px}.detail__intro{font-size:14px}.detail__purchase small{font-size:10px}
@media(max-width:450px){.detail__grid{padding:15px;border-radius:22px}}
.detail{padding:0;background:transparent;min-height:0}.detail__wrap{width:100%;max-width:none}.detail__grid{padding:0;border:0;backdrop-filter:none;background:transparent}.detail__info h1{font-size:32px}.detail__purchase{margin-top:20px}.detail__purchase strong{font-size:25px}
</style>
