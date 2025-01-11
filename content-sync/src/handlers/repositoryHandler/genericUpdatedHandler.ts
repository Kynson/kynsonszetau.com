import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

import { parseRepositoryAsProject } from './projects';

export default function genericUpdatedHandler(
  {
    repository,
  }: EmitterWebhookEventPayload<`repository.${
    | 'created'
    | 'edited'
    | 'transferred'
    | 'publicized'}`>,
  existingProjects: Projects
) {
  return new Map([
    ...existingProjects,
    ...parseRepositoryAsProject(repository),
  ]);
}
