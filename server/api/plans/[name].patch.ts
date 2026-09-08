import { timingSafeEqual } from 'node:crypto';

// PATCH /api/plans/:name  { "price_cents": 349 }  with an API key from NUXT_API_KEYS (comma-separated,
// one per tester) sent as `Authorization: Bearer <key>` or `x-api-key: <key>`.
// Updates a plan and drops the cached /api/pricing entry, so the new price shows on the next render.
export default defineEventHandler(async (event) => {
  const given = getHeader(event, 'x-api-key') ?? (getHeader(event, 'authorization') ?? '').replace(/^Bearer /, '');
  const keys = useRuntimeConfig(event).apiKeys.split(',').map((k: string) => k.trim()).filter(Boolean);
  // ponytail: keys live in an env var; move them to a table when you need per-key audit or revoking without a restart.
  if (!keys.some((k: string) => k.length === given.length && timingSafeEqual(Buffer.from(k), Buffer.from(given))))
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const name = getRouterParam(event, 'name') ?? '';
  const cents = (await readBody(event))?.price_cents;
  if (!Number.isInteger(cents) || cents < 0)
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'Body must be { "price_cents": <non-negative integer> }' });

  const { rowsAffected } = await (await db).execute({ sql: 'UPDATE plans SET price_cents = ? WHERE name = ?', args: [cents, name] });
  if (!rowsAffected) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: `No plan named "${name}"` });

  await useStorage('cache').removeItem('nitro:handlers:pricing:starting.json'); // entry written by pricing.get.ts
  return { name, price_cents: cents };
});
