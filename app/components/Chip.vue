<template>
  <span
    class="relative inline-flex h-[34px] w-fit items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(0deg,_var(--color-dark-300,_#12183B),_var(--color-dark-300,_#12183B)),linear-gradient(0deg,_rgba(183,57,242,0.1)_0%,_rgba(183,57,242,0)_100%)] px-4 py-1 text-sm font-bold text-[#D8D8EE] md:text-base"
    v-bind="$attrs">
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-full border border-white mix-blend-soft-light"></span>
    <slot />
  </span>
</template>
