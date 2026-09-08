<template>
  <li class="flex items-start gap-4">
    <CheckIcon aria-hidden="true" class="mt-1" />
    <div class="leading-[200%] tracking-[0]">
      <span class="font-sans text-[16px] font-bold md:text-[18px]">{{ title }}</span>
      <span class="font-sans text-[16px] font-normal md:text-[18px] text-[#C5C6E2]">{{ ' ' + description }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
