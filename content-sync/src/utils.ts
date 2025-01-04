import { BadRequestError } from './errors';

/**
 * Parses the incomming request to options for `verifyAndReceive()` (`EmitterWebhookEventWithStringPayloadAndSignature`)
 * @param request The incomming request
 * @returns The parsed options to be passed to `verifyAndReceive()`
 */
export async function parseRequestAsVerifyAndReceiveOptions(request: Request) {
  const { headers } = request;
  const deliveryID = headers.get('X-Github-Delivery') ?? '';
  const signature = headers.get('X-Hub-Signature-256') ?? '';
  // The correct type cannot be imported
  // Ref: https://github.com/octokit/webhooks.js/blob/ab71230cc6b30ccc939270a6c029863f5184803b/src/middleware/node/middleware.ts#L98
  const name = (headers.get('X-Github-Event') ?? '') as any;
  const payload = await request.text();

  if (!(deliveryID && signature && name && payload)) {
    throw new BadRequestError('The request is malformed');
  }

  return {
    id: deliveryID,
    signature,
    name,
    payload,
  };
}

export { createResponse, createResponseFromError } from 'cf-workers-utils';
