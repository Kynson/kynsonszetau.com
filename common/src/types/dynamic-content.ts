import * as z from 'zod/mini';

import { remoteAboutSchema } from '../schemas/remote-about';

export interface ProjectDetails {
  description?: string | null;
  topics?: string[] | null;
}

export type Projects = Map<string, ProjectDetails>;

export type RemoteAbout = z.infer<typeof remoteAboutSchema>;

export type Language = RemoteAbout['languages'][number] & {
  iconColorBrightness: number;
};

export type SetupItem = RemoteAbout['setup'][string];
export type Setup = SetupItem[];

export interface About {
  introduction: RemoteAbout['introduction'];
  languages: Language[];
  setup: Setup;
}
