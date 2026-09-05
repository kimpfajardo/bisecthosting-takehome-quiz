<template>
  <header class="text-white max-w-[1382px] mx-auto px-[16px] py-[10px] w-full flex items-center justify-between">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <img src="/bisect-logo.webp" alt="BisectHosting Logo" width="132" height="44"
        class="w-[132px] h-[44px] object-contain" />
      <ul class="flex flex-wrap items-center uppercase gap-x-12 gap-y-3">
        <NavItem label="Game Servers" />
        <NavItem label="Other Servers" />
        <NavItem label="Learn" />
        <NavItem label="Support" />
      </ul>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
</script>
