import type { EmitterWebhookEvent } from '@octokit/webhooks';

import parseAboutResponse from './aboutParser';

export default async function pushHandler(
  { payload }: EmitterWebhookEvent<'push'>,
  environment: Env
) {
  const { repository } = payload;

  const aboutResponse = await fetch(
    'https://raw.githubusercontent.com/Kynson/Kynson/main/README.md'
  );

  if (repository.full_name !== 'Kynson/Kynson') {
    return;
  }

  const aboutContent = await parseAboutResponse(aboutResponse);

  await environment.CONTENT.put('about', aboutContent);
}
