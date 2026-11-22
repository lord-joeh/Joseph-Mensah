import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'form' | 'fluid';
  children: React.ReactNode;
}

export function Container({
  size = 'default',
  className = '',
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    form: 'max-w-2xl',
    fluid: 'max-w-full',
  }[size];

  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
