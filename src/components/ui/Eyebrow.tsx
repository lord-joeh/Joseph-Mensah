import React from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
  variant?: 'subtle' | 'pill' | 'bordered';
}

export function Eyebrow({
  children,
  dot = false,
  className = '',
  variant = 'subtle',
}: EyebrowProps) {
  const variantClasses = {
    subtle: 'text-lime',
    pill: 'px-3 py-1 rounded-full bg-surface-elevated border border-surface-border text-content-primary',
    bordered: 'pl-3 border-l border-lime text-content-secondary',
  }[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-medium select-none',
        variantClasses,
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
