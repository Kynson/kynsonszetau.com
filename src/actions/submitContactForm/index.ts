import type { ActionAPIContext } from 'astro:actions';

import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { NOTIFICATION_WEBHOOK_URL } from 'astro:env/server';

import {
  verifyTurnstileResponse,
  verifyTurnstileResponseErrorHandler,
} from './verifyTurnstileResponse';
import { generateNotificationMessageFromTemplate } from './notificationMessage';
import { escape, postJSON } from './utils';

const schema = z.object({
  name: z.string(),
  // Regex copied from https://web.archive.org/web/20241231060604/https://html.spec.whatwg.org/#valid-e-mail-address
  // Use this regex to ensure validation is consistent with browsers' implementations
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    )
    .optional(),
  message: z.string(),
  'cf-turnstile-response': z.string(),
});

async function contactFormSubmitHandler(
  {
    name,
    email,
    message,
    'cf-turnstile-response': turnstileResponse,
  }: z.infer<typeof schema>,
  { request }: ActionAPIContext,
) {
  const requestIP = request.headers.get('CF-Connecting-IP');

  const turnstileVerificationResult = await verifyTurnstileResponse(
    turnstileResponse,
    requestIP,
  ).catch(verifyTurnstileResponseErrorHandler);

  if (!turnstileVerificationResult) {
    throw new ActionError({
      code: 'UNAUTHORIZED',
      message: 'Invalid turnstile response',
    });
  }

  const location = request.cf?.country as string | undefined;

  await postJSON(NOTIFICATION_WEBHOOK_URL, {
    content: generateNotificationMessageFromTemplate(
      name,
      escape(message),
      email,
      requestIP,
      location,
    ),
  });
}

export default defineAction({
  accept: 'form',
  input: schema,
  handler: contactFormSubmitHandler,
});
