import type { EmitterWebhookEventName } from '@octokit/webhooks';

interface GenerateRepositoryOptions {
  owner?: string;
  name?: string;
  isPrivate?: boolean;
  isTemplate?: boolean;
  description?: string;
  topics?: string[];
}

type RepositoryActions<T = EmitterWebhookEventName> =
  T extends `repository.${infer S}` ? S : never;
type SupportedEventName = 'push' | `repository.${RepositoryActions}`;

interface GenerateRepositoryWebhookEventOptions {
  action: RepositoryActions;
  changesFrom?: string;
  repositoryOptions?: GenerateRepositoryOptions;
}

interface GenerateWebhookEventRequestOptions {
  eventName: SupportedEventName;
  signPayload?: boolean;
  changesFrom?: string;
  omit?: 'signature' | 'eventName' | 'deliveryID' | 'payload';
  repositoryOptions?: GenerateRepositoryOptions;
}

import { Webhooks } from '@octokit/webhooks';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

export type { SupportedEventName, GenerateWebhookEventRequestOptions };

const webhooks = new Webhooks({
  secret: env.WEBHOOK_SECRET,
});

function generateRepository({
  owner = faker.internet.username(),
  name = faker.lorem.slug(),
  isPrivate = faker.datatype.boolean(),
  isTemplate = faker.datatype.boolean(),
  description = faker.lorem.sentence(),
  topics = faker.helpers.multiple(() => faker.hacker.noun()),
}: GenerateRepositoryOptions = {}) {
  return {
    full_name: `${owner}/${name}`,
    name,
    private: isPrivate,
    is_template: isTemplate,
    description,
    topics,
  };
}

function generateWebhookEventWithRepository(
  repositoryOptions: GenerateRepositoryOptions
) {
  return {
    repository: generateRepository(repositoryOptions),
  };
}

function generateRepositoryWebhookEvent({
  action,
  changesFrom = '',
  repositoryOptions = {},
}: GenerateRepositoryWebhookEventOptions) {
  return {
    action,
    ...generateWebhookEventWithRepository(repositoryOptions),
    ...(action === 'renamed' && {
      changes: { repository: { name: { from: changesFrom } } },
    }),
    ...(action === 'transferred' && {
      changes: { owner: { from: changesFrom } },
    }),
  };
}

export async function generateWebhookEventRequest({
  eventName,
  changesFrom = '',
  signPayload = true,
  omit,
  repositoryOptions = {},
}: GenerateWebhookEventRequestOptions) {
  const payload = JSON.stringify(
    eventName === 'push'
      ? generateWebhookEventWithRepository(repositoryOptions)
      : generateRepositoryWebhookEvent({
          action: eventName.split('.')[1] as RepositoryActions,
          changesFrom,
          repositoryOptions,
        })
  );

  const signature = signPayload
    ? await webhooks.sign(payload)
    : faker.git.commitSha();

  const headers = {
    ...(omit !== 'deliveryID' && { 'X-Github-Delivery': faker.string.uuid() }),
    ...(omit !== 'signature' && { 'X-Hub-Signature-256': signature }),
    ...(omit !== 'eventName' && { 'X-Github-Event': eventName }),
  };

  return new Request(faker.internet.url(), {
    headers,
    ...(omit !== 'payload' && { body: payload }),
    method: 'POST',
  });
}
