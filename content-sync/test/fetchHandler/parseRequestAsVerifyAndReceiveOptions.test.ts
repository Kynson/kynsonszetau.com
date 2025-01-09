import type { GenerateWebhookEventRequestOptions } from '../generateWebhookRequest';

import parseRequestAsVerifyAndReceiveOptions from '../../src/handlers/fetchHandler/parseRequestAsVerifyAndReceiveOptions';

import { generateWebhookEventRequest } from '../generateWebhookRequest';

import { test, expect } from 'vitest';

test('parseRequestAsVerifyAndReceiveOptions should parse the request into verifyAndReceiveOptions correctly', async () => {
  const request = await generateWebhookEventRequest({ eventName: 'push' });

  const requestClone = request.clone();
  const { headers } = requestClone;

  await expect(parseRequestAsVerifyAndReceiveOptions(request)).resolves.toEqual(
    {
      id: headers.get('X-Github-Delivery'),
      signature: headers.get('X-Hub-Signature-256'),
      name: headers.get('X-Github-Event'),
      payload: await requestClone.text(),
    }
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

    await expect(
      parseRequestAsVerifyAndReceiveOptions(request)
    ).rejects.toThrow('The request is malformed');
  }
);
