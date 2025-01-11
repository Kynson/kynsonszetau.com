import {
  parseRepositoryAsProject,
  parseRepositoriesAsProjects,
  fetchPublicProjects,
} from '../../src/handlers/repositoryHandler/projects';
import { initializeOctokit } from '../../src/lib/octokit';

import { generateRepository, generateProjectEntry } from '../mockDataGenerator';

import { test, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

test('parseRepositoryAsProject should parse Repository as Project correctly', () => {
  const repository = generateRepository();
  const { name, description, topics } = repository;

  expect(parseRepositoryAsProject(repository).get(name)).toEqual({
    description,
    topics,
  });
});

test('parseRepositoriesAsProjects should parse Repositories as Projects correctly', () => {
  const repositories = faker.helpers.multiple(() => generateRepository());

  const result = parseRepositoriesAsProjects(repositories);

  for (const repository of repositories) {
    const { name, description, topics } = repository;

    expect(result.get(name)).toEqual({ description, topics });
  }
});

test('fetchPublicProjects should use stored projects from KV if available', async () => {
  const projects = new Map(
    faker.helpers.multiple(() => generateProjectEntry())
  );

  await env.CONTENT.put(
    'projects',
    JSON.stringify(Object.fromEntries(projects))
  );

  await expect(fetchPublicProjects(env)).resolves.toEqual({
    isStale: true,
    projects,
  });
});

test('fetchPublicProjects should fetch projects from Github API if nothing is stored in KV', async () => {
  const { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET, INSTALLATION_ID } = env;

  initializeOctokit({
    appID: APP_ID,
    privateKey: PRIVATE_KEY,
    webhookSecret: WEBHOOK_SECRET,
    installationID: INSTALLATION_ID,
    webhookHandlerMappings: {},
  });

  const result = await fetchPublicProjects(env);

  expect(result.isStale).toBe(false);
  expect(result.projects).toBeInstanceOf(Map);
});
