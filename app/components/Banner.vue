<template>
  <div
    class="bn relative mx-auto flex min-h-[71px] lg:h-[71px] w-[calc(100%-2rem)] max-w-[1216px] flex-col items-center justify-between gap-4 rounded bg-[radial-gradient(50%_50%_at_50%_50%,_#B855E7_0%,_#B739F2_100%)] p-4 xl:w-full lg:flex-row lg:gap-0 lg:pb-[10px] lg:pl-[27px] lg:pr-[20px] lg:pt-[11px]">
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded border border-white mix-blend-soft-light"></span>
    <div class="bn-group flex items-center gap-4 md:flex-col md:gap-3 lg:flex-row lg:gap-[41px]">
      <img
        src="/panorama-cherry-blossom.png"
        alt="Panorama Cherry Blossom"
        class="bn-img h-[50px] w-auto min-w-0 max-w-none object-contain select-none" />
      <p class="bn-mob shrink-0 font-sans leading-none md:hidden">
        <span class="block text-[28px] font-bold">50% OFF</span>
        <span class="mt-1 block text-[13px] font-normal">on your first month</span>
      </p>
      <p class="bn-clip hidden text-center font-sans text-[18px] leading-none md:block lg:text-left">
        <span class="bn-text">
          <span class="font-bold">50% OFF</span>
          <span class="font-normal">{{ ' Your First Month of Minecraft Server Hosting' }}</span>
        </span>
      </p>
    </div>
    <div
      v-if="dynamic"
      id="petals"
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-50 overflow-hidden"></div>
    <button
      type="button"
      @mouseenter="hover(true)"
      @mouseleave="hover(false)"
      class="bn-btn inline-flex h-[50px] w-full items-center justify-center rounded bg-white text-[14px] font-bold uppercase leading-none tracking-wide text-[#B739F2] transition-transform duration-300 ease-out hover:-rotate-[0.5deg] hover:scale-105 lg:w-[200px]">
      Redeem
    </button>
  </div>
</template>

<script setup lang="ts">
import sakuraSrc from 'sakura-js/dist/sakura.min.js?url';
import 'sakura-js/dist/sakura.min.css';

// ponytail: sakura-js is a global-only script (no exports), so it's loaded as a <script> tag
const dynamic = useRoute().query.behavior === 'dynamic';
if (dynamic) useHead({ script: [{ src: sakuraSrc, defer: true }] });

const emit = defineEmits<{ hover: [on: boolean] }>();
let sakura: { start(): void; stop(graceful?: boolean): void } | undefined;
const hover = (on: boolean) => {
  emit('hover', on);
  if (!dynamic) return;
  const Sakura = (window as any).Sakura;
  if (!on) return sakura?.stop(true);
  if (sakura) sakura.start();
  else if (Sakura)
    sakura = new Sakura('#petals', {
      delay: 120,
      // sampled from cherry-blossom-1.png / panorama: magenta pinks, not the lib's baby pink
      colors: [
        { gradientColorStart: 'rgba(248,152,248,0.9)', gradientColorEnd: 'rgba(232,72,232,0.9)', gradientColorDegree: 120 },
        { gradientColorStart: 'rgba(248,136,200,0.9)', gradientColorEnd: 'rgba(216,56,216,0.9)', gradientColorDegree: 120 },
      ],
    });
};
</script>

<style>
/* ponytail: ?behavior=dynamic only; pure CSS timeline. Base rules below = final frame, keyframes only add the start state. */
[data-behavior='dynamic'] .bn {
  animation: bn-card 0.4s ease-out both;
}
[data-behavior='dynamic'] .bn-img {
  animation: bn-pop 0.5s 0.35s both;
}

/* < lg: card stretches out from center, image pops, text dashes out from under/behind the image, button pops */
@media (max-width: 1023.98px) {
  [data-behavior='dynamic'] :is(.bn-mob, .bn-clip) {
    overflow: hidden;
  }
  /* clip boxes reach across the gap (net-zero layout) so the text starts hidden behind the image */
  [data-behavior='dynamic'] .bn-mob {
    padding-left: 16px;
    margin-left: -16px;
  }
  [data-behavior='dynamic'] .bn-clip {
    padding-top: 12px;
    margin-top: -12px;
  }
  [data-behavior='dynamic'] .bn-mob > span {
    animation: bn-dash-x 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
  }
  [data-behavior='dynamic'] .bn-text {
    display: block;
    animation: bn-dash-y 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
  }
  [data-behavior='dynamic'] .bn-btn {
    animation: bn-pop 0.45s 1.55s both;
  }
}

@media (min-width: 1024px) {
  [data-behavior='dynamic'] .bn {
    overflow: hidden;
    animation: bn-box 1.4s both;
  }
  [data-behavior='dynamic'] .bn-group {
    position: absolute;
    left: 27px;
    top: 50%;
    translate: 0 -50%;
    animation: bn-align 0.45s ease-in-out 1.45s both;
  }
  [data-behavior='dynamic'] .bn-clip {
    position: absolute;
    left: 100%;
    top: 50%;
    translate: 0 -50%;
    padding-left: 41px;
    overflow: hidden;
    white-space: nowrap;
  }
  [data-behavior='dynamic'] .bn-text {
    display: block;
    /* damped: fast out, long deceleration, no overshoot */
    animation: bn-dash 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.95s both;
  }
  [data-behavior='dynamic'] .bn-btn {
    margin-left: auto;
    animation: bn-pop 0.45s 2.6s both;
  }
}

@keyframes bn-card {
  from { scale: 0 1; opacity: 0; }
}
@keyframes bn-dash-x {
  from { translate: calc(-100% - 16px) 0; }
}
@keyframes bn-dash-y {
  from { translate: 0 calc(-100% - 12px); }
}
/* 0–.35s pill grows from center, hold, .9–1.4s lengthens to full */
@keyframes bn-box {
  0% { max-width: 0; opacity: 0; animation-timing-function: ease-out; }
  25% { max-width: 260px; opacity: 1; }
  64% { max-width: 260px; animation-timing-function: ease-in-out; }
  100% { max-width: 1216px; }
}
@keyframes bn-align {
  from { left: 50%; translate: -50% -50%; }
}
@keyframes bn-dash {
  from { translate: calc(-100% - 41px) 0; }
}
@keyframes bn-pop {
  0% { scale: 0; }
  60% { scale: 1.12; }
  80% { scale: 0.96; }
  100% { scale: 1; }
}

@media (prefers-reduced-motion: reduce) {
  [data-behavior='dynamic'] :is(.bn, .bn *) {
    animation: none;
  }
}
</style>
