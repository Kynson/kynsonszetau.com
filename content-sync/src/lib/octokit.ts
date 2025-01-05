import type {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
} from '@octokit/webhooks';

type EmitterWebhookEventPayload<K extends EmitterWebhookEventName> =
  EmitterWebhookEvent<K>['payload'];

interface OctokitConstructOptions {
  appID: string;
  privateKey: string;
  webhookSecret: string;
  installationID: string;
}

type HandlerFunction<K extends EmitterWebhookEventName> = (
  event: EmitterWebhookEventPayload<K>
) => unknown;

interface OctokitInitializeOptions<T extends EmitterWebhookEventName>
  extends OctokitConstructOptions {
  webhookHandlerMappings: {
    [K in T]: HandlerFunction<K>;
  };
}

import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import { Webhooks } from '@octokit/webhooks';

class Octokit {
  // The type of request is not exported
  request: typeof request;
  webhooks: Webhooks<EmitterWebhookEvent['payload']>;

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
      transform({ payload }) {
        return payload;
      },
    });
  }
}

export type { EmitterWebhookEventPayload };

export let octokit: Octokit | null = null;

export function initializeOctokit<K extends EmitterWebhookEventName>({
  webhookHandlerMappings,
  ...constructOptions
}: OctokitInitializeOptions<K>) {
  if (octokit) {
    return octokit;
  }

  octokit = new Octokit(constructOptions);

  for (const [webhookName, handler] of Object.entries(webhookHandlerMappings)) {
    octokit.webhooks.on(webhookName as K, handler as HandlerFunction<K>);
  }

  return octokit;
}
