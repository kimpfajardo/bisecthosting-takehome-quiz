export default defineCachedEventHandler(
  async () => {
    const { rows: [row] } = await (await db).execute('SELECT price_cents, currency FROM plans ORDER BY price_cents LIMIT 1');
    if (!row) throw createError({ statusCode: 404, statusMessage: 'Not Found', message: 'No plans configured' });
    return { price: Number(row.price_cents) / 100, currency: String(row.currency) };
  },
  { name: 'pricing', maxAge: 60, swr: false, getKey: () => 'starting' },
);
