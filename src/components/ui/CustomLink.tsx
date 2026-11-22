import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  arrow?: boolean;
  className?: string;
}

export function CustomLink({
  href,
  children,
  external = false,
  arrow = true,
  className = '',
}: CustomLinkProps) {
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-lime transition-all duration-300 ease-cinematic group-hover:w-full" />
      </span>
      {arrow && (
        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-lime" />
      )}
    </>
  );

  const baseClasses = cn(
    'group inline-flex items-center gap-1.5 font-mono text-sm text-content-primary hover:text-lime transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-lime rounded-sm',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
