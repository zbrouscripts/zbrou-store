<template><canvas ref="canvas" class="store-stars" aria-hidden="true"></canvas></template>
<script setup>
const props = defineProps({ enabled: { type: Boolean, default: true } });
const canvas = ref(null);
let stop = () => {};
onMounted(() => {
  const node = canvas.value, ctx = node.getContext('2d', { alpha: false });
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, stars = [], frame = 0, last = 0, time = 0, meteor = null, nextMeteor = 2.5;
  let targetX = 0, targetY = 0, offsetX = 0, offsetY = 0;
  const smooth = value => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };
  function relocate(star, initial = false) {
    star.x = width * (.04 + Math.random() * .92); star.y = height * (.06 + Math.random() * .9);
    star.fadeIn = 1.05 + Math.random() * 1.4; star.hold = 2.8 + Math.random() * 4.5; star.fadeOut = 1.7 + Math.random() * 1.6;
    star.cycle = star.fadeIn + star.hold + star.fadeOut + .55 + Math.random() * 1.1;
    star.age = initial ? Math.random() * star.cycle : 0; star.vx = 2 + star.depth * 10; star.vy = -(14 + star.depth * 29);
  }
  function resize() {
    width = Math.max(1, document.documentElement.clientWidth); height = Math.max(1, innerHeight);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    node.width = Math.round(width * dpr); node.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.min(390, Math.max(120, Math.round(width * height / 3900))) }, () => {
      const depth = .18 + Math.random() * .82, star = { depth, r: .35 + depth * .85, alpha: .18 + Math.random() * .48, phase: Math.random() * Math.PI * 2 };
      relocate(star, true); return star;
    });
    draw(0);
  }
  function draw(dt) {
    time += dt; ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, width, height);
    offsetX += (targetX - offsetX) * Math.min(dt * 3, 1); offsetY += (targetY - offsetY) * Math.min(dt * 3, 1);
    for (const star of stars) {
      star.age += dt; star.x += star.vx * dt; star.y += star.vy * dt;
      if (star.age >= star.cycle) relocate(star);
      const visible = star.age < star.fadeIn ? smooth(star.age / star.fadeIn) : 1 - smooth((star.age - star.fadeIn - star.hold) / star.fadeOut);
      const x = star.x + offsetX * star.depth, y = star.y + offsetY * star.depth;
      ctx.globalAlpha = star.alpha * visible * smooth(Math.min(x, y, width - x, height - y) / 24) * (.9 + .1 * Math.sin(time + star.phase));
      ctx.fillStyle = '#d3e0f3'; ctx.beginPath(); ctx.arc(x, y, star.r, 0, Math.PI * 2); ctx.fill();
    }
    if (dt && time > nextMeteor && !meteor) { meteor = { x: width * (.35 + Math.random() * .6), y: height * (.08 + Math.random() * .35), age: 0 }; nextMeteor = time + 8 + Math.random() * 8; }
    if (meteor) {
      meteor.age += dt;
      if (meteor.age > 1.3) meteor = null;
      else {
        const t = meteor.age / 1.3, x = meteor.x - t * 260, y = meteor.y + t * 145;
        const gradient = ctx.createLinearGradient(x, y, x + 100, y - 56);
        gradient.addColorStop(0, `rgba(213,231,255,${Math.sin(t * Math.PI) * .44})`); gradient.addColorStop(1, 'rgba(213,231,255,0)');
        ctx.globalAlpha = 1; ctx.strokeStyle = gradient; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 100, y - 56); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
  function animate(timestamp) {
    frame = requestAnimationFrame(animate);
    if (last && timestamp - last < 1000 / 30) return;
    draw(last ? Math.min((timestamp - last) / 1000, .08) : 0); last = timestamp;
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (props.enabled && !reduced.matches && !document.hidden) frame = requestAnimationFrame(animate); else draw(0);
  }
  function pointer(event) {
    if (!props.enabled || reduced.matches || event.pointerType === 'touch') return;
    targetX = (event.clientX / width - .5) * 35; targetY = (event.clientY / height - .5) * 22;
  }
  const unwatch = watch(() => props.enabled, sync);
  window.addEventListener('resize', resize, { passive: true }); window.addEventListener('pointermove', pointer, { passive: true });
  document.addEventListener('visibilitychange', sync); reduced.addEventListener('change', sync);
  resize(); sync();
  stop = () => { unwatch(); cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', pointer); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); };
});
onUnmounted(() => stop());
</script>
<style scoped>.store-stars{position:fixed;top:0;left:0;width:100%;height:100svh;pointer-events:none;z-index:-1}</style>
