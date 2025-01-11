import type { EmitterWebhookEventName } from '@octokit/webhooks';
import type { EmitterWebhookEventPayload } from '../src/lib/octokit';

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

interface GenerateRepositoryWebhookEventOptions<T extends RepositoryActions> {
  action: T;
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

type GenerateProjectEntryOptions = Pick<
  GenerateRepositoryOptions,
  'name' | 'description' | 'topics'
>;

import { Webhooks } from '@octokit/webhooks';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

export type { SupportedEventName, GenerateWebhookEventRequestOptions };

const webhooks = new Webhooks({
  secret: env.WEBHOOK_SECRET,
});

export function generateRepository({
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

/**
 * Generates a fake event sender
 * This function is not configable as none of the event handler depends on the sender
 * @returns The generated sender
 */
function generateWebhookEventSender() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    login: faker.internet.username(),
    id: faker.number.int(),
    node_id: faker.string.alphanumeric(),
    avatar_url: faker.internet.url(),
    gravatar_id: faker.string.alphanumeric(),
    url: faker.internet.url(),
    html_url: faker.internet.url(),
    followers_url: faker.internet.url(),
    following_url: faker.internet.url(),
    gists_url: faker.internet.url(),
    starred_url: faker.internet.url(),
    subscriptions_url: faker.internet.url(),
    organizations_url: faker.internet.url(),
    repos_url: faker.internet.url(),
    events_url: faker.internet.url(),
    received_events_url: faker.internet.url(),
    type: 'User',
    site_admin: faker.datatype.boolean(),
  };
}

export function generateRepositoryWebhookEvent<T extends RepositoryActions>({
  action,
  changesFrom = '',
  repositoryOptions = {},
}: GenerateRepositoryWebhookEventOptions<T>): EmitterWebhookEventPayload<`repository.${T}`> {
  return {
    action,
    ...generateWebhookEventWithRepository(repositoryOptions),
    ...(action === 'renamed' && {
      changes: { repository: { name: { from: changesFrom } } },
    }),
    ...(action === 'transferred' && {
      changes: { owner: { from: { user: { login: changesFrom } } } },
    }),
    sender: generateWebhookEventSender(),
  } as EmitterWebhookEventPayload<`repository.${T}`>;
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

export function generateProjectEntry({
  name = faker.lorem.slug(),
  description = faker.lorem.sentence(),
  topics = faker.helpers.multiple(() => faker.hacker.noun()),
}: GenerateProjectEntryOptions = {}): [
  string,
  { description: string; topics: string[] }
] {
  return [
    name,
    {
      description,
      topics,
    },
  ];
}
