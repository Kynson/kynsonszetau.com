import type { EmitterWebhookEventPayload } from '../../lib/octokit';

import { fetchPublicProjects, Projects } from './projects';

import genericUpdatedHandler from './genericUpdatedHandler';
import genericRemovedHandler from './genericRemovedHandler';
import renamedHandler from './renamedHandler';
import transferredHandler from './transferredHandler';

export default async function repositoryHandler(
  eventPayload: EmitterWebhookEventPayload<'repository'>,
  environment: Env
) {
  const { repository, action } = eventPayload;
  const { private: isPrivate, is_template: isTemplate } = repository;

  if (isPrivate || isTemplate) {
    return;
  }

  if (action === 'archived' || action === 'unarchived') {
    return;
  }

  const { isStale, projects: existingProjects } = await fetchPublicProjects(
    environment
  );

  if (!isStale) {
    await environment.CONTENT.put(
      'projects',
      JSON.stringify(Object.fromEntries(existingProjects))
    );

    return;
  }

  let newProjects: Projects;
  switch (action) {
    case 'created':
      newProjects = genericUpdatedHandler(eventPayload, existingProjects);
      break;
    case 'edited':
      newProjects = genericUpdatedHandler(eventPayload, existingProjects);
      break;
    case 'publicized':
      newProjects = genericUpdatedHandler(eventPayload, existingProjects);
      break;
    case 'renamed':
      newProjects = renamedHandler(eventPayload, existingProjects);
      break;
    case 'deleted':
      newProjects = genericRemovedHandler(eventPayload, existingProjects);
      break;
    case 'privatized':
      newProjects = genericRemovedHandler(eventPayload, existingProjects);
      break;
    case 'transferred':
      newProjects = transferredHandler(eventPayload, existingProjects);
      break;
    default:
      // This clause should be redundent
      newProjects = new Map();
      break;
  }

  await environment.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(newProjects))
  );
}
