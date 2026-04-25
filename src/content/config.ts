import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
});

export const collections = {
  en: defineCollection({ type: 'content', schema: postSchema }),
  ar: defineCollection({ type: 'content', schema: postSchema }),
};
