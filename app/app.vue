<template>
  <div
    :data-behavior="behavior"
    class="relative min-h-screen overflow-x-clip bg-root-bg bg-[url('/main-bg.webp')] bg-cover bg-no-repeat bg-top text-white">
    <Header />
    <Banner
      v-if="show"
      class="mt-6 xl:mt-[53px]"
      @vue:mounted="track('promo_banner_viewed')"
      @redeem="track('promo_banner_cta_clicked')" />
    <main class="relative mx-auto max-w-[1382px] px-4 pb-10 pt-10 lg:flex lg:items-center lg:gap-6 xl:block xl:pt-[76px]">
      <div
        class="pointer-events-none absolute left-1/2 top-0 hidden w-screen -translate-x-1/2 select-none xl:block">
        <img
          src="/cherry-blossom-3.webp"
          width="198"
          height="457"
          alt=""
          aria-hidden="true"
          class="absolute left-0 -top-[17px]" />
        <img
          src="/cherry-blossom-2.webp"
          width="173"
          height="379"
          alt=""
          aria-hidden="true"
          class="absolute left-[18px] top-[46px]" />
      </div>
      <section class="hero relative flex max-w-[579px] flex-col gap-[33px] lg:shrink-0 xl:ml-[96px]">
        <img
          src="/minecraft.webp"
          width="987"
          height="650"
          alt=""
          aria-hidden="true"
          class="mc pointer-events-none absolute left-full top-[-65px] -ml-[150px] hidden h-[650px] w-[1038.3px] max-w-none rotate-0 select-none transition-opacity duration-500 xl:block" />
        <img
          src="/minecraft-sakura.webp"
          width="1448"
          height="1086"
          alt=""
          aria-hidden="true"
          fetchpriority="low"
          class="mc-sakura pointer-events-none absolute left-full top-[-65px] -ml-[150px] hidden h-[650px] w-[1038.3px] max-w-none object-contain opacity-0 select-none transition-opacity duration-500 xl:block" />
        <div class="relative w-fit">
          <Chip>Cherry Blossom Update</Chip>
          <img
            src="/cherry-blossom-1.webp"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute left-full top-1/2 ml-4 w-[100px] -translate-y-1/2 select-none xl:ml-[108px] xl:w-auto xl:translate-y-[calc(-50%+40px)] aspect-[220/195]" />
        </div>
        <h1
          style="--i: 1"
          class="bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),linear-gradient(90.05deg,_rgba(57,71,184,0)_23.88%,_rgba(57,71,184,0.24)_99.95%)] bg-clip-text font-akira-expanded text-[clamp(26px,6.5vw,36px)] font-bold leading-none tracking-normal text-transparent md:text-[40px] xl:text-[48px]">
          <template v-if="behavior">
            <span class="sr-only">{{ lines.join(' ') }}</span>
            <span aria-hidden="true">
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
            @click="track('checkout_cta_clicked')"
            class="relative isolate inline-flex h-[50px] w-[209px] items-center justify-center rounded-base bg-[radial-gradient(50%_50%_at_50%_50%,_#BB70DE_0%,_#B739F2_100%)] text-sm font-bold uppercase tracking-wide text-white">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 rounded-base border border-white mix-blend-soft-light"></span>
            VIEW ALL PLANS
          </button>
          <span v-if="startingPrice" class="font-sans text-[16px] font-normal leading-[160%] tracking-[0]">
            Starting at
            <span class="font-sans text-[16px] font-bold leading-[160%] tracking-[0]">{{ startingPrice }}/month</span>
          </span>
        </div>
      </section>
      <div
        class="hero-img pointer-events-none relative -ml-[10%] mt-0 w-[120%] select-none md:mx-auto md:-mt-4 md:w-[80%] lg:-ml-[220px] lg:mt-0 lg:w-auto lg:shrink-0 xl:hidden">
        <img
          src="/minecraft.webp"
          alt=""
          aria-hidden="true"
          class="mc w-full max-w-none transition-opacity duration-500 lg:h-[600px] lg:w-auto aspect-[987/650]" />
        <img
          src="/minecraft-sakura.webp"
          width="1448"
          height="1086"
          alt=""
          aria-hidden="true"
          fetchpriority="low"
          class="mc-sakura absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { show, track } = usePromoBanner();

const behavior = computed(() =>
  useRoute().query.behavior === 'dynamic' ? 'dynamic' : undefined,
);

const { data: pricing } = await useFetch('/api/pricing');
const startingPrice = computed(
  () =>
    pricing.value &&
    new Intl.NumberFormat('en-US', { style: 'currency', currency: pricing.value.currency }).format(pricing.value.price),
);
const description = computed(
  () =>
    `The best Minecraft server hosting${startingPrice.value ? ` starting at just ${startingPrice.value}/month` : ''} with unlimited slots, 24/7/365 support, 2,300+ modpacks on one-click installs at 21 locations.`,
);
useSeoMeta({ description, ogDescription: description, twitterDescription: description });

const lines = ['Hosting', 'minecraft has', 'never been so', 'easy'];
let n = 0;
const fold = lines.map((l) => l.split(' ').map((w) => [w, n++] as const));

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
[data-behavior='dynamic']:has(.bn-btn:hover) .mc {
  opacity: 0;
}
[data-behavior='dynamic']:has(.bn-btn:hover) .mc-sakura {
  opacity: 1;
}

.cta {
  container-type: inline-size;
}
@container (width < 427px) {
  .cta > span { order: -1; font-size: 20px; }
  .cta > span > span { font-size: 24px; }
}

[data-behavior='dynamic'] .cta > button {
  transition: scale 0.3s ease-out;
}
[data-behavior='dynamic'] .cta > button:hover {
  scale: 1.03;
}
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
@keyframes sheen {
  to { background-position: 100% 0; }
}

[data-behavior='dynamic'] :is(.hero > div, .hero li) {
  animation: hero-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) calc(0.5s + var(--i, 0) * 0.12s) both;
}

[data-behavior='dynamic'] .hero > h1 {
  background: none;
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
[data-behavior='dynamic'] {
  --finale: 3.2s;
}
@media (max-width: 1023.98px) {
  [data-behavior='dynamic'] {
    --finale: 2.2s;
  }
}
@property --shade {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}
.fold:last-child {
  --shade: #a5a7d0;
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
  animation: hero-img 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.62s backwards;
  translate: calc(var(--mx, 0) * 20px) calc(var(--my, 0) * 20px);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), translate 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

div[data-behavior='dynamic'] {
  isolation: isolate;
  background-image: none;
}
div[data-behavior='dynamic']::before {
  content: '';
  position: absolute;
  inset: -12px -12px 12px;
  z-index: -1;
  background: url('/main-bg.webp') center top / cover no-repeat;
  translate: calc(var(--mx, 0) * -3px) calc(var(--my, 0) * -3px);
  transition: translate 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
