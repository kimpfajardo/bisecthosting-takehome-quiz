import posthog from 'posthog-js';

export default defineNuxtPlugin((nuxtApp) => {
  const { publicKey, host } = useRuntimeConfig().public.posthog;
  if (!publicKey) return;
  const state = usePosthogState();
  posthog.init(publicKey, {
    api_host: '/ingest', // first-party proxy (nuxt.config routeRules), so ad blockers don't drop events
    ui_host: host?.replace('.i.posthog.com', '.posthog.com'), // the toolbar talks to the PostHog app, not the proxy
    defaults: '2026-08-30',
    autocapture: false, // only the experiment's own events matter
    disable_surveys: true, // skips a 34 KB chunk the site never uses
    bootstrap: { distinctID: state.value.distinctId, featureFlags: state.value.flags }, // server-evaluated: no flicker
  });
  // Once hydration is done (Suspense resolved), mirror the live flag value, including PostHog Toolbar
  // overrides, into shared state. getFeatureFlag also records the experiment exposure ($feature_flag_called).
  nuxtApp.hook('app:suspense:resolve', () =>
    posthog.onFeatureFlags(() => {
      state.value.flags[PROMO_FLAG] = posthog.getFeatureFlag(PROMO_FLAG) ?? false;
    }),
  );
  return { provide: { posthog } };
});
