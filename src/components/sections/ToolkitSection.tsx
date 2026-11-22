"use client";

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Skill } from '@/lib/api';

export interface ToolkitSectionProps {
  skills: Skill[];
}

const CATEGORY_TABS = [
  'All',
  'Mobile',
  'Frontend',
  'Backend',
  'Database',
  'Devops',
] as const;

export function ToolkitSection({ skills }: ToolkitSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('All');

  // Filter skills based on tab
  const filteredSkills = skills.filter((skill) => {
    if (activeTab === 'All') return true;
    const cat = skill.category.toLowerCase();
    const tab = activeTab.toLowerCase();

    if (tab === 'frontend' && (cat.includes('frontend') || skill.name.toLowerCase().includes('react'))) {
      return true;
    }
    if (tab === 'backend' && (cat.includes('backend') || skill.name.toLowerCase().includes('nest'))) {
      return true;
    }
    return cat.includes(tab);
  });

  return (
    <section id="skills" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="MY TOOLKIT"
            title="The tools behind the work."
            description="Technologies, frameworks, and platforms I use to build robust digital products."
            align="left"
            className="mb-0"
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-surface border border-surface-border shrink-0 self-start md:self-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-lime text-canvas font-bold shadow-[0_0_12px_rgba(213,255,98,0.3)]'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-4 rounded-xl bg-surface border border-surface-border hover:border-lime/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center p-2.5 group-hover:border-lime/30 group-hover:scale-105 transition-all">
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                  loading="lazy"
                />
              </div>
              <div className="space-y-0.5">
                <p className="font-display font-semibold text-xs text-content-primary group-hover:text-lime transition-colors">
                  {skill.name}
                </p>
                <span className="text-[10px] font-mono text-content-muted block uppercase">
                  {skill.category.replace('Frontend and Backend', 'Full-Stack')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
