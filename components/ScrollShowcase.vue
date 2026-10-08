<template>
  <section ref="track" class="story-track" aria-labelledby="story-heading">
    <div class="story-sticky" :style="{ '--progress': String(progress) }">
      <div class="story-ruler" aria-hidden="true"><span>01</span><div><i :style="{ transform: 'scaleX(' + progress + ')' }"></i></div><span>03</span></div>
      <div class="story-topline"><span>ANATOMY OF A KILL</span><span>SCROLL-DRIVEN EXPERIENCE</span></div>

      <div class="story-stage">
        <div class="story-heading">
          <span class="story-label">BUILT DIFFERENT · PHRASEKILL</span>
          <h2 id="story-heading">Make every elimination <em>yours.</em></h2>
          <p>From a simple kill notification to a signature moment. Fine-tune the experience without touching the look of your server.</p>
        </div>

        <div class="story-scene" aria-label="Animated interactive representation of PhraseKill effects">
          <div class="story-ring story-ring--a"></div>
          <div class="story-ring story-ring--b"></div>
          <div class="story-scan"></div>

          <div class="story-side story-side--left">
            <span>01 / DEFINE</span>
            <strong>Choose<br />your words.</strong>
            <small>Three phrase slots. Fixed or random.</small>
          </div>

          <div class="story-main">
            <div class="story-main__window">
              <div class="story-main__head"><span class="story-led"></span> PHRASEKILL / LIVE PREVIEW <b>FX_01</b></div>
              <div class="story-main__screen">
                <div class="story-main__reticle" aria-hidden="true"><i></i><i></i></div>
                <div class="story-main__impact">ELIMINATED<span>.</span></div>
                <div class="story-main__sub">THE FINAL WORD IS YOURS</div>
                <div class="story-main__wave"><i v-for="n in 24" :key="n" :style="{ '--n': String(n) }"></i></div>
              </div>
              <div class="story-main__foot"><span>VISUAL ENGINE</span><span>PHRASE / ANIMATION / EFFECT</span></div>
            </div>
          </div>

          <div class="story-side story-side--right">
            <span>02 / DESIGN</span>
            <strong>Shape<br />the impact.</strong>
            <small>Fonts, colors, glow and motion.</small>
          </div>

          <div class="story-final">
            <span>03 / PERSONALIZE</span>
            <strong>One server.<br />Your signature.</strong>
            <small>Save, switch and refine your own look.</small>
          </div>
        </div>

        <div class="story-step-text" aria-live="off">
          <span>{{ currentStep.index }} / 03</span>
          <b>{{ currentStep.heading }}</b>
          <p>{{ currentStep.description }}</p>
        </div>
      </div>
      <div class="story-scroll-bottom"><span>SCROLL TO TRANSFORM</span><span>↓</span></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const track = ref<HTMLElement | null>(null);
const progress = ref(0);
const steps = [
  { index: '01', heading: 'Write it.', description: 'Create personalized kill messages and save your favorite phrases.' },
  { index: '02', heading: 'Style it.', description: 'Adjust typography, glow, positioning and animation to match your server.' },
  { index: '03', heading: 'Own it.', description: 'Turn each elimination into an unmistakable signature.' },
];
const currentStep = computed(() => steps[Math.min(2, Math.floor(progress.value * 3))]);
let raf = 0;
let reducedMotion: MediaQueryList | null = null;
function recalculate() {
  raf = 0;
  if (!track.value) return;
  if (reducedMotion?.matches) { progress.value = 0.5; return; }
  const bounds = track.value.getBoundingClientRect();
  const travel = Math.max(1, bounds.height - window.innerHeight);
  const raw = -bounds.top / travel;
  progress.value = Math.max(0, Math.min(1, Math.round(raw * 1000) / 1000));
}
function schedule() {
  if (!raf) raf = window.requestAnimationFrame(recalculate);
}
onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reducedMotion.addEventListener('change', schedule);
  schedule();
});
onUnmounted(() => {
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  reducedMotion?.removeEventListener('change', schedule);
  if (raf) window.cancelAnimationFrame(raf);
});
</script>

<style scoped>
.story-track{--progress:0;position:relative;height:285vh;background:#050912;color:#f5f8ff}
.story-sticky{height:100vh;min-height:660px;position:sticky;top:0;overflow:hidden;background:radial-gradient(circle at 50% 52%,rgba(18,69,154,.16),transparent 42%),#050912}
.story-sticky:before{content:"";position:absolute;inset:0;opacity:.33;pointer-events:none;background-image:linear-gradient(#5c81b01c 1px,transparent 1px),linear-gradient(90deg,#5c81b01c 1px,transparent 1px);background-size:62px 62px;mask-image:radial-gradient(ellipse at center,#000,transparent 77%)}
.story-ruler{position:absolute;right:5vw;top:82px;display:flex;align-items:center;gap:16px;color:#7288a8;font:700 10px monospace;letter-spacing:.2em}
.story-ruler div{width:100px;height:2px;background:#293951}.story-ruler i{display:block;width:100%;height:100%;transform-origin:left;background:#76aaff;transition:transform .05s linear}
.story-topline{position:absolute;top:86px;left:5vw;display:flex;gap:20px;font:700 10px monospace;letter-spacing:.19em;color:#7992b9}
.story-topline span+span{color:#466084}
.story-stage{width:min(1200px,90vw);height:100%;margin:auto;position:relative}
.story-heading{position:absolute;z-index:2;top:15%;left:0;width:550px;max-width:70%;transform:translateY(calc(var(--progress) * -115px)) scale(calc(1 - var(--progress) * .16));opacity:clamp(0,calc(1.3 - var(--progress) * 2.3),1);transform-origin:top left}
.story-label{font:700 11px monospace;letter-spacing:.16em;color:#81aefd}
.story-heading h2{font:750 clamp(37px,4.6vw,68px)/1.04 "Space Grotesk",sans-serif;letter-spacing:-.065em;margin:21px 0;color:#f0f6ff}
.story-heading em{font-style:normal;color:#4d8ff3}
.story-heading p{font:400 15px/1.7 Manrope,sans-serif;max-width:390px;color:#93a3bd}
.story-scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;perspective:1100px}
.story-ring{position:absolute;width:min(66vw,710px);aspect-ratio:1;border-radius:50%;border:1px solid rgba(86,151,255,.13);transform:scale(calc(.62 + var(--progress)*.7)) rotate(calc(var(--progress)*180deg));}
.story-ring--b{width:min(44vw,480px);border-style:dashed;border-color:#4e87d331;transform:scale(calc(.9 + var(--progress)*.7)) rotate(calc(var(--progress)*-220deg))}
.story-scan{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(30,111,241,.15),transparent 66%);transform:scale(calc(.4 + var(--progress)*1.15));filter:blur(35px)}
.story-main{position:absolute;top:42%;left:50%;width:min(500px,46vw);transform:translate(-50%,-50%) translateY(calc(var(--progress)*72px)) rotateY(calc((var(--progress) - .35)*-19deg)) rotateX(calc(var(--progress)*7deg)) scale(calc(.66 + var(--progress)*.7));z-index:2;will-change:transform}
.story-main__window{border:1px solid #658cca77;border-radius:22px;background:linear-gradient(130deg,#18365d,#081626 45%,#08101b);box-shadow:0 30px 100px #000b,0 0 110px #286ef23b,inset 0 1px #ffffff1c;overflow:hidden;backdrop-filter:blur(22px)}
.story-main__head,.story-main__foot{height:45px;display:flex;align-items:center;justify-content:space-between;padding:0 23px;border-bottom:1px solid #8ba6d525;color:#a3bddf;font:700 9px monospace;letter-spacing:.12em}
.story-main__head b{margin-left:auto;font-weight:500;color:#537db4}.story-main__foot{height:36px;border-top:1px solid #8ba6d525;border-bottom:0;color:#58769f}
.story-led{display:inline-block;width:7px;height:7px;border-radius:50%;background:#5eafff;box-shadow:0 0 10px #5eafff;margin-right:8px}
.story-main__screen{min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden}
.story-main__screen:before{content:"";position:absolute;inset:0;background:radial-gradient(circle,#3383ef19,transparent 55%)}
.story-main__reticle{position:absolute;width:175px;height:175px;border:1px solid #497baf3d;border-radius:50%;transform:rotate(calc(var(--progress)*120deg)) scale(calc(.8 + var(--progress)*.5))}
.story-main__reticle:after,.story-main__reticle:before{content:"";position:absolute;background:#9ccfff55}
.story-main__reticle:before{width:1px;top:-20px;bottom:-20px;left:50%}.story-main__reticle:after{height:1px;left:-20px;right:-20px;top:50%}
.story-main__impact{position:relative;font:900 clamp(23px,3.2vw,43px)/1 "Space Grotesk",sans-serif;letter-spacing:-.09em;text-shadow:0 0 28px #367fe886;transform:scale(calc(.7 + var(--progress)*.55))}
.story-main__impact span{color:#4f99ff}
.story-main__sub{position:relative;margin-top:10px;color:#91b1dd;font:700 9px monospace;letter-spacing:.22em}
.story-main__wave{position:absolute;bottom:22px;display:flex;align-items:center;gap:4px;height:20px}
.story-main__wave i{display:block;width:3px;height:calc(3px + (var(--n) % 4) * 3px);background:#3579c9;border-radius:2px;transform:scaleY(calc(.5 + var(--progress)*1.2))}
.story-side{position:absolute;z-index:1;padding:22px 24px;width:230px;min-height:142px;border:1px solid #36547c80;border-radius:18px;background:#102039dd;backdrop-filter:blur(20px);box-shadow:0 22px 70px #0006;display:flex;flex-direction:column}
.story-side span,.story-final span{font:700 9px monospace;color:#88b3ff;letter-spacing:.15em}
.story-side strong,.story-final strong{margin-top:17px;color:#edf4ff;line-height:1.12;font-size:22px;letter-spacing:-.04em}
.story-side small,.story-final small{color:#97a9c3;font-size:11px;line-height:1.6;margin-top:10px}
.story-side--left{top:55%;left:0;transform:translateX(calc(var(--progress)*-130px)) translateY(calc(var(--progress)*-100px)) rotate(calc(var(--progress)*-16deg));opacity:clamp(0,calc(1.4 - var(--progress)*1.9),1)}
.story-side--right{top:55%;right:0;transform:translateX(calc(var(--progress)*140px)) translateY(calc(var(--progress)*-30px)) rotate(calc(var(--progress)*18deg));opacity:clamp(0,calc(1.4 - var(--progress)*1.9),1)}
.story-final{position:absolute;z-index:4;right:1%;bottom:17%;display:flex;flex-direction:column;padding:26px 30px;min-width:240px;border:1px solid #4976b677;border-radius:20px;background:linear-gradient(140deg,#184582ed,#0c1a2ded);box-shadow:0 24px 80px #0009;opacity:clamp(0,calc((var(--progress) - .5)*3),1);transform:translateY(calc((1 - var(--progress))*120px)) scale(calc(.82 + var(--progress)*.18))}
.story-step-text{position:absolute;z-index:5;left:2%;bottom:15%;max-width:320px}
.story-step-text span{display:block;color:#548ff4;font:700 11px monospace;letter-spacing:.18em}
.story-step-text b{display:block;font-size:26px;letter-spacing:-.04em;margin-top:8px;color:#f4f8ff}
.story-step-text p{font:400 12px/1.6 Manrope,sans-serif;color:#8d9db8;max-width:265px}
.story-scroll-bottom{position:absolute;bottom:29px;left:5vw;right:5vw;display:flex;justify-content:space-between;color:#526c8e;font:700 10px monospace;letter-spacing:.16em}
.story-scroll-bottom span:last-child{font-size:23px;color:#75adff}
@media(max-width:960px){.story-side{display:none}.story-heading{top:18%;max-width:85%}.story-main{width:min(550px,78vw);top:53%}.story-final{right:1%;bottom:12%;min-width:190px}.story-step-text{bottom:10%;max-width:45%}.story-topline{top:60px}.story-ruler{top:57px}}
@media(max-width:600px){.story-track{height:200vh}.story-sticky{min-height:600px}.story-heading{top:18%;width:100%;max-width:100%;transform:translateY(calc(var(--progress)*-100px)) scale(calc(1 - var(--progress)*.1))}.story-heading h2{font-size:39px}.story-heading p{font-size:12px;max-width:310px}.story-main{top:53%;width:92vw}.story-main__screen{min-height:160px}.story-main__head{height:35px;font-size:7px;padding:0 12px}.story-main__foot{height:27px;font-size:7px;padding:0 12px}.story-main__reticle{width:120px;height:120px}.story-main__impact{font-size:29px}.story-main__sub{font-size:7px}.story-ruler{display:none}.story-topline{left:5%;font-size:8px}.story-topline span+span{display:none}.story-final{right:0;bottom:16%;padding:14px 18px;min-width:180px}.story-final strong{font-size:18px;margin-top:7px}.story-final small{font-size:10px}.story-step-text{bottom:8%;left:0}.story-step-text b{font-size:19px}.story-step-text p{font-size:10px}.story-scroll-bottom{bottom:17px;font-size:8px}}
@media(prefers-reduced-motion:reduce){.story-track{height:auto}.story-sticky{height:auto;min-height:640px;position:relative}.story-main,.story-ring,.story-side,.story-final,.story-heading{will-change:auto;transform:none!important;opacity:1!important}.story-main{transform:translate(-50%,-50%)!important}.story-final{display:none}.story-heading{top:110px}.story-step-text{display:none}}
</style>