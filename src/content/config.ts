import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
});

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.number().optional(),
  status: z.enum(['read', 'reading', 'want']).default('read'),
  rating: z.number().min(1).max(5).optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  relatedPosts: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export const collections = {
  en: defineCollection({ type: 'content', schema: postSchema }),
  ar: defineCollection({ type: 'content', schema: postSchema }),
  books: defineCollection({ type: 'content', schema: bookSchema }),
};
