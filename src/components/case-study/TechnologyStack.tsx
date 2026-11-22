import React from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

export interface TechnologyStackProps {
  technologies: string[];
}

export function TechnologyStack({ technologies }: TechnologyStackProps) {
  return (
    <section className="space-y-8 pt-8 border-t border-surface-border/60">
      <div className="space-y-2">
        <Eyebrow >TOOLS &amp; DEPENDENCIES</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
          Verified Technology Stack
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-xs sm:text-sm font-mono text-content-primary hover:border-lime/40 transition-colors select-none"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
