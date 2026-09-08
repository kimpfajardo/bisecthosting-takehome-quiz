import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin(async () => {
  const { redisUrl } = useRuntimeConfig();
  if (!redisUrl) return;
  const storage = useStorage();
  await storage.unmount('cache'); // dev mounts an fs-backed cache; replace it
  storage.mount('cache', redisDriver({ url: redisUrl, base: 'cache' }));
});
