import type { EmitterWebhookEventPayload } from '../../lib/octokit';
import type { Projects } from './projects';

import genericUpdatedHandler from './genericUpdatedHandler';
import genericRemovedHandler from './genericRemovedHandler';

export default function transferredHandler(
  eventPayload: EmitterWebhookEventPayload<'repository.transferred'>,
  existingProjects: Projects
) {
  const { user } = eventPayload.changes.owner.from;

  if (user?.login === 'Kynson') {
    return genericRemovedHandler(eventPayload, existingProjects);
  }

  return genericUpdatedHandler(eventPayload, existingProjects);
}
