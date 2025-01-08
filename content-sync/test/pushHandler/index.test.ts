import pushHandler from '../../src/handlers/pushHandler';

import { test, expect } from 'vitest';
import { env } from 'cloudflare:test';

test('pushHandler should fetch and put the parsed about into KV', async () => {
  // The follow is sufficient for the pushHandler
  const pushEvent = {
    repository: {
      full_name: 'Kynson/Kynson',
    },
  } as any;

  await pushHandler(pushEvent, env);

  await expect(env.CONTENT.get('about')).resolves.toBeTruthy();
});
