import { randomUUID } from 'node:crypto';
import { PostHog } from 'posthog-node';

// Evaluates the visitor's variant per request so the HTML already matches it: no flicker, no layout shift.
// Exposure ($feature_flag_called) is sent by the browser instead, so crawlers never count as participants.
export default defineNuxtPlugin(async () => {
  const { publicKey, host } = useRuntimeConfig().public.posthog;
  if (!publicKey) return;
  const state = usePosthogState();
  // posthog-js keeps the visitor id in this cookie; a fresh id becomes theirs once posthog-js boots with it.
  state.value.distinctId = useCookie<{ distinct_id?: string }>(`ph_${publicKey}_posthog`).value?.distinct_id ?? randomUUID();
  // ponytail: 1s cap so a PostHog outage costs one second of TTFB, not the page (falls back to control).
  const client = new PostHog(publicKey, { host, sendFeatureFlagEvent: false, featureFlagsRequestTimeoutMs: 1000 });
  const flags = await client.evaluateFlags(state.value.distinctId, { flagKeys: [PROMO_FLAG] }).catch(() => undefined);
  state.value.flags[PROMO_FLAG] = flags?.getFlag(PROMO_FLAG) ?? false;
});
