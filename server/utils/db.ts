import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// ponytail: libSQL is SQLite. Dev uses a local file; production uses Turso through the env vars its Vercel
// integration injects (TURSO_DATABASE_URL / TURSO_AUTH_TOKEN). Read server-side only, never sent to the browser.
const url = process.env.TURSO_DATABASE_URL || 'file:.data/pricing.sqlite';
const local = url.startsWith('file:');
if (local) mkdirSync(dirname(url.slice(5)), { recursive: true });

// The `web` build reaches Turso over HTTP/WebSocket with no native binding, which serverless needs;
// the full build (native SQLite) is only loaded for the local file. Resolves once the table is seeded.
export const db = (async () => {
  const { createClient } = await (local ? import('@libsql/client') : import('@libsql/client/web'));
  const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS plans (
      name        TEXT    PRIMARY KEY,
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      currency    TEXT    NOT NULL DEFAULT 'USD'
    );
    INSERT OR IGNORE INTO plans (name, price_cents) VALUES ('Budget', 299), ('Premium', 799);
  `);
  return client;
})();
