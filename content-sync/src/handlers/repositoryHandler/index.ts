import type { EmitterWebhookEventPayload } from '../../lib/octokit';

import { fetchProjects, Projects } from './projects';

// import createdOrEditedHandler from './createdOrEditedHandler';
// import renamedHandler from './renamedHandler';
// import deletedHandler from './deletedHandler';

export default async function repositoryHandler(
  eventPayload: EmitterWebhookEventPayload<'repository'>,
  environment: Env
) {
  const { repository } = eventPayload;

  if (repository.private) {
    return;
  }

  const existingProjects = await fetchProjects(environment);

  const { action } = eventPayload;

  let newProjects: Projects = existingProjects;
  switch (action) {
    case 'created':
      // newProjects = createdOrEditedHandler(eventPayload, existingProjects);
      newProjects = {};
      break;
    case 'edited':
      // newProjects = createdOrEditedHandler(eventPayload, existingProjects);
      newProjects = {};
      break;
    case 'renamed':
      // newProjects = renamedHandler(eventPayload, existingProjects);
      newProjects = {};
      break;
    case 'deleted':
      // newProjects = deletedHandler(eventPayload, existingProjects);
      newProjects = {};
      break;
    default:
      break;
  }

  await environment.CONTENT.put('projects', JSON.stringify(newProjects));
}
