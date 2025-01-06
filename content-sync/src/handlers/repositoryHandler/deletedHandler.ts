import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

export default function renamedHandler(
  { repository }: EmitterWebhookEventPayload<'repository.deleted'>,
  existingProjects: Projects
) {
  const newProjects = new Map(existingProjects);
  newProjects.delete(repository.name);

  return newProjects;
}
