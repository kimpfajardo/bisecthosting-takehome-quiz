<template>
  <span
    class="relative inline-flex h-[34px] w-fit items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(180deg,_#13193C,_#221B4D)] px-4 py-1 text-sm font-bold text-[#D8D8EE] md:text-base"
    v-bind="$attrs">
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-full border border-white mix-blend-soft-light"></span>
    <slot />
  </span>
</template>
