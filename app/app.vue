<template>
  <div
    :data-behavior="behavior"
    class="relative min-h-screen overflow-x-clip bg-root-bg bg-[url('/main-bg.webp')] bg-cover bg-no-repeat bg-top text-white">
    <Header />
    <Banner class="mt-6 xl:mt-[53px]" />
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
      <section class="relative flex max-w-[579px] flex-col gap-[33px] lg:shrink-0 xl:ml-[96px]">
        <img
          src="/minecraft.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute left-full top-[-65px] -ml-[150px] hidden h-[650px] w-[1038.3px] max-w-none rotate-0 opacity-100 select-none xl:block" />
        <div class="relative w-fit">
          <Chip>Cherry Blossom Update</Chip>
          <img
            src="/cherry-blossom-1.png"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute left-full top-1/2 ml-4 w-[100px] -translate-y-1/2 select-none xl:ml-[108px] xl:w-auto xl:translate-y-[calc(-50%+40px)]" />
        </div>
        <h1
          class="bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),linear-gradient(90.05deg,_rgba(57,71,184,0)_23.88%,_rgba(57,71,184,0.24)_99.95%)] bg-clip-text font-akira-expanded text-[clamp(26px,6.5vw,36px)] font-bold leading-none tracking-normal text-transparent md:text-[40px] xl:text-[48px]">
          Hosting<br class="hidden xl:inline" />
          minecraft has<br class="hidden xl:inline" />
          never been so<br class="hidden xl:inline" />
          easy
        </h1>
        <ul class="m-0 flex list-none flex-col gap-[15px] p-0">
          <HeroFeature
            v-for="feature in heroFeatures"
            :key="feature.title"
            v-bind="feature" />
        </ul>
        <div class="flex flex-wrap items-center gap-[23px]">
          <button
            type="button"
            class="relative inline-flex h-[50px] w-[209px] items-center justify-center rounded bg-[radial-gradient(50%_50%_at_50%_50%,_#BB70DE_0%,_#B739F2_100%)] text-sm font-bold uppercase tracking-wide text-white">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 rounded border border-white mix-blend-soft-light"></span>
            VIEW ALL PLANS
          </button>
          <span class="font-sans text-[14px] font-normal leading-[160%] md:text-[16px] tracking-[0]">
            Starting at
            <span class="font-sans text-[14px] font-bold leading-[160%] md:text-[16px] tracking-[0]">$2.99/month</span>
          </span>
        </div>
      </section>
      <img
        src="/minecraft.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none -ml-[10%] mt-0 w-[120%] max-w-none select-none md:mx-auto md:-mt-4 md:w-[80%] lg:-ml-[220px] lg:mt-0 lg:h-[600px] lg:w-auto lg:shrink-0 xl:hidden" />
    </main>
  </div>
</template>

<script setup lang="ts">
const behavior = computed(() =>
  useRoute().query.behavior === 'dynamic' ? 'dynamic' : undefined,
);

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
