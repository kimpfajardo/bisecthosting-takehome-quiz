# BisectHosting take-home quiz

BisectHosting Minecraft hosting landing page. I built this using Nuxt 4 and Tailwind v4.

>> Add `?behavior=dynamic` to the URL for the animated version.

## Run it locally

```bash
npm install
npm run dev
```

That's http://localhost:3000. `npm run build` then `npm run preview` serves the production build.

## PostHog A/B test

The 50% banner is a PostHog experiment on the feature flag `promo-banner`: `control` shows no banner, `test` shows it.
The primary metric is a funnel from experiment exposure to `checkout_cta_clicked`, so it counts unique visitors, not clicks.

- `app/plugins/posthog.server.ts` evaluates the flag once per request, so the HTML already matches the visitor's variant.
  No flicker, no layout shift.
- `app/plugins/posthog.client.ts` boots posthog-js from that result and keeps the variant in sync with PostHog Toolbar
  overrides.
- `app/composables/usePromoBanner.ts` is the experiment logic: which variant to show, and the events it tracks
  (`promo_banner_viewed`, `promo_banner_cta_clicked`, `checkout_cta_clicked`).
- `Banner.vue` is plain UI. `app.vue` wires it up.

Events leave through `/ingest`, a reverse proxy to PostHog, so ad blockers don't drop them.

It needs `NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NUXT_PUBLIC_POSTHOG_HOST` (see `.env.example`). Without them the site
runs as the control variant.

**Testing a variant:** launch the PostHog Toolbar on the site, open Feature flags, and set `promo-banner` to `test` or
`control`. The banner updates in place.

## Try it on the live site

The site is at https://bisecthosting-takehome-quiz.vercel.app. Reading is open to everyone. To change anything you'll
need an API key.

**1. Fetching the current price**

```bash
curl https://bisecthosting-takehome-quiz.vercel.app/api/pricing
```

You'll get `{"price":2.99,"currency":"USD"}`, or whatever it is right now. It's the exact value the homepage shows.

**2. Updating the price**

Prices are stored in cents, so $3.49 is `349`. Put your key in an `x-api-key` header (a `Bearer` token in the
`Authorization` header works too):

```bash
curl -X PATCH https://bisecthosting-takehome-quiz.vercel.app/api/pricing \
  -H "x-api-key: YOUR_KEY" -H "Content-Type: application/json" \
  -d '{"price_cents": 349}'
```

A 200 with `{"price":3.49,"currency":"USD"}` means it worked.

**3. Look at the site**

Run the first request again, or reload the homepage. It now says "Starting at $3.49/month". Updates clear the server
cache, so you should see the change straight away. If a reload still shows the old price, you landed on a second server
instance whose cache hasn't expired yet; it sorts itself out within a minute.

I defaulted it to 299 based on the Figma design. When you're done, be kind and set it back to `299`.

**Prefer Postman?**

Two requests to the same URL, `https://bisecthosting-takehome-quiz.vercel.app/api/pricing`. The `GET` needs nothing
else. For the `PATCH`, on the Headers tab add `x-api-key` with your key as the value, and on the Body tab pick raw,
JSON, and type `{"price_cents": 349}`. Send the PATCH, then the GET, and the new price is there.

**Good to know**

- 401 means the key is missing or wrong. 400 means the body isn't `{"price_cents": <whole number>}`.
- Prices can't go negative, but zero is fine. "Starting at $0.00/month" is a real thing you can make the site say 😁