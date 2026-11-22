import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'default' | 'tight' | 'loose' | 'hero';
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  spacing = 'default',
  borderTop = false,
  borderBottom = false,
  className = '',
  children,
  id,
  ...props
}: SectionProps) {
  const spacingClasses = {
    hero: 'pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32',
    default: 'py-20 sm:py-28 lg:py-36',
    tight: 'py-12 sm:py-16 lg:py-20',
    loose: 'py-24 sm:py-36 lg:py-48',
  }[spacing];

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        spacingClasses,
        borderTop && 'border-t border-surface-border',
        borderBottom && 'border-b border-surface-border',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
