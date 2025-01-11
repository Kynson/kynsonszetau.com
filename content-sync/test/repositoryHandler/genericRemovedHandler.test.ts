import genericRemovedHandler from '../../src/handlers/repositoryHandler/genericRemovedHandler';

import {
  generateProjectEntry,
  generateRepositoryWebhookEvent,
} from '../mockDataGenerator';
import { faker } from '@faker-js/faker';

import { test, expect } from 'vitest';

test('genericRemovedHandler should remove an existing project', async () => {
  const projectToBeRemoved = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeRemoved]);

  expect(
    genericRemovedHandler(
      generateRepositoryWebhookEvent({
        action: 'deleted',
        repositoryOptions: {
          name: projectToBeRemoved[0],
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects]));
});
