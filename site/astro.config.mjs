// @ts-check
import {
  defineConfig,
  envField,
  svgoOptimizer,
  fontProviders,
} from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://kynsonszetau.com',
  session: false,
  integrations: [mdx()],

  adapter: cloudflare({
    imageService: 'compile',
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

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      styles: ['normal'],
      weights: ['100 900'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Fira Code',
      cssVariable: '--font-fira-code',
      styles: ['normal'],
      weights: ['300 700'],
    },
  ],

  experimental: {
    svgOptimizer: svgoOptimizer(),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});