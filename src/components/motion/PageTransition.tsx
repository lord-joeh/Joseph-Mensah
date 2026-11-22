"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASING, DURATION } from '@/lib/motion/tokens';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: DURATION.standard,
        ease: EASING.cinematic,
      }}
    >
      {children}
    </motion.div>
  );
}
