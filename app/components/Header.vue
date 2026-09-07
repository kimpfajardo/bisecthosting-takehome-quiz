<template>
  <header
    class="text-white max-w-[1382px] mx-auto px-[16px] py-[10px] w-full flex items-center justify-between">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <img
        src="/bisect-logo.webp"
        alt="BisectHosting Logo"
        width="132"
        height="44"
        class="w-[132px] h-[44px] object-contain" />
      <ul class="flex flex-wrap items-center uppercase gap-x-12 gap-y-3">
        <NavItem label="Game Servers" />
        <NavItem label="Other Servers" />
        <NavItem label="Learn" />
        <NavItem label="Support" />
      </ul>
    </div>
    <div class="flex gap-6">
      <div class="flex gap-2 p-2 border-2 rounded border-shade-light">
        <Button variant="ghost">
          <BillingIcon aria-hidden="true" />
          Billing
        </Button>
        <Button>
          <PanelsIcon aria-hidden="true" />
          Panels
          <svg
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
              d="M3.03113 4.53278L6.06222 -1.38672e-05L3.93073e-05 -1.42737e-05L3.03113 4.53278Z"
              fill="white" />
          </svg>
        </Button>
      </div>
      <button class="flex items-center gap-2">
        <GlobeIcon />
        <span class="font-bold">ENGLISH</span>
        <span class="text-sm text-brand">(USD)</span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.85841 4.53278L7.71684 -1.38672e-05L-2.23867e-05 -1.42737e-05L3.85841 4.53278Z"
            fill="#03DDFF" />
        </svg>
      </button>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts"></script>
