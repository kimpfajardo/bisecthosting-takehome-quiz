# BisectHosting take-home quiz

I built this Minecraft hosting landing page with Nuxt 4 and Tailwind v4, based on the BisectHosting design.
The [live demo](https://bisecthosting-takehome-quiz.vercel.app) has an animated version too; add `?behavior=dynamic` to try it.

## Running locally

The app needs Node.js v22 or v24 and npm. Install the dependencies and copy the environment file:

```bash
npm ci
cp .env.example .env
```

Once `.env` is filled in, `npm run dev` starts the site at http://localhost:3000.
I check the production build with `npm run build` followed by `npm run preview`.

## Environment variables

I keep configuration in `.env`. `NUXT_SITE_URL` is the site's origin, so use `http://localhost:3000` locally.
`NUXT_API_KEYS` holds the comma-separated keys accepted by the price update endpoint.

Hosted storage needs `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` from a Turso database.
Both can stay blank locally. `NUXT_REDIS_URL` is optional; add it to `.env` when using Redis.

PostHog needs `NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NUXT_PUBLIC_POSTHOG_HOST` from its project settings.
The host is `https://us.i.posthog.com` for US projects or `https://eu.i.posthog.com` for EU projects.
Without a token, the page still works with the banner hidden. Local price updates require an API key and both PostHog values.

Restart the app after editing `.env`, and set the PostHog values and site URL before building for production.

## Database and caching

I store prices in cents. On startup, the database initializer creates the pricing table and seeds it with `299` ($2.99),
leaving any existing price alone. Locally, it creates `.data/pricing.sqlite` automatically, so there's no separate database setup.
For hosted storage, create a Turso database and put its URL and auth token in `.env`.

I cache pricing for 60 seconds using Nitro's default storage: files in development and memory in production.
Redis lets server instances share that cache. To try it locally with Docker:

```bash
docker run --rm -d --name bisecthosting-redis -p 127.0.0.1:6379:6379 redis:7-alpine
```

Add `NUXT_REDIS_URL=redis://localhost:6379` to `.env` and restart.
The price update endpoint clears the cache after each write. Without shared Redis, another instance can keep its old price for up to a minute.

## Using the pricing API

I expose the starting price through `GET /api/pricing`. It doesn't need authentication:

```bash
curl http://localhost:3000/api/pricing
```

The response is `200` with JSON such as `{"price":2.99,"currency":"USD"}`.
To change it, send `PATCH /api/pricing` with a key from `NUXT_API_KEYS`. Prices are in cents, so `349` means $3.49:

```bash
curl -X PATCH http://localhost:3000/api/pricing \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"price_cents":349}'
```

A successful update returns `200` with `{"price":3.49,"currency":"USD"}`. Fetch again or reload the homepage to see it.
`Authorization: Bearer YOUR_KEY` also works. A missing or incorrect key returns `401`; a missing, negative, or non-integer `price_cents` returns `400`.
Local updates also need both PostHog variables configured.

To use the deployed API, replace `http://localhost:3000` with `https://bisecthosting-takehome-quiz.vercel.app` and use a key configured there.

## PostHog setup

I use the flag `promo-banner` for the experiment. To [recreate it in PostHog](https://posthog.com/docs/experiments/creating-an-experiment),
use the variants `control` and `test`, split 50/50, with user-level assignment and 100% rollout.
I measure conversion with a Funnel metric ending in `checkout_cta_clicked`, using the default `$feature_flag_called` exposure.
PostHog adds that exposure step automatically.

For local testing, add `http://localhost:3000` in Launch Toolbar and override the flag to try each variant.
Clear the override afterwards. Once the events are coming through, launch the experiment.

## How I implemented the experiment

I'm testing whether showing a 50% off banner gets more visitors to click View All Plans.
`control` hides the banner and `test` shows it. I measure the share of exposed visitors who click, so repeated clicks don't inflate conversions.

I evaluate the flag on the server using the visitor's PostHog ID, then pass the result to the browser so the first render matches.
The browser handles later flag changes and Toolbar overrides. A failed server request falls back to control.

I keep visibility and tracking in `usePromoBanner.ts`. It captures `promo_banner_viewed` when the banner mounts,
`promo_banner_cta_clicked` for Redeem, and `checkout_cta_clicked` for View All Plans.
Exposure is recorded in the browser, and browser requests go through the `/ingest` proxy.
The buttons currently track clicks; I haven't built a checkout flow.
