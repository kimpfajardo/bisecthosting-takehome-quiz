import { timingSafeEqual } from 'node:crypto';
import { PostHog } from 'posthog-node';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const { publicKey, host } = runtimeConfig.public.posthog;
  if (import.meta.dev && (!publicKey || !host)) {
    const missingVariable = !publicKey
      ? 'NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN'
      : 'NUXT_PUBLIC_POSTHOG_HOST';
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    );
  }

  const given = getHeader(event, 'x-api-key') ?? (getHeader(event, 'authorization') ?? '').replace(/^Bearer /, '');
  const keys = runtimeConfig.apiKeys.split(',').map((k: string) => k.trim()).filter(Boolean);
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

  if (publicKey && host) {
    const posthog = new PostHog(publicKey, {
      host,
      enableExceptionAutocapture: true,
      flushAt: 1,
      flushInterval: 0,
    });
    posthog.capture({
      event: 'pricing_updated',
      properties: {
        price_cents: cents,
        currency: String(row.currency),
      },
    });
    await posthog.shutdown();
  }

  return { price: Number(row.price_cents) / 100, currency: String(row.currency) };
});
