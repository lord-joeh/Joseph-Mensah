"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EASING, DURATION } from '@/lib/motion/tokens';
import type { AboutInfo } from '@/lib/api';

export interface HeroSectionProps {
  about?: AboutInfo | null;
}

export function HeroSection({ about }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const profileImg =
    about?.profile_image_url || '/assets/profile/joseph-mensah.jpeg';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.standard,
        ease: EASING.cinematic,
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden">
      {/* Ambient background glow & film grain */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-lime/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -right-32 w-[30rem] h-[30rem] bg-lime/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute inset-0 film-grain pointer-events-none -z-10 opacity-60" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Main Hero Column (Typography Led) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Status & Location Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <Eyebrow variant="pill" dot>
                Software Engineer · Full-Stack &amp; Mobile
              </Eyebrow>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border text-xs font-mono text-content-secondary">
                <MapPin className="w-3.5 h-3.5 text-lime" />
                <span>Accra, Ghana · GMT+0</span>
              </div>
            </motion.div>

            {/* Display Headline */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-display-2xl font-display font-black tracking-tightest text-content-primary leading-display uppercase">
                <span className="block">I BUILD</span>
                <span className="block text-content-primary">
                  DIGITAL <span className="text-lime">PRODUCTS.</span>
                </span>
                <span className="block text-content-secondary">REAL IMPACT.</span>
              </h1>
            </motion.div>

            {/* Supporting Statement */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-normal text-content-secondary max-w-2xl leading-relaxed"
            >
              I turn complex ideas into digital products built for the real world.
              From cross-platform mobile architectures to robust backend engines
              and modern web applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <MagneticButton strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-semibold text-sm sm:text-base px-7 h-12 shadow-[0_0_25px_rgba(213,255,98,0.22)] transition-all hover:shadow-[0_0_35px_rgba(213,255,98,0.35)]"
                >
                  <a href="#projects" className="inline-flex items-center gap-2">
                    Explore my work <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-surface-border bg-surface/60 hover:bg-surface-elevated text-content-primary text-sm sm:text-base px-7 h-12 transition-all hover:border-lime/40"
                >
                  <a href="#contact">Let&apos;s talk</a>
                </Button>
              </MagneticButton>

              {about?.resume_url && (
                <a
                  href={about.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-content-secondary hover:text-lime transition-colors py-2"
                >
                  View Resume <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>

            {/* Availability Indicator */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-2 text-xs font-mono text-content-muted"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime" />
              </span>
              <span>Available for select engineering opportunities &amp; product builds</span>
            </motion.div>
          </div>

          {/* Editorial Portrait Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-lime/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Portrait Container */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden bg-surface border border-surface-border shadow-2xl p-2.5">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-elevated">
                  <img
                    src={profileImg}
                    alt="Joseph Mensah — Software Engineer"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-cinematic"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/20 to-transparent pointer-events-none" />

                  {/* Overlaid Info Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-surface/90 backdrop-blur-md border border-surface-border/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-bold text-sm text-content-primary">
                          Joseph Mensah
                        </p>
                        <p className="text-[11px] font-mono text-content-secondary">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 flex items-center justify-between text-xs font-mono text-content-muted">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 hover:text-lime transition-colors group"
          aria-label="Scroll to selected work"
        >
          <span className="uppercase tracking-widest text-[11px]">Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-lime animate-bounce" />
        </a>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span>Full-Stack</span>
          <span>·</span>
          <span>Mobile (Flutter, React Native)</span>
          <span>·</span>
          <span>NestJS</span>
          <span>·</span>
          <span>Next.js</span>
        </div>
      </div>
    </section>
  );
}
