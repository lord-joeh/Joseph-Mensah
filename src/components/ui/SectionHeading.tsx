import React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center' | 'split';
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  action,
}: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <div className={cn('flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16', className)}>
        <div className="space-y-3 max-w-2xl">
          {eyebrow && <Eyebrow dot>{eyebrow}</Eyebrow>}
          <h2 className="text-display-lg font-display font-bold tracking-tight text-content-primary leading-tight">
            {title}
          </h2>
        </div>
        {(description || action) && (
          <div className="space-y-4 max-w-md lg:text-left text-content-secondary">
            {description && (
              <p className="text-base sm:text-lg leading-relaxed text-content-secondary">
                {description}
              </p>
            )}
            {action && <div>{action}</div>}
          </div>
        )}
      </div>
    );
  }

  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'space-y-4 pb-12 sm:pb-16',
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && <Eyebrow dot={isCenter}>{eyebrow}</Eyebrow>}
      <h2 className="text-display-lg font-display font-bold tracking-tight text-content-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg leading-relaxed text-content-secondary">
          {description}
        </p>
      )}
      {action && <div className={isCenter ? 'flex justify-center pt-2' : 'pt-2'}>{action}</div>}
    </div>
  );
}
