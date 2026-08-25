import * as z from 'zod/mini';

export const remoteAboutContentSchema = z.object({
  introduction: z.string(),
  languages: z.array(
    z.object({
      displayName: z.string(),
      iconSlug: z.string(),
      iconColor: z.string()
    })
  )
});
