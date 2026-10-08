<template>
  <Modal v-model="open" @close="basketStore.clearPendingActions()" @hidden="router.push('/')">
    <div class="zb-auth">
      <template v-if="authStore.isAuthenticated">
        <span class="zb-eyebrow">TU CUENTA</span><h2>Bienvenido a ZBrou.</h2><div class="zb-auth__user"><Avatar :user="authStore.user" />{{ authStore.user?.username }}</div><button class="zb-btn zb-btn--glass" type="button" @click="logout">Cerrar sesión</button>
      </template>
      <template v-else>
        <StoreGlyph name="fivem" :size="34" /><span class="zb-eyebrow">CUENTA FIVEM</span><h2>Tu acceso a ZBrou.</h2><p>Conecta tu cuenta a través de Tebex para gestionar tu compra.</p>
        <p v-if="fetching" role="status">Conectando con Tebex…</p>
        <template v-else-if="methods.length"><button v-for="method in methods" :key="method.name" class="zb-btn zb-btn--primary" type="button" :disabled="isLoading" @click="loginRedirect(method)"><StoreGlyph name="fivem" :size="18" />{{ isLoading ? 'Abriendo acceso…' : 'Acceder con ' + method.name }}<StoreGlyph name="external" :size="17" /></button></template>
        <template v-else><p class="zb-auth__error" role="status">{{ message || 'El acceso no está disponible en este momento.' }}</p><button class="zb-btn zb-btn--glass" type="button" @click="fetchMethods">Volver a intentar</button></template>
        <small>La autenticación continúa en el proveedor oficial.</small>
      </template>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import type { BasketAuthMethod } from "~/types";
definePageMeta({ scrollToTop: false });
const route = useRoute(), router = useRouter(), authStore = useAuthStore(), basketStore = useBasketStore();
const { open } = useModalPage();
const methods = ref<BasketAuthMethod[]>([]), fetching = ref(true), isLoading = ref(false), message = ref("");
async function fetchMethods() {
  fetching.value = true; message.value = "";
  try { methods.value = await authStore.getAuthMethods(route.query.redirect as string); }
  catch { message.value = "No hemos podido conectar con Tebex. Inténtalo de nuevo en unos instantes."; }
  finally { fetching.value = false; }
}
function loginRedirect(method: BasketAuthMethod) {
  isLoading.value = true;
  try { authStore.loginRedirect(method); } catch { isLoading.value = false; message.value = "No se ha podido abrir el acceso."; }
}
function logout() { authStore.logout(); open.value = false; }
onMounted(() => { if (!authStore.isAuthenticated) fetchMethods(); else fetching.value = false; });
</script>
<style scoped>
.zb-auth{font-family:Manrope,sans-serif;display:flex;flex-direction:column;align-items:center;text-align:center;gap:15px;padding:25px 15px 15px;color:#daeaff}.zb-auth>svg{color:#87b5ec;margin-bottom:5px}.zb-auth h2{font:700 31px/1.2 Oxanium,sans-serif;letter-spacing:-.03em}.zb-auth p{font-size:12px;color:#7795bc;line-height:1.8;max-width:340px}.zb-auth .zb-btn{width:100%;margin-top:10px}.zb-auth small{font-size:9px;color:#59779b;margin-top:7px}.zb-auth__user{display:flex;align-items:center;gap:15px}.zb-auth .zb-auth__error{color:#dba89c}@media(max-width:450px){.zb-auth{padding:18px 0 8px}.zb-auth h2{font-size:27px}.zb-auth .zb-btn{font-size:12px}}
</style>
