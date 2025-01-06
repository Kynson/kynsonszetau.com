import type { EmitterWebhookEventPayload } from '../../lib/octokit';

import { fetchPublicProjects, Projects } from './projects';

import createdOrEditedHandler from './createdOrEditedHandler';
import renamedHandler from './renamedHandler';
import deletedHandler from './deletedHandler';

export default async function repositoryHandler(
  eventPayload: EmitterWebhookEventPayload<'repository'>,
  environment: Env
) {
  const { repository, action } = eventPayload;

  if (repository.private) {
    return;
  }

  if (!['created', 'edited', 'renamed', 'deleted'].includes(action)) {
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
      newProjects = createdOrEditedHandler(eventPayload, existingProjects);
      break;
    case 'edited':
      newProjects = createdOrEditedHandler(eventPayload, existingProjects);
      break;
    case 'renamed':
      newProjects = renamedHandler(eventPayload, existingProjects);
      break;
    case 'deleted':
      newProjects = deletedHandler(eventPayload, existingProjects);
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
