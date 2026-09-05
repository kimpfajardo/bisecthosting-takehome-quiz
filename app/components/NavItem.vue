<template>
  <li class="flex items-center gap-[5px] cursor-pointer">
    <NuxtLink v-if="to" :to="to" class="flex items-center gap-[5px]">
      <slot name="prefix" />
      <slot>
        <span class="text-sm">{{ label }}</span>
      </slot>
      <slot name="icon">
        <svg
          v-if="hasDropdown"
          width="7"
          height="5"
          viewBox="0 0 7 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.0311 4.53279L6.06219 1.39158e-06L8.78972e-06 9.85114e-07L3.0311 4.53279Z"
            :fill="arrowColor"
          />
        </svg>
      </slot>
    </NuxtLink>
    <a v-else-if="href" :href="href" class="flex items-center gap-[5px]">
      <slot name="prefix" />
      <slot>
        <span class="text-sm">{{ label }}</span>
      </slot>
      <slot name="icon">
        <svg
          v-if="hasDropdown"
          width="7"
          height="5"
          viewBox="0 0 7 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.0311 4.53279L6.06219 1.39158e-06L8.78972e-06 9.85114e-07L3.0311 4.53279Z"
            :fill="arrowColor"
          />
        </svg>
      </slot>
    </a>
    <template v-else>
      <slot name="prefix" />
      <slot>
        <span class="text-sm">{{ label }}</span>
      </slot>
      <slot name="icon">
        <svg
          v-if="hasDropdown"
          width="7"
          height="5"
          viewBox="0 0 7 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.0311 4.53279L6.06219 1.39158e-06L8.78972e-06 9.85114e-07L3.0311 4.53279Z"
            :fill="arrowColor"
          />
        </svg>
      </slot>
    </template>
  </li>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  to?: string
  href?: string
  hasDropdown?: boolean
  arrowColor?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  to: '',
  href: '',
  hasDropdown: true,
  arrowColor: '#03DDFF',
})
</script>
