import transferredHandler from '../../src/handlers/repositoryHandler/transferredHandler';

import {
  generateProjectEntry,
  generateRepositoryWebhookEvent,
} from '../mockDataGenerator';
import { faker } from '@faker-js/faker';

import { test, expect } from 'vitest';

test('transferredHandler should remove a project if transferred out', async () => {
  const projectToBeTransferred = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeTransferred]);

  expect(
    transferredHandler(
      generateRepositoryWebhookEvent({
        action: 'transferred',
        changesFrom: 'Kynson',
        repositoryOptions: {
          name: projectToBeTransferred[0],
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects]));
});

test('transferredHandler should add a project if transferred in', async () => {
  const projectToBeTransferred = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects]);

  expect(
    transferredHandler(
      generateRepositoryWebhookEvent({
        action: 'transferred',
        changesFrom: faker.internet.username(),
        repositoryOptions: {
          name: projectToBeTransferred[0],
          ...projectToBeTransferred[1],
        },
      }),
      projects
    )
  ).toEqual(new Map([...otherProjects, projectToBeTransferred]));
});
