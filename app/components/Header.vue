<template>
  <header class="text-white max-w-[1382px] mx-auto px-[16px] py-[10px] w-full flex items-center justify-between">
    <div class="flex items-center">
      <img src="/bisect-logo.webp" alt="BisectHosting Logo" width="132" height="44"
        class="w-[132px] h-[44px] object-contain" />
      <ul>
        <NavItem label="Game Servers" />
      </ul>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
</script>
