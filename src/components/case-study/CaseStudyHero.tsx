import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/button';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { CaseStudyData } from '@/lib/case-studies/types';

export interface CaseStudyHeroProps {
  caseStudy: CaseStudyData;
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <section className="space-y-8 sm:space-y-12">
      {/* Return to projects breadcrumb */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-content-secondary hover:text-lime transition-colors group focus-visible:ring-1 focus-visible:ring-lime rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-lime" />
          <span>Back to selected work</span>
        </Link>
      </div>

      {/* Header text & Actions */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow variant="pill">{caseStudy.category}</Eyebrow>
          <span className="text-xs font-mono text-content-muted">{caseStudy.year}</span>
          <ProjectStatusBadge
            status={caseStudy.status}
            label={caseStudy.statusLabel}
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-display-xl font-display font-black tracking-tight text-content-primary">
            {caseStudy.title}
          </h1>
          <p className="text-xl sm:text-2xl text-lime font-display font-medium">
            {caseStudy.subtitle}
          </p>
        </div>

        <p className="text-base sm:text-lg text-content-secondary max-w-3xl leading-relaxed">
          {caseStudy.overview}
        </p>

        {/* Prototype disclosure alert if applicable */}
        {caseStudy.status === 'prototype' && (
          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-200/90 leading-relaxed max-w-3xl">
            <span className="font-bold uppercase tracking-wider block mb-1 text-amber-300">
              Commercial Client Prototype Disclosure
            </span>
            {caseStudy.statusDescription}
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {caseStudy.liveUrl && (
            <Button
              asChild
              size="lg"
              className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-semibold text-xs uppercase tracking-wider px-6 h-11 shadow-[0_0_20px_rgba(213,255,98,0.22)]"
            >
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          )}

          {caseStudy.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated text-xs font-mono px-5 h-11"
            >
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-surface-border hover:border-lime/40 text-content-secondary hover:text-content-primary text-xs font-mono px-5 h-11"
          >
            <a href="#architecture">Architecture Breakdown ↓</a>
          </Button>
        </div>
      </div>

      {/* Main Hero Visual Showcase */}
      <div className="rounded-2xl overflow-hidden bg-surface border border-surface-border shadow-2xl p-3 sm:p-4 group">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-elevated">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
