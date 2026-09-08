<template>
  <header class="text-white max-w-[1382px] mx-auto px-[16px] py-[10px] w-full flex flex-wrap items-center justify-between relative">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
      <img
        src="/bisect-logo.webp"
        alt="BisectHosting Logo"
        width="132"
        height="44"
        class="w-[132px] h-[44px] object-contain" />
      <ul class="hidden xl:flex flex-wrap items-center uppercase gap-x-12 gap-y-3">
        <NavItem label="Game Servers" />
        <NavItem label="Other Servers" />
        <NavItem label="Learn" />
        <NavItem label="Support" />
      </ul>
    </div>
    <div class="hidden xl:flex gap-6">
      <div class="flex gap-2 p-2 border-2 rounded-base border-shade-light">
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
    <details id="mobile-nav" class="contents">
      <summary
        class="xl:hidden relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        aria-controls="mobile-menu"
        aria-label="Toggle menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </summary>
      <div
        id="mobile-menu"
        class="fixed inset-0 z-40 xl:hidden flex flex-col overflow-y-auto bg-[#0D1129] px-6 pb-10 pt-[10px]">
        <button class="flex h-11 w-fit shrink-0 items-center gap-[10px]">
          <GlobeIcon />
          <span class="font-bold">EN</span>
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
        <ul class="mt-[40px] flex flex-col gap-[25px] uppercase">
          <NavItem label="Game Servers" />
          <NavItem label="Other Servers" />
          <NavItem label="Learn" />
          <NavItem label="Support" />
        </ul>
        <button
          type="button"
          class="mt-6 inline-flex h-[54px] shrink-0 items-center justify-center gap-2 rounded-xl border border-accent text-[12px] font-bold uppercase tracking-wide text-white">
          <BillingIcon aria-hidden="true" />
          Billing
        </button>
      </div>
    </details>
    <slot />
  </header>
</template>

<style>
#mobile-nav::details-content {
  display: contents;
}

#mobile-nav > summary {
  list-style: none;
}

#mobile-nav > summary::-webkit-details-marker {
  display: none;
}

#mobile-nav:not([open]) > summary path:last-child,
#mobile-nav[open] > summary path:first-child {
  display: none;
}

#mobile-menu {
  translate: 100% 0;
  visibility: hidden;
  transition: translate 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
}

#mobile-nav[open] #mobile-menu {
  translate: 0 0;
  visibility: visible;
}

#mobile-menu li {
  gap: 6px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.01em;
}

#mobile-menu li span {
  font-size: inherit;
}

#mobile-menu li svg {
  width: 9px;
  height: auto;
}

@media (max-width: 1279.98px) {
  body:has(#mobile-nav[open]) {
    overflow: hidden;
  }
}

@media (prefers-reduced-motion: reduce) {
  #mobile-menu {
    transition: none;
  }
}
</style>
