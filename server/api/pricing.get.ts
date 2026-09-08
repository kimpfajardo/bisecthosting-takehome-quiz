// GET /api/pricing → the cheapest plan. Cached for 60s (process memory, or Redis when NUXT_REDIS_URL is set)
// so page renders don't touch the database; a DB change shows up within a minute without a redeploy.
export default defineCachedEventHandler(
  async () => {
    const { rows: [row] } = await (await db).execute('SELECT price_cents, currency FROM plans ORDER BY price_cents LIMIT 1');
    if (!row) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'No plans configured' });
    return { price: Number(row.price_cents) / 100, currency: String(row.currency) };
  },
  // Fixed key: query strings can't be used to bust the cache and hammer the DB.
  { name: 'pricing', maxAge: 60, swr: false, getKey: () => 'starting' },
);
