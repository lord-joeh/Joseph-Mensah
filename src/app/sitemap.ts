import type { MetadataRoute } from 'next';
import { ALL_CANONICAL_SLUGS, SLUG_ALIASES } from '@/lib/projects/slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mensah.dev-joseph.me';
  const lastModified = new Date();

  // Filter out alias slugs so only true canonical URLs are submitted to search crawlers
  const canonicalSlugs = ALL_CANONICAL_SLUGS.filter(
    (slug) => !SLUG_ALIASES[slug] || SLUG_ALIASES[slug] === slug
  );

  const projectEntries: MetadataRoute.Sitemap = canonicalSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
