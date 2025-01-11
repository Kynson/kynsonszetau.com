import type {
  SupportedEventName,
  GenerateWebhookEventRequestOptions,
} from '../mockDataGenerator';

import fetchHandler from '../../src/handlers/fetchHandler';

import { generateWebhookEventRequest } from '../mockDataGenerator';
import { createResponse } from 'cf-workers-utils';

import { env } from 'cloudflare:test';
import { test, expect } from 'vitest';
import { faker } from '@faker-js/faker';

test.for<{ eventName: SupportedEventName; changesFrom?: string }>([
  { eventName: 'push' },
  { eventName: 'repository.created' },
  { eventName: 'repository.edited' },
  { eventName: 'repository.deleted' },
  { eventName: 'repository.renamed', changesFrom: faker.lorem.slug() },
  { eventName: 'repository.transferred', changesFrom: 'Kynson' },
  {
    eventName: 'repository.transferred',
    changesFrom: faker.internet.username(),
  },
  { eventName: 'repository.privatized' },
  { eventName: 'repository.publicized' },
])(
  'fetchHandler should response 204 for valid request with $eventName event',
  async ({ eventName, changesFrom }) => {
    const request = await generateWebhookEventRequest({
      eventName,
      changesFrom,
    });

    await expect(fetchHandler(request, env)).resolves.toEqual(
      createResponse(null, 204)
    );
  }
);

test('fetchHandler should reject unsigned request', async () => {
  const request = await generateWebhookEventRequest({
    eventName: 'push',
    signPayload: false,
  });

  // The message is dependent on @octokit/webhooks
  await expect(fetchHandler(request, env)).rejects.toThrow(
    '[@octokit/webhooks] signature does not match event payload and secret'
  );
});

test.for<GenerateWebhookEventRequestOptions['omit']>([
  'deliveryID',
  'signature',
  'eventName',
  'payload',
])(
  'fetchHandler should reject request with missing %s',
  async (fieldToOmit) => {
    const request = await generateWebhookEventRequest({
      eventName: 'push',
      omit: fieldToOmit,
    });

    await expect(fetchHandler(request, env)).rejects.toThrow(
      'The request is malformed'
    );
  }
);
