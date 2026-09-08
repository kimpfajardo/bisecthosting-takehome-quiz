<template>
  <button
    :type="type"
    class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-center text-[12px] font-semibold uppercase leading-none tracking-normal text-white transition-colors focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--color-root-bg),0_0_0_4px_var(--color-brand)] disabled:cursor-not-allowed disabled:opacity-50"
    :class="variant === 'ghost'
      ? 'bg-transparent enabled:hover:bg-accent/20 enabled:active:bg-accent/30'
      : 'bg-accent enabled:hover:bg-accent/90 enabled:active:bg-accent/80'">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'solid' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
}>(), {
  variant: 'solid',
  type: 'button',
});
</script>
