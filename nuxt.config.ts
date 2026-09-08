import tailwindcss from '@tailwindcss/vite'

// Absolute origin for canonical/og URLs; Vercel provides its production host at build time.
const site = process.env.NUXT_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
const title = 'Minecraft Server Hosting & Game Servers | BisectHosting'
const image = `${site}/og.jpg`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  // Server-only (never sent to the browser). Set via NUXT_REDIS_URL / NUXT_API_KEYS.
  runtimeConfig: { redisUrl: '', apiKeys: '' },
  app: {
    head: {
      title,
      meta: [
        { name: 'keywords', content: 'bisecthosting, bisect hosting, minecraft server hosting, minecraft hosting, dedicated minecraft server, minecraft host, best minecraft hosting' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#020525' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'BisectHosting' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: title },
        { property: 'og:url', content: site || '/' },
        { property: 'og:image', content: image },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Hosting Minecraft has never been so easy — from $2.99/month' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image', content: image }
      ],
      link: [
        { rel: 'canonical', href: site || '/' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' }
      ]
    }
  }
})
