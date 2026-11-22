import React from 'react';
import { User, Calendar, MapPin, Layers } from 'lucide-react';
import type { CaseStudyData } from '@/lib/case-studies/types';

export interface CaseStudyMetadataProps {
  caseStudy: CaseStudyData;
}

export function CaseStudyMetadata({ caseStudy }: CaseStudyMetadataProps) {
  const metaItems = [
    {
      icon: User,
      label: 'MY ROLE',
      value: caseStudy.role,
    },
    {
      icon: Calendar,
      label: 'TIMELINE',
      value: caseStudy.timeline,
    },
    {
      icon: MapPin,
      label: 'CONTEXT',
      value: caseStudy.clientContext,
    },
    {
      icon: Layers,
      label: 'CORE ARCHITECTURE',
      value: caseStudy.category,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-surface border border-surface-border">
      {metaItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-lime text-[11px] font-mono uppercase tracking-wider">
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </div>
            <p className="font-display font-semibold text-sm sm:text-base text-content-primary">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
