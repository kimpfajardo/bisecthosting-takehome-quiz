export default defineCachedEventHandler(
  async () => {
    const { rows: [row] } = await (await db).execute('SELECT price_cents, currency FROM pricing WHERE id = 1');
    return { price: Number(row.price_cents) / 100, currency: String(row.currency) };
  },
  { name: 'pricing', maxAge: 60, swr: false, getKey: () => 'starting' },
);
