import redisDriver from 'unstorage/drivers/redis';

// Opt-in shared cache: with NUXT_REDIS_URL set, cached handlers store in Redis (shared across
// instances, survives restarts) instead of process memory. ioredis ships with Nitro, no extra dep.
export default defineNitroPlugin(async () => {
  const { redisUrl } = useRuntimeConfig();
  if (!redisUrl) return;
  const storage = useStorage();
  await storage.unmount('cache'); // dev mounts an fs-backed cache; replace it
  storage.mount('cache', redisDriver({ url: redisUrl, base: 'cache' }));
});
