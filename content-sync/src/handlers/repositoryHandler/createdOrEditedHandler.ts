import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

import { parseRepositoryAsProject } from './projects';

export default function createdOrEditedHandler(
  {
    repository,
  }: EmitterWebhookEventPayload<`repository.${'created' | 'edited'}`>,
  existingProjects: Projects
) {
  // // This is a shadow copy, but we will not modify anything in this function thus it is fine
  // return {
  //   ...existingProjects,
  //   ...parseRepositoryAsProject(repository),
  // };
  return new Map([
    ...existingProjects,
    ...parseRepositoryAsProject(repository),
  ]);
}
