import React from 'react';
import { Target, AlertCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { CaseStudyData } from '@/lib/case-studies/types';

export interface CaseStudyOverviewProps {
  caseStudy: CaseStudyData;
}

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  return (
    <section className="space-y-12 pt-8 border-t border-surface-border/60">
      <div className="space-y-3">
        <Eyebrow >CONTEXT &amp; OBJECTIVES</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-content-primary">
          The Problem &amp; Engineering Purpose
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* The Problem Statement */}
        <div className="p-8 rounded-2xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>The Challenge</span>
          </div>

          <h3 className="text-xl font-display font-bold text-content-primary">
            What was broken?
          </h3>

          <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>

        {/* The Objectives & Scope */}
        <div className="p-8 rounded-2xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center gap-2 text-lime text-xs font-mono uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Project Objectives</span>
          </div>

          <h3 className="text-xl font-display font-bold text-content-primary">
            Target Outcomes
          </h3>

          <ul className="space-y-2.5">
            {caseStudy.objectives.map((obj, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-content-secondary leading-relaxed"
              >
                <span className="font-mono text-lime font-bold text-xs mt-0.5">
                  0{idx + 1}.
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
