interface ProjectDetails {
  description?: string | null;
  topics?: string[] | null;
}

interface RepositoryLike {
  name: string;
  private: boolean;
  is_template?: boolean;
  description?: string | null;
  topics?: string[] | null;
}

type Projects = Map<string, ProjectDetails>;

// Octokit should be initialized at this point
import { octokit } from '../../lib/octokit';

export type { Projects };

export function parseRepositoryAsProject({
  name,
  description,
  topics,
}: RepositoryLike): Projects {
  return new Map([[name, { description, topics }]]);
}

export function parseRepositoriesAsProjects(repositories: RepositoryLike[]) {
  const projects: Projects = new Map();

  for (const { name, description, topics } of repositories) {
    projects.set(name, { description, topics });
  }

  return projects;
}

export async function fetchPublicProjects({ CONTENT }: Env) {
  const rawProjects = await CONTENT.get<[string, ProjectDetails][]>(
    'projects',
    'json',
  );

  if (rawProjects) {
    return {
      isStale: true,
      projects: new Map(rawProjects),
    };
  }

  if (!octokit) {
    throw new Error('An unexpected error occurred');
  }

  // As the octokit does not have permission to list private repo, this API request will only return the public ones
  const { data: rawRepositories } = await octokit.request(
    'GET /users/{username}/repos',
    { username: 'Kynson' }
  );

  const repositories = rawRepositories.filter(
    ({ is_template: isTemplate }) => !isTemplate
  );

  return {
    isStale: false,
    projects: parseRepositoriesAsProjects(repositories),
  };
}
