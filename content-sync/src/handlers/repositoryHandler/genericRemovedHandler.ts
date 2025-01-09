import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

export default function genericRemovedHandler(
  {
    repository,
  }: EmitterWebhookEventPayload<`repository.${
    | 'deleted'
    | 'transferred'
    | 'privatized'}`>,
  existingProjects: Projects
) {
  const newProjects = new Map(existingProjects);
  newProjects.delete(repository.name);

  return newProjects;
}
