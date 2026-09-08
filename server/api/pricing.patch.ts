import { timingSafeEqual } from 'node:crypto';

export default defineEventHandler(async (event) => {
  const given = getHeader(event, 'x-api-key') ?? (getHeader(event, 'authorization') ?? '').replace(/^Bearer /, '');
  const keys = useRuntimeConfig(event).apiKeys.split(',').map((k: string) => k.trim()).filter(Boolean);
  if (!keys.some((k: string) => k.length === given.length && timingSafeEqual(Buffer.from(k), Buffer.from(given))))
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const cents = (await readBody(event))?.price_cents;
  if (!Number.isInteger(cents) || cents < 0)
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: 'Body must be { "price_cents": <non-negative integer> }' });

  const { rows: [row] } = await (await db).execute({
    sql: 'UPDATE pricing SET price_cents = ? WHERE id = 1 RETURNING price_cents, currency',
    args: [cents],
  });
  await useStorage('cache').removeItem('nitro:handlers:pricing:starting.json');
  return { price: Number(row.price_cents) / 100, currency: String(row.currency) };
});
