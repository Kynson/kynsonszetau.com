import genericUpdatedHandler from '../../src/handlers/repositoryHandler/genericUpdatedHandler';

import {
  generateProjectEntry,
  generateRepositoryWebhookEvent,
} from '../mockDataGenerator';
import { faker } from '@faker-js/faker';

import { test, expect } from 'vitest';

test('genericUpdatedHandler should create a new project', async () => {
  const projectToBeCreated = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects]);

  expect(
    genericUpdatedHandler(
      generateRepositoryWebhookEvent({
        action: 'created',
        repositoryOptions: {
          name: projectToBeCreated[0],
          ...projectToBeCreated[1],
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects, projectToBeCreated]));
});

test('genericUpdatedHandler should update an existing project', async () => {
  const projectToBeUpdated = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeUpdated]);

  const newDetails = generateProjectEntry()[1];

  expect(
    genericUpdatedHandler(
      generateRepositoryWebhookEvent({
        action: 'edited',
        repositoryOptions: {
          name: projectToBeUpdated[0],
          ...newDetails,
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects, [projectToBeUpdated[0], newDetails]]));
});
