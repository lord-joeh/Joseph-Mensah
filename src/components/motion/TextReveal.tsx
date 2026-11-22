"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASING, DURATION, STAGGER } from '@/lib/motion/tokens';

export interface TextRevealProps {
  text: string | string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  className?: string;
  lineClassName?: string;
}

export function TextReveal({
  text,
  as: Tag = 'h2',
  delay = 0,
  className = '',
  lineClassName = '',
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const lines = Array.isArray(text) ? text : [text];
  const fullText = Array.isArray(text) ? text.join(' ') : text;

  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={fullText}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden" aria-hidden="true">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.slow,
              delay: delay + idx * STAGGER.loose,
              ease: EASING.cinematic,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
