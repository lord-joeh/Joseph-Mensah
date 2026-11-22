"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASING, DURATION } from '@/lib/motion/tokens';

export interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
}

export function ImageReveal({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  imageClassName = '',
  delay = 0,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden relative bg-surface-elevated ${aspectRatio} ${className}`}>
      {/* Zoom-out Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: DURATION.slow,
          delay,
          ease: EASING.cinematic,
        }}
        className={`w-full h-full object-cover ${imageClassName}`}
      />

      {/* Cinematic Wipe Curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: DURATION.slow,
          delay,
          ease: EASING.cinematic,
        }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-surface-elevated pointer-events-none z-10"
      />
    </div>
  );
}
