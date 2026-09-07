<template>
  <div class="bg-root-bg text-white">
    <Header />
    <main class="px-4 pb-10 pt-[89px]">
      <section class="ml-[96px] flex max-w-[579px] flex-col gap-[33px]">
        <Chip>Cherry Blossom Update</Chip>
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
