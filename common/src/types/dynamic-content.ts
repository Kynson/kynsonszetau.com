export interface ProjectDetails {
  description?: string | null;
  topics?: string[] | null;
}

export type Projects = Map<string, ProjectDetails>;

export interface LanguageAttributes {
  displayName: string;
  iconSlug: string;
  iconColor: string;
  iconColorBrightness: number;
}

export interface About {
  introduction: string;
  languages: LanguageAttributes[];
}
