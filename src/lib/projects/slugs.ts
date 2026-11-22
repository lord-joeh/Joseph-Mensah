/**
 * Centralized Slug Resolution and Mapping for Joseph Mensah's Portfolio Projects.
 * Generates deterministic, stable slugs without requiring a database schema modification.
 */

import type { Project } from '@/lib/api';

/**
 * Standard URL slug generator.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-') // collapse spaces/underscores
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

/**
 * Canonical mapping from recognized project keywords/titles to stable URL slugs.
 */
const CANONICAL_SLUG_MAP: Record<string, string> = {
  agromarket: 'agromarket',
  'ai-powered cv builder': 'cv-builder',
  'cv builder': 'cv-builder',
  'zee essentials': 'zee-essentials',
  'adepa wc mpaboa': 'adepa-wc-mpaboa',
  adepa: 'adepa-wc-mpaboa',
  'the vault': 'the-vault',
  'course representative management system': 'course-rep',
  'course rep': 'course-rep',
  'automated ci/cd infrastructure': 'automated-ci-cd-infrastructure',
  shopease: 'shopease',
  'event ticketing platform': 'event-ticketing-platform',
  'currency converter': 'currency-converter',
  'pizza ordering system': 'pizza-ordering-system',
};

/**
 * Known slug aliases mapping secondary slugs to canonical keys.
 */
export const SLUG_ALIASES: Record<string, string> = {
  adepa: 'adepa-wc-mpaboa',
  'course-representative-management-system': 'course-rep',
  'cv-builder': 'cv-builder',
};

/**
 * Resolve a project's deterministic URL slug.
 */
export function getProjectSlug(projectOrTitle: string | { title: string }): string {
  const title = typeof projectOrTitle === 'string' ? projectOrTitle : projectOrTitle.title;
  const lowerTitle = title.toLowerCase().trim();

  // 1. Direct match in canonical map
  if (CANONICAL_SLUG_MAP[lowerTitle]) {
    return CANONICAL_SLUG_MAP[lowerTitle];
  }

  // 2. Substring match for known keywords
  if (lowerTitle.includes('agro')) return 'agromarket';
  if (lowerTitle.includes('cv') || lowerTitle.includes('resume')) return 'cv-builder';
  if (lowerTitle.includes('zee')) return 'zee-essentials';
  if (lowerTitle.includes('adepa')) return 'adepa-wc-mpaboa';
  if (lowerTitle.includes('vault')) return 'the-vault';
  if (lowerTitle.includes('course') || lowerTitle.includes('representative')) return 'course-rep';
  if (lowerTitle.includes('ci/cd') || lowerTitle.includes('infra')) return 'automated-ci-cd-infrastructure';
  if (lowerTitle.includes('shopease')) return 'shopease';
  if (lowerTitle.includes('ticket')) return 'event-ticketing-platform';
  if (lowerTitle.includes('currency')) return 'currency-converter';
  if (lowerTitle.includes('pizza')) return 'pizza-ordering-system';

  // 3. Fallback to standard slugify
  return slugify(title);
}

/**
 * Find matching project from an API list by slug or title.
 */
export function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
  const normalizedSlug = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();

  return projects.find((p) => {
    const projectSlug = getProjectSlug(p);
    return (
      projectSlug === normalizedSlug ||
      projectSlug === slug.toLowerCase() ||
      p.id === slug
    );
  });
}

/**
 * Canonical list of all known pre-rendered slugs.
 */
export const ALL_CANONICAL_SLUGS: string[] = [
  'agromarket',
  'cv-builder',
  'zee-essentials',
  'adepa-wc-mpaboa',
  'adepa',
  'the-vault',
  'course-rep',
  'automated-ci-cd-infrastructure',
  'shopease',
  'event-ticketing-platform',
  'currency-converter',
  'pizza-ordering-system',
];
