export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html, { event }) => {
    if (getQuery(event).behavior === 'dynamic') return;

    const strip = (s: string) =>
      s
        .replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script\s*>/gi, '')
        .replace(/<link[^>]*(?:modulepreload|as="script")[^>]*>/gi, '');

    for (const k of ['head', 'bodyPrepend', 'bodyAppend'] as const)
      html[k] = html[k].map(strip);
  });
});
