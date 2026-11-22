"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

export interface ProjectImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  priority = false,
}: ProjectImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-elevated rounded-xl border border-surface-border group',
        aspectRatio,
        className
      )}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-surface-elevated animate-pulse flex items-center justify-center text-content-muted">
          <ImageIcon className="w-8 h-8 opacity-20" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-elevated text-content-muted p-4 text-center">
          <ImageIcon className="w-8 h-8 mb-2 opacity-30" />
          <span className="text-xs font-mono">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'object-cover transition-all duration-700 ease-cinematic group-hover:scale-105',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}
