import React from 'react';
import { Smartphone, Server, Database, Cloud } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { ArchitectureDetails } from '@/lib/case-studies/types';

export interface ArchitectureDiagramProps {
  architecture: ArchitectureDetails;
  projectTitle: string;
}

export function ArchitectureDiagram({
  architecture,
  projectTitle,
}: ArchitectureDiagramProps) {
  const tiers = [
    {
      title: 'Client Architecture',
      icon: Smartphone,
      accent: 'text-sky-400',
      items: architecture.frontend,
    },
    {
      title: 'Backend & Services',
      icon: Server,
      accent: 'text-lime',
      items: architecture.backend,
    },
    {
      title: 'Database & Caching',
      icon: Database,
      accent: 'text-amber-400',
      items: architecture.database,
    },
    {
      title: 'Infrastructure & DevOps',
      icon: Cloud,
      accent: 'text-purple-400',
      items: architecture.devops,
    },
  ].filter((tier) => tier.items && tier.items.length > 0);

  return (
    <section id="architecture" className="space-y-12 pt-8 border-t border-surface-border/60 scroll-mt-24">
      <div className="space-y-3">
        <Eyebrow>SYSTEM ARCHITECTURE</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-content-primary">
          How {projectTitle} is Engineered
        </h2>
        <p className="text-sm sm:text-base text-content-secondary max-w-3xl leading-relaxed">
          {architecture.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-lime">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-content-muted">0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-content-primary">
                  {tier.title}
                </h3>

                <ul className="space-y-2 pt-2 border-t border-surface-border">
                  {tier.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-xs text-content-secondary leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-lime font-mono text-[10px] mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
