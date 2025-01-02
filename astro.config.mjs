// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://kynsonszetau.com',
  integrations: [tailwind()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      TURNSTILE_SITEKEY: envField.string({
        context: 'client',
        access: 'public',
      }),
      TURNSTILE_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      NOTIFICATION_WEBHOOK_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});