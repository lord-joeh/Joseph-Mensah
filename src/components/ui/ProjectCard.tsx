"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { ProjectImage } from './ProjectImage';
import { Eyebrow } from './Eyebrow';

export interface ProjectCardProps {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  year?: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  reverse?: boolean;
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  category,
  year,
  description,
  imageUrl,
  tags = [],
  liveUrl,
  githubUrl,
  featured = false,
  reverse = false,
  className = '',
}: ProjectCardProps) {
  const detailHref = slug ? `/projects/${slug}` : '#';

  if (featured) {
    return (
      <article
        className={cn(
          'group relative rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-500 overflow-hidden p-6 sm:p-8 lg:p-12',
          className
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Media Column */}
          <div className={cn('lg:col-span-7', reverse && 'lg:order-2')}>
            <Link href={detailHref} tabIndex={-1} aria-hidden="true">
              <ProjectImage
                src={imageUrl}
                alt={title}
                aspectRatio="aspect-[16/10]"
                className="shadow-surface-card"
              />
            </Link>
          </div>

          {/* Content Column */}
          <div className={cn('lg:col-span-5 space-y-6', reverse && 'lg:order-1')}>
            <div className="flex items-center gap-3">
              <Eyebrow variant="pill">{category}</Eyebrow>
              {year && <span className="font-mono text-xs text-content-muted">{year}</span>}
            </div>

            <div className="space-y-3">
              <h3 className="text-display-md font-display font-bold text-content-primary group-hover:text-lime transition-colors">
                <Link href={detailHref} className="focus-visible:ring-1 focus-visible:ring-lime rounded-sm">
                  {title}
                </Link>
              </h3>
              <p className="text-content-secondary text-base leading-relaxed">
                {description}
              </p>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-surface-elevated border border-surface-border text-content-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-5 pt-4 border-t border-surface-border">
              {slug && (
                <Link
                  href={detailHref}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-lime hover:underline font-semibold"
                >
                  View Case Study <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-content-primary hover:text-lime transition-colors"
                >
                  Live Preview <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-content-secondary hover:text-content-primary transition-colors"
                >
                  <FaGithub className="w-3.5 h-3.5" /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-500 overflow-hidden h-full',
        className
      )}
    >
      <Link href={detailHref} tabIndex={-1} aria-hidden="true">
        <ProjectImage
          src={imageUrl}
          alt={title}
          aspectRatio="aspect-[16/10]"
          className="border-b border-surface-border rounded-none"
        />
      </Link>

      <div className="p-6 sm:p-8 flex flex-col flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <Eyebrow variant="pill">{category}</Eyebrow>
          {year && <span className="font-mono text-xs text-content-muted">{year}</span>}
        </div>

        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-display font-bold text-content-primary group-hover:text-lime transition-colors">
            <Link href={detailHref} className="focus-visible:ring-1 focus-visible:ring-lime rounded-sm">
              {title}
            </Link>
          </h3>
          <p className="text-content-secondary text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-surface-elevated border border-surface-border text-content-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 mt-auto border-t border-surface-border text-xs font-mono">
          {slug ? (
            <Link
              href={detailHref}
              className="text-lime hover:underline font-semibold inline-flex items-center gap-1"
            >
              Case Study <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime hover:underline font-semibold inline-flex items-center gap-1"
            >
              Live Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-content-muted">Production Build</span>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-secondary hover:text-content-primary inline-flex items-center gap-1"
            >
              <FaGithub className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
