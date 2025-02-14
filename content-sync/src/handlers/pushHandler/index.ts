import type { EmitterWebhookEventPayload } from '../../lib/octokit';

import parseAboutResponse from './aboutParser';

export default async function pushHandler(
  { repository }: EmitterWebhookEventPayload<'push'>,
  environment: Env
) {
  if (repository.full_name !== 'Kynson/Kynson') {
    return;
  }

  const aboutResponse = await fetch(
    'https://raw.githubusercontent.com/Kynson/Kynson/main/README.md'
  );

  const aboutContent = await parseAboutResponse(aboutResponse);

  await environment.CONTENT.put('about', aboutContent);
}
