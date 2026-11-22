import React from 'react';
import { Wrench, CheckCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { EngineeringChallenge } from '@/lib/case-studies/types';

export interface ChallengeSolutionProps {
  challenges: EngineeringChallenge[];
}

export function ChallengeSolution({ challenges }: ChallengeSolutionProps) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="space-y-12 pt-8 border-t border-surface-border/60">
      <div className="space-y-3">
        <Eyebrow >TECHNICAL HURDLES</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-content-primary">
          Challenges &amp; Engineering Solutions
        </h2>
        <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed">
          Concrete engineering obstacles encountered during delivery and how they were solved.
        </p>
      </div>

      <div className="space-y-6">
        {challenges.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-2xl bg-surface border border-surface-border"
          >
            {/* The Challenge Column */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Challenge 0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-display font-bold text-content-primary">
                {item.challenge}
              </h3>
            </div>

            {/* The Solution Column */}
            <div className="md:col-span-7 space-y-2 border-t md:border-t-0 md:border-l border-surface-border pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-lime text-xs font-mono uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Implemented Solution</span>
              </div>
              <p className="text-sm text-content-secondary leading-relaxed">
                {item.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
