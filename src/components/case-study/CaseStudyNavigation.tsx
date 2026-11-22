import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

export interface CaseStudyNavigationProps {
  nextSlug: string;
  nextTitle: string;
  nextCategory: string;
}

export function CaseStudyNavigation({
  nextSlug,
  nextTitle,
  nextCategory,
}: CaseStudyNavigationProps) {
  return (
    <nav className="pt-16 pb-8 border-t border-surface-border/60 space-y-8" aria-label="Case Study Navigation">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-content-secondary hover:text-lime transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-lime" />
            <span>Return to all projects</span>
          </Link>
        </div>

        <Link
          href={`/projects/${nextSlug}`}
          className="group p-6 sm:p-8 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 w-full sm:w-auto sm:min-w-[340px] flex items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-content-muted uppercase tracking-wider block">
              NEXT CASE STUDY
            </span>
            <p className="font-display font-bold text-lg sm:text-xl text-content-primary group-hover:text-lime transition-colors">
              {nextTitle}
            </p>
            <Eyebrow variant="pill" className="text-[10px] py-0.5">
              {nextCategory}
            </Eyebrow>
          </div>

          <div className="w-10 h-10 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-lime group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </nav>
  );
}
