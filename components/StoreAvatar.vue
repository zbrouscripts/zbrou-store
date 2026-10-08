<template>
  <svg viewBox="0 0 64 64" role="img" :aria-label="'Avatar de ' + name">
    <defs><linearGradient :id="'av-' + seed" x2="1" y2="1"><stop :stop-color="colors[seed % colors.length][0]"/><stop offset="1" :stop-color="colors[seed % colors.length][1]"/></linearGradient></defs>
    <rect width="64" height="64" rx="20" :fill="'url(#av-' + seed + ')'"/>
    <circle cx="32" cy="33" r="21" fill="#ffffff12"/>
    <path d="M14 64c0-15 8-22 18-22s18 7 18 22" fill="#101827" opacity=".65"/>
    <rect x="16" y="14" width="32" height="35" rx="13" fill="#e1ecfc"/>
    <path d="M16 29V21c0-10 9-13 16-13s16 5 16 13v8l-5-9-14 3-8-3-5 9Z" :fill="seed % 2 ? '#273a5c' : '#1a283b'"/>
    <rect x="20" y="27" width="24" height="10" rx="5" fill="#253855"/><circle cx="26" cy="32" r="2.3" fill="#76e0ff"/><circle cx="38" cy="32" r="2.3" fill="#76e0ff"/>
    <path d="M28 41q4 3 8 0" stroke="#4a6e99" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path v-if="seed % 3 === 0" d="M16 21h32l-5-8H21Z" :fill="colors[seed % colors.length][0]"/>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ seed: number; name: string }>();
const colors = [["#367bd8", "#13335e"], ["#986bd6", "#362354"], ["#5abba9", "#164644"], ["#d79853", "#5e3d27"], ["#df7388", "#5b263e"], ["#6691f8", "#243f6c"]];
</script>
