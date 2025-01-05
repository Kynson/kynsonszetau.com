interface ProjectDetails {
  description?: string | null;
  language?: string | null;
  tags?: string[];
}

interface RepositoryLike {
  name: string;
  description?: string | null;
  language?: string | null;
}

type Projects = Record<string, ProjectDetails>;

// Octokit should be initialized at this point
import { octokit } from '../../lib/octokit';

export type { Projects };

export function parseRepositoryAsProject({
  name,
  description,
  language,
}: RepositoryLike): Record<string, ProjectDetails> {
  return {
    [name]: {
      description,
      language,
    },
  };
}

export function parseRepositoriesAsProjects(repositories: RepositoryLike[]) {
  const projectEntries: [string, ProjectDetails][] = repositories.map(
    ({ name, description, language }) => {
      return [name, { description, language }];
    }
  );

  return Object.fromEntries<ProjectDetails>(projectEntries);
}

export async function fetchProjects({ CONTENT }: Env) {
  const projects = await CONTENT.get<Record<string, ProjectDetails>>(
    'projects',
    'json'
  );

  if (projects) {
    return projects;
  }

  if (!octokit) {
    throw new Error('An unexpected error occured');
  }

  const { data: repositories } = await octokit.request(
    'GET /users/{username}/repos',
    { username: 'Kynson' }
  );

  return parseRepositoriesAsProjects(repositories);
}
