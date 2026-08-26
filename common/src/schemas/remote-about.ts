import * as z from 'zod/mini';

export const remoteAboutSchema = z.object({
  introduction: z.string(),
  languages: z.array(
    z.object({
      displayName: z.string(),
      iconSlug: z.string(),
      iconColor: z.string()
    })
  ),
  setup: z.record(z.string(), z.object({
    displayName: z.string(),
    values: z.array(z.object({
      label: z.string(),
      link: z.optional(z.url())
    }))
  }))
});
