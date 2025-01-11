import renamedHandler from '../../src/handlers/repositoryHandler/renamedHandler';

import {
  generateProjectEntry,
  generateRepositoryWebhookEvent,
} from '../mockDataGenerator';
import { faker } from '@faker-js/faker';

import { test, expect } from 'vitest';

test('renamedHandler should rename an existing project', async () => {
  const projectToBeRenamed = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeRenamed]);

  const newName = faker.lorem.slug();

  expect(
    renamedHandler(
      generateRepositoryWebhookEvent({
        action: 'renamed',
        changesFrom: projectToBeRenamed[0],
        repositoryOptions: {
          name: newName,
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects, [newName, projectToBeRenamed[1]]]));
});
