<template>
  <div class="relative min-h-screen bg-root-bg bg-[url('/main-bg.webp')] bg-cover bg-no-repeat bg-top text-white">
    <Header />
    <Banner class="mt-[53px]" />
    <main class="relative mx-auto max-w-[1382px] px-4 pb-10 pt-[76px]">
      <div class="pointer-events-none absolute left-1/2 top-0 w-screen -translate-x-1/2 select-none">
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
      <section class="relative ml-[96px] flex max-w-[579px] flex-col gap-[33px]">
        <img
          src="/minecraft.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute left-full top-[-65px] -ml-[150px] h-[650px] w-[1038.3px] max-w-none rotate-0 opacity-100 select-none" />
        <div class="relative w-fit">
          <Chip>Cherry Blossom Update</Chip>
          <img
            src="/cherry-blossom-1.png"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute left-full top-1/2 ml-[108px] translate-y-[calc(-50%+40px)] select-none" />
        </div>
        <h1
          class="bg-[linear-gradient(0deg,_#FFFFFF,_#FFFFFF),linear-gradient(90.05deg,_rgba(57,71,184,0)_23.88%,_rgba(57,71,184,0.24)_99.95%)] bg-clip-text font-akira-expanded text-[48px] font-bold leading-none tracking-normal text-transparent">
          Hosting<br />
          minecraft has<br />
          never been so<br />
          easy
        </h1>
        <ul class="m-0 flex list-none flex-col gap-[15px] p-0">
          <HeroFeature
            v-for="feature in heroFeatures"
            :key="feature.title"
            v-bind="feature" />
        </ul>
        <div class="flex items-center gap-[23px]">
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
    </main>
  </div>
</template>

<script setup lang="ts">
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
