import type { CollectionEntry } from 'astro:content';

export const siteName = 'Harty College';
export const siteTagline = 'AI-focused education, research, and innovation in Bangkok.';
export const siteDescription =
  'Harty College is a fictional academic redesign concept built with Astro and Keystatic. The content structure is inspired by public university information, then anonymized for mockup use.';

export const primaryNavigation = [
  { href: '/programs', label: 'Programs' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/research', label: 'Research' },
  { href: '/news', label: 'News' },
  { href: '/events', label: 'Events' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/about', label: 'About' },
] as const;

export const proofMetrics = [
  { value: '06', label: 'Core academic pathways' },
  { value: '05', label: 'Research priorities' },
  { value: '04', label: 'Admissions stages' },
  { value: '01', label: 'Bangkok innovation campus' },
] as const;

export const admissionsSteps = [
  'Create an application account',
  'Choose a program',
  'Submit required materials',
  'Pay the sample application fee',
  'Application review',
  'Interview if required',
  'Receive decision',
  'Confirm enrollment',
] as const;

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

export const compareByDateDesc = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.getTime() - a.data.date.getTime();

export const compareByDateAsc = <T extends { data: { date: Date } }>(a: T, b: T) =>
  a.data.date.getTime() - b.data.date.getTime();

export const compareFaculty = (
  a: CollectionEntry<'faculty'>,
  b: CollectionEntry<'faculty'>
) => {
  if (a.data.sortOrder !== b.data.sortOrder) {
    return a.data.sortOrder - b.data.sortOrder;
  }

  return a.data.name.localeCompare(b.data.name);
};

export const groupPrograms = (programs: CollectionEntry<'programs'>[]) => {
  const order = [
    'Undergraduate',
    'Graduate',
    'Doctoral',
    'Pre-college',
    'Professional',
  ];

  return order
    .map((label) => ({
      label,
      items: programs.filter((program) => program.data.degreeLevel === label),
    }))
    .filter((group) => group.items.length > 0);
};
