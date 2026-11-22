/**
 * Cinematic Motion Design Tokens
 * Reusable easing, durations, and animation variant presets.
 */

export const EASING = {
  // Editorial / Cinematic ease: fast acceleration, graceful deceleration
  cinematic: [0.16, 1, 0.3, 1] as const,
  // Standard UI transition
  standard: [0.25, 0.1, 0.25, 1] as const,
  // Smooth curve for layout transitions
  smooth: [0.4, 0, 0.2, 1] as const,
  // Powerful entrance
  power4: [0.165, 0.84, 0.44, 1] as const,
};

export const DURATION = {
  micro: 0.18,     // 180ms - Button presses, micro-indicators
  fast: 0.28,      // 280ms - Hover states, quick fades
  standard: 0.45,  // 450ms - Card reveals, dialog openings, dropdowns
  slow: 0.75,      // 750ms - Section scroll reveals, layout shifts
  cinematic: 1.15, // 1150ms - Hero headline reveals, curtain effects
};

export const STAGGER = {
  tight: 0.04,   // Fast sequential text / list
  standard: 0.08, // Card grids, menu items
  loose: 0.14,   // Headline lines, hero steps
};

export const SPRINGS = {
  magnetic: { type: 'spring' as const, stiffness: 350, damping: 25, mass: 0.5 },
  subtle: { type: 'spring' as const, stiffness: 260, damping: 20 },
  snappy: { type: 'spring' as const, stiffness: 420, damping: 30 },
};

/**
 * Reusable Framer Motion Variants
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.standard,
      delay: custom * STAGGER.standard,
      ease: EASING.cinematic,
    },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.standard,
      delay: custom * STAGGER.standard,
      ease: EASING.standard,
    },
  }),
};

export const lineRevealVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: (custom = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: DURATION.cinematic,
      delay: custom * STAGGER.loose,
      ease: EASING.cinematic,
    },
  }),
};

export const curtainRevealVariant = {
  hidden: { scaleY: 1 },
  visible: {
    scaleY: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.cinematic,
    },
  },
};

export const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.standard,
    },
  },
};
