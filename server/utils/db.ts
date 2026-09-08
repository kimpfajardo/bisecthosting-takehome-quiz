import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const url = process.env.TURSO_DATABASE_URL || 'file:.data/pricing.sqlite';
const local = url.startsWith('file:');
if (local) mkdirSync(dirname(url.slice(5)), { recursive: true });

export const db = (async () => {
  const { createClient } = await (local ? import('@libsql/client') : import('@libsql/client/web'));
  const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS pricing (
      id          INTEGER PRIMARY KEY CHECK (id = 1),
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      currency    TEXT    NOT NULL DEFAULT 'USD'
    );
    INSERT OR IGNORE INTO pricing (id, price_cents) VALUES (1, 299);
  `);
  return client;
})();
