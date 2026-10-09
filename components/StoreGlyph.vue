<template>
  <svg :viewBox="name === 'fivem' ? '0 0 50.949 60' : '0 0 24 24'" :width="size" :height="size" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'arrow'"><path d="M5 12h14m-5-5 5 5-5 5" /></template>
    <template v-else-if="name === 'external'"><path d="M7 17 17 7M7 7h10v10" /></template>
    <template v-else-if="name === 'down'"><path d="M12 4v16m-6-6 6 6 6-6" /></template>
    <template v-else-if="name === 'search'"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></template>
    <template v-else-if="name === 'cart'"><path d="M3 3h2l2.2 11a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" /><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></template>
    <template v-else-if="name === 'shield'"><path d="m12 3 8 3v5c0 6-8 10-8 10S4 17 4 11V6l8-3Z"/><path d="m8 12 3 3 5-6"/></template>
    <template v-else-if="name === 'players'"><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5"/></template>
    <template v-else-if="name === 'server'"><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.1M7 17.5h.1M16 6.5h2m-2 11h2"/></template>
    <template v-else-if="name === 'heart'"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></template>
    <template v-else-if="name === 'code'"><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 3l-4 18"/></template>
    <template v-else-if="name === 'spark'"><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/></template>
    <template v-else-if="name === 'pause'"><path d="M9 5v14m6-14v14"/></template>
    <template v-else-if="name === 'play'"><path d="m8 4 12 8-12 8V4Z"/></template>
    <!-- Official FiveM mark: the three symbol subpaths from https://fivem.net/ (header logo). -->
    <template v-else-if="name === 'fivem'"><path d="M10.959 27.123L19.509 1.473C19.803 0.591 20.625 0 21.552 0H30.99L32.787 5.403L10.959 27.123ZM35.67 14.07L27.624 22.107L38.817 60H50.949L35.67 14.07ZM5.148 44.553L0 60H12.123L21.588 28.137L5.148 44.556V44.553Z" fill="currentColor" stroke="none"/></template>
    <template v-else-if="name === 'discord'"><path d="M19.7 5.4a18.3 18.3 0 0 0-4.4-1.3l-.5 1a16.3 16.3 0 0 0-5.6 0l-.5-1a18.3 18.3 0 0 0-4.4 1.3C1.5 9.6.8 13.7 1.1 17.7a18.2 18.2 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a13.4 13.4 0 0 0 11.4 0l.4.3-1.7.8 1.1 1.8a18.2 18.2 0 0 0 5.4-2.7c.4-4.6-.8-8.6-3.2-12.3ZM8.3 14.9c-1.1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Zm7.4 0c-1.1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Z" fill="currentColor" stroke="none"/></template>
  </svg>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 });
</script>
