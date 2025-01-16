import { ActionError } from 'astro:actions';
import { TURNSTILE_SECRET } from 'astro:env/server';
import { postJSON } from './utils';

import { logError } from 'common';

export async function verifyTurnstileResponse(
  turnstileResponse: string,
  remoteIP: string | null,
) {
  const verificationResponse = await postJSON(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      secret: TURNSTILE_SECRET,
      response: turnstileResponse,
      ...(remoteIP && { remoteip: remoteIP }),
    },
  );

  const { success: verificationResult } = await verificationResponse.json<{
    success: string;
  }>();
  return verificationResult;
}

export function verifyTurnstileResponseErrorHandler(error: unknown) {
  logError('verifyTurnstileResponse', error);

  // Not returning the error message to the client side to prevent leaking too much information
  throw new ActionError({
    code: 'INTERNAL_SERVER_ERROR',
  });
}
