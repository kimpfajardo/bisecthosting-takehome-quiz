<template>
  <div
    :data-behavior="behavior"
    class="relative min-h-screen overflow-x-clip bg-root-bg bg-[url('/main-bg.webp')] bg-cover bg-no-repeat bg-top text-white">
    <Header />
    <Banner class="mt-6 xl:mt-[53px]" @hover="sakura = $event" />
    <main class="relative mx-auto max-w-[1382px] px-4 pb-10 pt-10 lg:flex lg:items-center lg:gap-6 xl:block xl:pt-[76px]">
      <div
        class="pointer-events-none absolute left-1/2 top-0 hidden w-screen -translate-x-1/2 select-none xl:block">
        <img
          src="/cherry-blossom-3.png"
          alt=""
          aria-hidden="true"
          class="absolute left-0 -top-[17px]" />
        <img
          src="/cherry-blossom-2.png"
          alt=""
          aria-hidden="true"
          class="absolute left-[18px] top-[46px]" />
      </div>
      <section class="hero relative flex max-w-[579px] flex-col gap-[33px] lg:shrink-0 xl:ml-[96px]">
        <img
          src="/minecraft.png"
          alt=""
          aria-hidden="true"
          :class="{ 'opacity-0': sakura }"
          class="pointer-events-none absolute left-full top-[-65px] -ml-[150px] hidden h-[650px] w-[1038.3px] max-w-none rotate-0 select-none transition-opacity duration-500 xl:block" />
        <img
          src="/minecraft-sakura.png"
          alt=""
          aria-hidden="true"
          fetchpriority="low"
          :class="{ 'opacity-100': sakura }"
          class="pointer-events-none absolute left-full top-[-65px] -ml-[150px] hidden h-[650px] w-[1038.3px] max-w-none object-contain opacity-0 select-none transition-opacity duration-500 xl:block" />
        <div class="relative w-fit">
          <Chip>Cherry Blossom Update</Chip>
          <img
            src="/cherry-blossom-1.png"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute left-full top-1/2 ml-4 w-[100px] -translate-y-1/2 select-none xl:ml-[108px] xl:w-auto xl:translate-y-[calc(-50%+40px)]" />
        </div>
        <h1
          style="--i: 1"
          class="bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),linear-gradient(90.05deg,_rgba(57,71,184,0)_23.88%,_rgba(57,71,184,0.24)_99.95%)] bg-clip-text font-akira-expanded text-[clamp(26px,6.5vw,36px)] font-bold leading-none tracking-normal text-transparent md:text-[40px] xl:text-[48px]">
          <template v-if="behavior">
            <span class="sr-only">{{ lines.join(' ') }}</span>
            <span aria-hidden="true">
              <!-- the spaces collapse at line starts/ends, so the br lines match the static text at every width -->
              <template v-for="(words, l) in fold" :key="l">
                {{ ' ' }}<br v-if="l" class="hidden xl:inline" />
                <template v-for="[w, i] in words" :key="i">{{ ' ' }}<span class="fold" :style="{ '--w': i }">{{ w }}</span></template>
              </template>
            </span>
          </template>
          <template v-else>
            Hosting<br class="hidden xl:inline" />
            minecraft has<br class="hidden xl:inline" />
            never been so<br class="hidden xl:inline" />
            easy
          </template>
        </h1>
        <ul class="m-0 flex list-none flex-col gap-[15px] p-0">
          <HeroFeature
            v-for="(feature, i) in heroFeatures"
            :key="feature.title"
            :style="{ '--i': i + 2 }"
            v-bind="feature" />
        </ul>
        <div style="--i: 5" class="cta flex flex-wrap items-center gap-[23px]">
          <button
            type="button"
            class="relative isolate inline-flex h-[50px] w-[209px] items-center justify-center rounded bg-[radial-gradient(50%_50%_at_50%_50%,_#BB70DE_0%,_#B739F2_100%)] text-sm font-bold uppercase tracking-wide text-white">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 rounded border border-white mix-blend-soft-light"></span>
            VIEW ALL PLANS
          </button>
          <span class="font-sans text-[16px] font-normal leading-[160%] tracking-[0]">
            Starting at
            <span class="font-sans text-[16px] font-bold leading-[160%] tracking-[0]">$2.99/month</span>
          </span>
        </div>
      </section>
      <div
        class="hero-img pointer-events-none relative -ml-[10%] mt-0 w-[120%] select-none md:mx-auto md:-mt-4 md:w-[80%] lg:-ml-[220px] lg:mt-0 lg:w-auto lg:shrink-0 xl:hidden">
        <img
          src="/minecraft.png"
          alt=""
          aria-hidden="true"
          :class="{ 'opacity-0': sakura }"
          class="w-full max-w-none transition-opacity duration-500 lg:h-[600px] lg:w-auto" />
        <img
          src="/minecraft-sakura.png"
          alt=""
          aria-hidden="true"
          fetchpriority="low"
          :class="{ 'opacity-100': sakura }"
          class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const behavior = computed(() =>
  useRoute().query.behavior === 'dynamic' ? 'dynamic' : undefined,
);

// Redeem hover crossfades the hero render to the sakura one
const sakura = ref(false);

// ponytail: reactbits FoldText (top hinge) as SSR spans + CSS keyframes, no gsap; --w = word index for the stagger.
// Split by word, not char: inline-block chars lose the font's kerning (title came out 6% narrower)
const lines = ['Hosting', 'minecraft has', 'never been so', 'easy'];
let n = 0;
const fold = lines.map((l) => l.split(' ').map((w) => [w, n++] as const));

// ponytail: mouse gravity = two CSS vars + CSS transitions, no rAF loop
onMounted(() => {
  if (behavior.value !== 'dynamic' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      const s = document.documentElement.style;
      s.setProperty('--mx', String((e.clientX / innerWidth) * 2 - 1));
      s.setProperty('--my', String((e.clientY / innerHeight) * 2 - 1));
    },
    { passive: true },
  );

  // ponytail: "easy" shimmer = two quick passes of the band layer ("shine-shine"), once with the finale, then at random 3–8s intervals.
  // WAAPI, so the finale keyframes and the re-sweeps share one definition
  const easy = document.querySelector<HTMLElement>('.fold:last-child');
  if (easy) {
    const band = (x: string, offset?: number) => ({ backgroundPosition: `${x} 0, 0 0`, offset, easing: 'ease-in-out' });
    const shine = () =>
      easy.animate([band('150%'), band('-50%', 0.4), band('150%', 0.4), band('150%', 0.5), band('-50%', 0.9), band('-50%')], 1400);
    const again = () => {
      shine();
      setTimeout(again, 3000 + Math.random() * 5000);
    };
    easy.addEventListener('animationstart', (e) => e.animationName === 'easy-in' && shine());
    easy.addEventListener('animationend', (e) => {
      if (e.animationName === 'easy-in') setTimeout(again, 3000 + Math.random() * 5000);
    });
  }
});

const heroFeatures = [
  {
    title: 'Instant Setup.',
    description: 'Game servers are ready to join in seconds.',
  },
  {
    title: 'Modern Hardware.',
    description: 'Using only the best Ryzen CPUs',
  },
  {
    title: 'Real Support.',
    description: '24/7/365 real-human support.',
  },
];
</script>

<style>
/* price line: bigger + first only when the row is too narrow for button + gap + 16px text (209 + 23 + 195) */
.cta {
  container-type: inline-size;
}
@container (width < 427px) {
  .cta > span { order: -1; font-size: 20px; }
  .cta > span > span { font-size: 24px; }
}

/* View All Plans hover (dynamic only): a moving linear sheen fades in over the radial base (button is `isolate`, so -1 sits under the text) */
[data-behavior='dynamic'] .cta > button::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(110deg, #B739F2, #BB70DE 30%, #EA6EF2 50%, #BB70DE 70%, #B739F2) 0 0 / 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
  animation: sheen 1.6s ease-in-out infinite alternate paused;
}
[data-behavior='dynamic'] .cta > button:hover::before {
  opacity: 1;
  animation-play-state: running;
}
[data-behavior='dynamic'] .cta > button {
  transition: scale 0.3s ease-out;
}
[data-behavior='dynamic'] .cta > button:hover {
  scale: 1.03;
}
@keyframes sheen {
  to { background-position: 100% 0; }
}

/* ponytail: ?behavior=dynamic only. Hero children stagger in by --i (chip 0, h1 1, features 2-4, cta 5; images ride with the h1). */
[data-behavior='dynamic'] :is(.hero > div, .hero li) {
  animation: hero-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(0.5s + var(--i, 0) * 0.12s) both;
}

/* Fold text (h1 slot, then 80ms per word): each word hangs folded back from its top edge and swings down while its crease shadow fades */
[data-behavior='dynamic'] .hero > h1 {
  background: none; /* the design's clipped gradient is opaque white anyway, and 3D children can't clip to it */
  color: #fff;
}
.fold {
  --t: 0.65s cubic-bezier(0.215, 0.61, 0.355, 1) calc(0.5s + var(--i) * 0.12s + var(--w) * 0.08s) both;
  position: relative;
  display: inline-block;
  transform-origin: 50% 0;
  backface-visibility: hidden;
  animation: fold var(--t);
}
.fold::after {
  content: '';
  position: absolute;
  inset: -0.08em -0.02em;
  border-radius: 0.08em;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.22) 42%, rgba(255, 255, 255, 0.26));
  mix-blend-mode: multiply;
  opacity: 0;
  animation: fold-crease var(--t);
}
/* "easy" finale, after the last entrance (Redeem pops in at 3.05s on lg+, 2s below): grows to the full h1 width (real font-size, so the
   lines below get pushed down), tilts 0.5° ccw (`rotate`, since the fold keyframes own `transform`), the face shades white→gray and the
   shimmer band (top background layer) sweeps once; script re-sweeps it at random afterwards */
[data-behavior='dynamic'] {
  --finale: 3.2s;
}
@media (max-width: 1023.98px) {
  [data-behavior='dynamic'] {
    --finale: 2.2s;
  }
}
@property --shade {
  /* registered so the gray fades in; gradients themselves don't interpolate */
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}
.fold:last-child {
  --shade: #a5a7d0;
  /* h1 width is min(100vw - main's px-4, the section's max-w) at every breakpoint, and "EASY" is 3.6em wide in Akira Expanded */
  font-size: calc(min(100vw - 32px, 579px) / 3.6);
  rotate: -1deg;
  color: transparent;
  background: linear-gradient(110deg, #0000 40%, #fffd 50%, #0000 60%) 150% 0 / 250% 100% no-repeat, linear-gradient(#fff 30%, var(--shade));
  -webkit-background-clip: text;
  background-clip: text;
  animation: fold var(--t), easy-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) var(--finale) both;
}
@keyframes easy-in {
  from { font-size: 1em; rotate: 0deg; --shade: #fff; }
}
@keyframes fold {
  from { opacity: 0; transform: perspective(700px) rotateX(-92deg); }
  to { transform: perspective(700px) rotateX(0); }
}
@keyframes fold-crease {
  from { opacity: 0.55; }
}
[data-behavior='dynamic'] :is(.hero > img, .hero-img) {
  /* filter, not opacity: the sakura crossfade owns opacity; backwards fill frees translate for the parallax */
  animation: hero-img 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.62s backwards;
}

/* Mouse gravity: --mx/--my (-1..1, set on <html> in script). Hero render is attracted, background gently repelled */
div[data-behavior='dynamic'] {
  isolation: isolate;
  background-image: none;
}
div[data-behavior='dynamic']::before {
  content: '';
  position: absolute;
  inset: -12px -12px 12px; /* x overflow is clipped by the root; bottom stays inside so the page never grows */
  z-index: -1;
  background: url('/main-bg.webp') center top / cover no-repeat;
  translate: calc(var(--mx, 0) * -3px) calc(var(--my, 0) * -3px);
  transition: translate 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-behavior='dynamic'] :is(.hero > img, .hero-img) {
  translate: calc(var(--mx, 0) * 20px) calc(var(--my, 0) * 20px);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), translate 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes hero-in {
  from { opacity: 0; translate: 0 16px; }
}
@keyframes hero-img {
  from { filter: opacity(0); translate: 0 16px; }
}
@media (prefers-reduced-motion: reduce) {
  [data-behavior='dynamic'] :is(.hero *, .hero-img),
  .fold::after,
  .cta > button::before {
    animation: none;
  }
}
</style>
