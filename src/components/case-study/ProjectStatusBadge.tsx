import React from 'react';
import { ShieldCheck, PlayCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectStatusType } from '@/lib/case-studies/types';

export interface ProjectStatusBadgeProps {
  status: ProjectStatusType;
  label: string;
  className?: string;
}

export function ProjectStatusBadge({
  status,
  label,
  className = '',
}: ProjectStatusBadgeProps) {
  const config = {
    production: {
      icon: ShieldCheck,
      classes: 'bg-lime/10 text-lime border-lime/30',
      dotColor: 'bg-lime',
    },
    prototype: {
      icon: PlayCircle,
      classes: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      dotColor: 'bg-amber-400',
    },
    completed: {
      icon: CheckCircle2,
      classes: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
      dotColor: 'bg-emerald-400',
    },
    active_development: {
      icon: Clock,
      classes: 'bg-sky-400/10 text-sky-300 border-sky-400/30',
      dotColor: 'bg-sky-400',
    },
    concept: {
      icon: Sparkles,
      classes: 'bg-purple-400/10 text-purple-300 border-purple-400/30',
      dotColor: 'bg-purple-400',
    },
  }[status] || {
    icon: CheckCircle2,
    classes: 'bg-surface-elevated text-content-secondary border-surface-border',
    dotColor: 'bg-content-muted',
  };

  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono select-none',
        config.classes,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="font-semibold uppercase tracking-wider text-[11px]">{label}</span>
    </div>
  );
}
