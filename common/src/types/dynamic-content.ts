import * as z from 'zod/mini';

import { remoteAboutContentSchema } from '../schemas/remote-about-content';

export interface ProjectDetails {
  description?: string | null;
  topics?: string[] | null;
}

export type Projects = Map<string, ProjectDetails>;

export type RemoteAboutContent = z.infer<typeof remoteAboutContentSchema>;

export type Language = RemoteAboutContent['languages'][number] & {
  iconColorBrightness: number;
};

export interface About {
  introduction: RemoteAboutContent['introduction'];
  languages: Language[];
}
