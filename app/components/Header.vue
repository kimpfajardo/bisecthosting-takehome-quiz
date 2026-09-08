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
        class="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
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
      <div id="mobile-menu" class="basis-full xl:hidden flex flex-col gap-5 pb-4 pt-2">
        <ul class="flex flex-col gap-3 uppercase">
          <NavItem label="Game Servers" />
          <NavItem label="Other Servers" />
          <NavItem label="Learn" />
          <NavItem label="Support" />
        </ul>
        <div class="flex gap-2 p-2 border-2 rounded-base border-shade-light w-fit">
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

#mobile-nav:not([open]) #mobile-menu,
#mobile-nav:not([open]) > summary path:last-child,
#mobile-nav[open] > summary path:first-child {
  display: none;
}
</style>
