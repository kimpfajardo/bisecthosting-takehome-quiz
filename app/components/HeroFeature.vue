<template>
  <li class="flex items-start gap-4">
    <CheckIcon aria-hidden="true" class="mt-1" />
    <div class="leading-[200%] tracking-[0]">
      <span class="font-sans text-[18px] font-bold">{{ title }}</span>
      <span class="font-sans text-[18px] font-normal text-[#C5C6E2]">{{ ' ' + description }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
