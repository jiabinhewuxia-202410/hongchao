import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonFlags = {
  featured: z.boolean().default(false),
  home: z.boolean().default(false),
  order: z.number().default(100),
};

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    url: z.string().url(),
    summary: z.string(),
    description: z.string().default(''),
    reason: z.string().default(''),
    category: z.string(),
    subcategory: z.string().optional(),
    tags: z.array(z.string()).default([]),
    ...commonFlags,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  })
});

const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    summary: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    fileUrl: z.string().optional(),
    fileType: z.string().default('PDF'),
    ...commonFlags,
    publishedAt: z.coerce.date(),
  })
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    summary: z.string(),
    author: z.string().default('红潮'),
    column: z.string().default('红潮随想'),
    tags: z.array(z.string()).default([]),
    ...commonFlags,
    publishedAt: z.coerce.date(),
  })
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    summary: z.string(),
    relatedResources: z.array(z.string()).default([]),
    relatedArticles: z.array(z.string()).default([]),
    home: z.boolean().default(false),
    order: z.number().default(100),
  })
});

export const collections = { resources, library, articles, topics };
