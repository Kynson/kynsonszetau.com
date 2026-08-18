import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const metaSections = defineCollection({
  loader: glob({ base: './src/content/meta', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    order: z.int().min(0)
  })
});

export const collections = { metaSections };
