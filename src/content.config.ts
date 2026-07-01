import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      layoutVariant: z.enum(['standard', 'landing', 'resource']).default('standard'),
      showInNavigation: z.boolean().default(false),
      navigationLabel: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.string(),
      summary: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      featured: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    }),
});

const eventCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
    category: z.string(),
    summary: z.string(),
    registrationHref: z.string().url().nullable().optional(),
    featured: z.boolean().default(false),
  }),
});

const facultyCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/faculty' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      department: z.string(),
      programs: z.array(z.string()).default([]),
      researchAreas: z.array(z.string()).default([]),
      shortBio: z.string(),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      featured: z.boolean().default(false),
      sortOrder: z.number().int().default(100),
    }),
});

const programCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/programs' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      degreeLevel: z.string(),
      area: z.string(),
      duration: z.string(),
      location: z.string(),
      intake: z.string(),
      overview: z.string(),
      outcomes: z.array(z.string()).default([]),
      requirements: z.array(z.string()).default([]),
      curriculumHighlights: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
    }),
});

const researchCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    focusAreas: z.array(z.string()).default([]),
    impactStatement: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  pages: pageCollection,
  news: newsCollection,
  events: eventCollection,
  faculty: facultyCollection,
  programs: programCollection,
  research: researchCollection,
};
