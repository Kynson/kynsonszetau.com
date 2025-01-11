import repositoryHandler from '../../src/handlers/repositoryHandler';

import {
  generateProjectEntry,
  generateRepositoryWebhookEvent,
} from '../mockDataGenerator';
import { faker } from '@faker-js/faker';

import { env } from 'cloudflare:test';
import { test, expect } from 'vitest';

test.for<'created' | 'publicized' | 'transferred'>([
  'created',
  'publicized',
  'transferred',
])('repositoryHandler should create project for %s event', async (action) => {
  const projectToBeCreated = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects]);

  await env.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(projects))
  );

  const payload = generateRepositoryWebhookEvent({
    action,
    changesFrom: faker.internet.username(),
    repositoryOptions: {
      name: projectToBeCreated[0],
      ...projectToBeCreated[1],
      isPrivate: false,
      isTemplate: false,
    },
  });

  await repositoryHandler(payload, env);

  await expect(env.CONTENT.get('projects')).resolves.toEqual(
    JSON.stringify(
      Object.fromEntries(new Map([...otherProjects, projectToBeCreated]))
    )
  );
});

test.for<'deleted' | 'privatized' | 'transferred'>([
  'deleted',
  'privatized',
  'transferred',
])('repositoryHandler should remove project for %s event', async (action) => {
  const projectToBeRemoved = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeRemoved]);

  await env.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(projects))
  );

  const payload = generateRepositoryWebhookEvent({
    action,
    changesFrom: 'Kynson',
    repositoryOptions: {
      name: projectToBeRemoved[0],
      isPrivate: false,
      isTemplate: false,
    },
  });

  await repositoryHandler(payload, env);

  await expect(env.CONTENT.get('projects')).resolves.toEqual(
    JSON.stringify(Object.fromEntries(new Map([...otherProjects])))
  );
});

test('repositoryHandler should rename project for rename event', async () => {
  const projectToBeRenamed = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeRenamed]);

  const newName = faker.lorem.slug();

  await env.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(projects))
  );

  const payload = generateRepositoryWebhookEvent({
    action: 'renamed',
    changesFrom: projectToBeRenamed[0],
    repositoryOptions: {
      name: newName,
      isPrivate: false,
      isTemplate: false,
    },
  });

  await repositoryHandler(payload, env);

  await expect(env.CONTENT.get('projects')).resolves.toEqual(
    JSON.stringify(
      Object.fromEntries(
        new Map([...otherProjects, [newName, projectToBeRenamed[1]]])
      )
    )
  );
});

test('repositoryHandler should update project for edited event', async () => {
  const projectToBeUpdated = generateProjectEntry();
  const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
  const projects = new Map([...otherProjects, projectToBeUpdated]);

  const newDetails = generateProjectEntry()[1];

  await env.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(projects))
  );

  const payload = generateRepositoryWebhookEvent({
    action: 'edited',
    repositoryOptions: {
      name: projectToBeUpdated[0],
      ...newDetails,
      isPrivate: false,
      isTemplate: false,
    },
  });

  await repositoryHandler(payload, env);

  await expect(env.CONTENT.get('projects')).resolves.toEqual(
    JSON.stringify(
      Object.fromEntries(
        new Map([...otherProjects, [projectToBeUpdated[0], newDetails]])
      )
    )
  );
});

test.for(['private', 'template'])(
  'repositoryHandler should ignore %s repository',
  async (type) => {
    const projectToBeUpdated = generateProjectEntry();
    const otherProjects = faker.helpers.multiple(() => generateProjectEntry());
    const projects = new Map([...otherProjects, projectToBeUpdated]);

    const newDetails = generateProjectEntry()[1];

    await env.CONTENT.put(
      'projects',
      JSON.stringify(Object.fromEntries(projects))
    );

    const payload = generateRepositoryWebhookEvent({
      action: 'edited',
      repositoryOptions: {
        name: projectToBeUpdated[0],
        ...newDetails,
        isPrivate: type === 'private',
        isTemplate: type === 'template',
      },
    });

    await repositoryHandler(payload, env);

    await expect(env.CONTENT.get('projects')).resolves.toEqual(
      JSON.stringify(Object.fromEntries(projects))
    );
  }
);
