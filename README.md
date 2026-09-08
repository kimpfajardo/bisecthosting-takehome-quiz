# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Dynamic pricing

"Starting at $X/month" is read from a `plans` table (SQLite through libSQL: a local file in dev, [Turso](https://turso.tech)
in production) and exposed by `GET /api/pricing`, which returns the cheapest plan. The page fetches it during SSR, so
the price is in the HTML for crawlers and for the no-JS default mode.

- The database URL and token are read from server-side env vars (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`; default
  `file:.data/pricing.sqlite`) and never reach the browser. The table is created and seeded on first boot.
- The endpoint is cached for 60s (Nitro cache, in memory) so renders don't hit the database. Set `NUXT_REDIS_URL`
  (e.g. `redis://localhost:6379`) to back the cache with Redis instead, shared across instances.
- Change a price with no redeploy through the key-protected endpoint. It also drops the cache entry, so the page
  shows the new price on the next load:

```bash
curl -X PATCH http://localhost:3000/api/plans/Budget \
  -H "Authorization: Bearer <api key>" -H "Content-Type: application/json" \
  -d '{"price_cents": 349}'
```

  Editing the table directly (e.g. `sqlite3 .data/pricing.sqlite "UPDATE plans SET price_cents = 349 WHERE name = 'Budget'"`)
  works too; the page then follows within a minute.

### Giving testers access

1. Mint one key per tester (`openssl rand -hex 16`) and set them comma-separated in `NUXT_API_KEYS` (see `.env.example`).
   Restart the server after changing the list.
2. Send each tester the site URL and their key. They send it as `Authorization: Bearer <key>` or `x-api-key: <key>`.
   `GET /api/pricing` and the page itself need no key. Wrong or missing key → 401, bad body → 400, unknown plan → 404.
3. For Postman, import [`pricing.postman_collection.json`](pricing.postman_collection.json) and fill in the `baseUrl` and
   `apiKey` collection variables. Plans seeded are `Budget` and `Premium`.

## Deploy (Vercel)

Vercel's filesystem is read-only, so production needs Turso for the table. One-time setup:

1. Vercel → Add New → Project → import `kimpfajardo/bisecthosting-takehome-quiz` (pushes to `dev` deploy to production).
2. Project → Storage → Marketplace → **Turso** → install the free plan and connect it to the project. This adds
   `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to the project's environment variables.
3. Settings → Environment Variables: add `NUXT_API_KEYS` (comma-separated tester keys). Optional: `NUXT_REDIS_URL`
   (e.g. an Upstash `rediss://` URL) so the price cache is shared across function instances; without it each instance
   refreshes within 60s. Canonical/og URLs use Vercel's production host automatically (`NUXT_SITE_URL` overrides it).
4. Redeploy. The table is created and seeded on the first request.
