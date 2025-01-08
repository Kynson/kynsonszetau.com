import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        miniflare: {
          compatibilityFlags: ['nodejs_compat'],
        },
        wrangler: { configPath: './wrangler.toml' },
      },
    },
  },
});
