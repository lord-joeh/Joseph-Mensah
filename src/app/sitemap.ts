import type { MetadataRoute } from 'next';
import { ALL_CANONICAL_SLUGS } from '@/lib/projects/slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mensah.dev-joseph.me';
  const lastModified = new Date();

  const projectEntries: MetadataRoute.Sitemap = ALL_CANONICAL_SLUGS.map((slug) => ({
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
