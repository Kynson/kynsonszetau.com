import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
} from '@octokit/webhooks';

import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import { Webhooks } from '@octokit/webhooks';

interface OctokitConstructOptions {
  appID: string;
  privateKey: string;
  webhookSecret: string;
  installationID: string;
}

type HandlerFunction<K extends EmitterWebhookEventName> = (
  event: EmitterWebhookEvent<K>
) => unknown;

interface OctokitInitializeOptions<K extends EmitterWebhookEventName>
  extends OctokitConstructOptions {
  webhookHandlerMappings: Record<K, HandlerFunction<K>>;
}

class Octokit {
  // The type of request is not exported
  request: typeof request;
  webhooks: Webhooks;

  constructor({
    appID,
    privateKey,
    webhookSecret,
    installationID,
  }: OctokitConstructOptions) {
    const auth = createAppAuth({
      appId: appID,
      privateKey,
      installationId: installationID,
    });

    this.request = request.defaults({
      request: {
        hook: auth.hook.bind(auth),
      },
    });

    this.webhooks = new Webhooks({
      secret: webhookSecret,
    });
  }
}

export let octokit: Octokit | null = null;

export function initializeOctokit<K extends EmitterWebhookEventName>({
  webhookHandlerMappings,
  ...constructOptions
}: OctokitInitializeOptions<K>) {
  if (octokit) {
    return octokit;
  }

  octokit = new Octokit(constructOptions);

  for (const [webhookName, handler] of Object.entries<HandlerFunction<K>>(
    webhookHandlerMappings
  )) {
    octokit.webhooks.on(webhookName as K, handler);
  }

  return octokit;
}
