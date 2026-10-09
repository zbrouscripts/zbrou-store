<template>
  <div class="zb-atmosphere" aria-hidden="true">
    <div class="zb-aurora zb-aurora--one"><canvas ref="auroraOne" class="zb-aurora__texture"></canvas></div><div class="zb-aurora zb-aurora--two"><canvas ref="auroraTwo" class="zb-aurora__texture"></canvas></div>
    <div class="zb-grid"></div><canvas ref="canvas" class="zb-stars" :data-motion="enabled ? 'running' : 'paused'"></canvas>
  </div>
</template>
<script setup>
import { createFramePacer } from '~/utils/framePacer';
import { renderAuroraTexture } from '~/utils/auroraTexture';
import { followPointer } from '~/utils/pointerMotion';
const props = defineProps({ enabled: { type: Boolean, default: false } });
const canvas = ref(null);
const auroraOne = ref(null), auroraTwo = ref(null);
let stop = () => {};
onMounted(() => {
  const node = canvas.value, ctx = node.getContext('2d', { desynchronized: true });
  if (!ctx) return;
  let width = 0, height = 0, stars = [], frame = 0, time = 0, textureTimer = 0;
  // The decorative field has its own budget, leaving time for scroll and foreground effects.
  const pacer = createFramePacer(30);
  let targetX = 0, targetY = 0, offsetX = 0, offsetY = 0;
  function prepareAuroras() {
    const textureWidth = Math.max(innerWidth * .75, 580), textureHeight = innerHeight * .65;
    for (const [texture, color] of [[auroraOne.value, '#416ee5'], [auroraTwo.value, '#277d98']]) {
      if (texture && renderAuroraTexture(texture, textureWidth, textureHeight, color)) {
        texture.parentElement.dataset.textureReady = 'true';
      }
    }
  }
  function resize() {
    clearTimeout(textureTimer); textureTimer = window.setTimeout(prepareAuroras, 120);
    if (width === document.documentElement.clientWidth && height === innerHeight) return;
    width = document.documentElement.clientWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    node.width = Math.round(width * dpr); node.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.min(210, Math.max(70, Math.round(width * height / 6500))) }, () => ({
      x: Math.random() * width, y: Math.random() * height, depth: .2 + Math.random() * .8,
      phase: Math.random() * Math.PI * 2, alpha: .25 + Math.random() * .55,
    }));
    draw(0);
  }
  function draw(dt) {
    time += dt; ctx.clearRect(0, 0, width, height);
    offsetX = followPointer(offsetX, targetX, dt); offsetY = followPointer(offsetY, targetY, dt);
    for (const star of stars) {
      star.x += dt * (6 + star.depth * 12); star.y -= dt * (10 + star.depth * 18);
      if (star.y < -10) { star.y = height + 10; star.x = Math.random() * width; }
      if (star.x > width + 10) star.x = -10;
      const x = star.x + offsetX * star.depth, y = star.y + offsetY * star.depth;
      ctx.globalAlpha = star.alpha * (.65 + .35 * Math.sin(time * 1.4 + star.phase));
      ctx.fillStyle = star.depth > .7 ? '#b4eaff' : '#7594c2';
      ctx.beginPath(); ctx.arc(x, y, .45 + star.depth * .8, 0, Math.PI * 2); ctx.fill();
      if (star.depth > .86) {
        ctx.globalAlpha *= .14; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      }
    }
    // A slow light trail crosses the field every eight seconds.
    const phase = (time % 8) / 8;
    if (phase < .2) {
      const travel = phase / .2, x = width * (.82 - travel * .28), y = height * (.13 + travel * .25);
      const trail = ctx.createLinearGradient(x, y, x + 150, y - 80);
      trail.addColorStop(0, 'rgba(160,224,255,' + Math.sin(travel * Math.PI) * .85 + ')');
      trail.addColorStop(1, 'rgba(90,158,255,0)');
      ctx.globalAlpha = 1; ctx.strokeStyle = trail; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 150, y - 80); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function animate(timestamp) {
    frame = requestAnimationFrame(animate);
    const dt = pacer.sample(timestamp);
    if (dt !== null) draw(dt);
  }
  function sync() {
    cancelAnimationFrame(frame); pacer.reset();
    if (props.enabled && !document.hidden) frame = requestAnimationFrame(animate);
  }
  function pointer(event) {
    if (!props.enabled || event.pointerType === 'touch') return;
    targetX = (event.clientX / width - .5) * 45; targetY = (event.clientY / height - .5) * 30;
  }
  const unwatch = watch(() => props.enabled, sync);
  window.addEventListener('resize', resize, { passive: true }); window.addEventListener('pointermove', pointer, { passive: true });
  document.addEventListener('visibilitychange', sync); resize(); sync();
  stop = () => { unwatch(); cancelAnimationFrame(frame); clearTimeout(textureTimer); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', pointer); document.removeEventListener('visibilitychange', sync); };
});
onUnmounted(() => stop());
</script>
