// @ts-check
import { defineConfig } from 'astro/config';

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
});