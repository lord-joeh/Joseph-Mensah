import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { KeyFeature } from '@/lib/case-studies/types';

export interface FeatureWalkthroughProps {
  features: KeyFeature[];
  projectTitle: string;
}

export function FeatureWalkthrough({
  features,
  projectTitle,
}: FeatureWalkthroughProps) {
  return (
    <section className="space-y-12 pt-8 border-t border-surface-border/60">
      <div className="space-y-3">
        <Eyebrow variant="dot">PRODUCT EXPERIENCE</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-content-primary">
          Key Features &amp; Capabilities
        </h2>
        <p className="text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed">
          Core user workflows and architectural interactions built into {projectTitle}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-lime">0{idx + 1}</span>
                {feature.tag && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-surface-elevated text-content-muted uppercase tracking-wider">
                    {feature.tag}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-display font-bold text-content-primary group-hover:text-lime transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-content-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-surface-border text-xs font-mono text-content-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
              <span>Verified Implementation</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
