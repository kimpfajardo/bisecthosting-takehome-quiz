<template>
  <li class="flex items-start gap-4">
    <CheckIcon aria-hidden="true" class="mt-1" />
    <div class="leading-[200%] tracking-[0] max-[400px]:flex max-[400px]:flex-col">
      <span class="font-sans text-[16px] font-bold max-[400px]:text-[14px] md:text-[18px]">{{ title }}</span>
      <span class="font-sans text-[16px] font-normal text-[#C5C6E2] max-[400px]:text-[14px] md:text-[18px]">{{ ' ' + description }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
