<template>
  <div
    class="relative mx-auto flex min-h-[71px] lg:h-[71px] w-[calc(100%-2rem)] max-w-[1216px] flex-col items-center justify-between gap-4 rounded bg-[radial-gradient(50%_50%_at_50%_50%,_#B855E7_0%,_#B739F2_100%)] p-4 xl:w-full lg:flex-row lg:gap-0 lg:pb-[10px] lg:pl-[27px] lg:pr-[20px] lg:pt-[11px]">
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded border border-white mix-blend-soft-light"></span>
    <div class="flex items-center gap-4 md:flex-col md:gap-3 lg:flex-row lg:gap-[41px]">
      <img
        src="/panorama-cherry-blossom.png"
        alt="Panorama Cherry Blossom"
        class="h-[50px] w-auto max-w-none select-none" />
      <p class="font-sans leading-none md:hidden">
        <span class="block text-[28px] font-bold">50% OFF</span>
        <span class="mt-1 block text-[13px] font-normal">on your first month</span>
      </p>
      <p class="hidden text-center font-sans text-[18px] leading-none md:block lg:text-left">
        <span class="font-bold">50% OFF</span>
        <span class="font-normal">{{ ' Your First Month of Minecraft Server Hosting' }}</span>
      </p>
    </div>
    <button
      type="button"
      class="inline-flex h-[50px] w-full items-center justify-center rounded bg-white text-[14px] font-bold uppercase leading-none tracking-wide text-[#B739F2] lg:w-[200px]">
      Redeem
    </button>
  </div>
</template>
