"use client";

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface Principle {
  number: string;
  title: string;
  quote: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'Understand the problem first',
    quote: 'The fastest code to write is the code you never needed to build.',
    description:
      'Before opening an editor or choosing a database, I dig deep into the real user workflow, business constraints, and operational bottlenecks. Clear problem definition prevents architectural waste.',
  },
  {
    number: '02',
    title: 'Design with pragmatism',
    quote: 'Choose proven, type-safe foundations over bleeding-edge hype.',
    description:
      'Architecture should solve today’s requirements while remaining simple to evolve tomorrow. I prioritize maintainability, strict TypeScript interfaces, clear separation of concerns, and battle-tested libraries.',
  },
  {
    number: '03',
    title: 'Build with intention',
    quote: 'Craftsmanship is visible in the details that others overlook.',
    description:
      'Robust systems require zero-trust authorization, comprehensive error boundaries, defensive edge-case handling, and micro-interactions that feel responsive and respect user accessibility preferences.',
  },
  {
    number: '04',
    title: 'Ship, measure and improve',
    quote: 'Software creates value only when real users touch it.',
    description:
      'I configure automated CI/CD pipelines early, establish production health monitoring, and release iteratively. Continuous feedback loops turn working code into high-impact digital products.',
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <SectionHeading
          eyebrow="HOW I THINK"
          title="Good software is more than code that works."
          description="Principles that guide every architecture, database schema, and interface I build."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-8 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <span className="font-mono text-3xl font-black text-content-muted group-hover:text-lime transition-colors block">
                  {principle.number}
                </span>

                <h3 className="font-display font-bold text-xl text-content-primary group-hover:text-lime transition-colors">
                  {principle.title}
                </h3>

                <blockquote className="text-xs font-mono text-lime border-l-2 border-lime/40 pl-3 italic">
                  &ldquo;{principle.quote}&rdquo;
                </blockquote>

                <p className="text-sm text-content-secondary leading-relaxed pt-2">
                  {principle.description}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border text-[11px] font-mono text-content-muted uppercase tracking-wider">
                Pillar {principle.number} of 04
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
