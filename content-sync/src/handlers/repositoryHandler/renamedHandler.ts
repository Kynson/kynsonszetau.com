import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

export default function renamedHandler(
  { changes, repository }: EmitterWebhookEventPayload<'repository.renamed'>,
  existingProjects: Projects
) {
  const originalName = changes.repository.name.from;
  const originalProjectDetails = existingProjects.get(originalName);

  if (!originalProjectDetails) {
    throw new Error('An unexpected error occurred');
  }

  const newProjects = new Map(existingProjects);
  newProjects.set(repository.name, originalProjectDetails);
  newProjects.delete(originalName);

  return newProjects;
}
