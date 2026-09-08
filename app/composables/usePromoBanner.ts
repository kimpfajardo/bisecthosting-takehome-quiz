export const PROMO_FLAG = 'promo-banner';

type PromoEvent = 'checkout_cta_clicked' | 'promo_banner_cta_clicked' | 'promo_banner_viewed';

export const usePosthogState = () =>
  useState<{ distinctId: string; flags: Record<string, string | boolean> }>('posthog', () => ({ distinctId: '', flags: {} }));

export const usePromoBanner = () => {
  const state = usePosthogState();
  const { $posthog } = useNuxtApp();
  return {
    show: computed(() => state.value.flags[PROMO_FLAG] === 'test'),
    track: (event: PromoEvent) => $posthog?.capture(event),
  };
};
