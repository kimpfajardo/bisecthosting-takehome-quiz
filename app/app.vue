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
          Hosting<br class="hidden xl:inline" />
          minecraft has<br class="hidden xl:inline" />
          never been so<br class="hidden xl:inline" />
          easy
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
            class="relative inline-flex h-[50px] w-[209px] items-center justify-center rounded bg-[radial-gradient(50%_50%_at_50%_50%,_#BB70DE_0%,_#B739F2_100%)] text-sm font-bold uppercase tracking-wide text-white">
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

/* ponytail: ?behavior=dynamic only. Hero children stagger in by --i (chip 0, h1 1, features 2-4, cta 5; images ride with the h1). */
[data-behavior='dynamic'] :is(.hero > div, .hero > h1, .hero li) {
  animation: hero-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(0.5s + var(--i, 0) * 0.12s) both;
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
  [data-behavior='dynamic'] :is(.hero *, .hero-img) {
    animation: none;
  }
}
</style>
