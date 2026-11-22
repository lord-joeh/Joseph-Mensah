"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CustomLink } from '@/components/ui/CustomLink';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Reveal } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { API_PROJECT_IMAGES } from '@/lib/case-studies/data';

export default function DesignSystemPreviewPage() {
  return (
    <div className="min-h-screen bg-canvas text-content-primary selection:bg-lime/20 selection:text-lime">
      {/* Navigation preview */}
      <Navigation />

      <main className="pt-32 pb-24 space-y-24">
        {/* Header */}
        <Container>
          <div className="pb-8 border-b border-surface-border space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-content-secondary hover:text-lime transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <div className="space-y-2">
              <Eyebrow dot>Phase 3 Design System &amp; Component Inventory</Eyebrow>
              <h1 className="text-display-xl font-display font-bold text-content-primary tracking-tight">
                Cinematic Design Tokens &amp; Component Foundations
              </h1>
              <p className="text-content-secondary text-lg max-w-2xl leading-relaxed">
                Centralized architectural foundation for Joseph Mensah&apos;s digital identity. Verified across typography, color contrast, motion curves, and responsiveness.
              </p>
            </div>
          </div>
        </Container>

        {/* 1. Color Palette Tokens */}
        <Section spacing="tight">
          <Container>
            <SectionHeading
              eyebrow="Tokens // 01"
              title="Color Palette & Contrast"
              description="Restrained, editorial dark foundation with selective high-contrast lime highlights."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-canvas border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-canvas border border-surface-border shadow-inner" />
                <div>
                  <span className="font-mono text-xs font-bold block text-content-primary">Canvas</span>
                  <span className="font-mono text-[11px] text-content-muted">#101113</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-surface border border-surface-border shadow-inner" />
                <div>
                  <span className="font-mono text-xs font-bold block text-content-primary">Surface</span>
                  <span className="font-mono text-[11px] text-content-muted">#17181A</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-surface-elevated border border-surface-border shadow-inner" />
                <div>
                  <span className="font-mono text-xs font-bold block text-content-primary">Elevated</span>
                  <span className="font-mono text-[11px] text-content-muted">#1E2023</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-surface-border shadow-inner" />
                <div>
                  <span className="font-mono text-xs font-bold block text-content-primary">Border</span>
                  <span className="font-mono text-[11px] text-content-muted">#292A2C</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-lime shadow-glow" />
                <div>
                  <span className="font-mono text-xs font-bold block text-canvas bg-lime px-1.5 py-0.5 rounded inline-block">Lime Accent</span>
                  <span className="font-mono text-[11px] text-content-muted block mt-1">#D5FF62</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-3">
                <div className="h-14 rounded-lg bg-content-primary" />
                <div>
                  <span className="font-mono text-xs font-bold block text-content-primary">Primary Text</span>
                  <span className="font-mono text-[11px] text-content-muted">#F5F5F0</span>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Typography Scale */}
        <Section spacing="tight" borderTop>
          <Container>
            <SectionHeading
              eyebrow="Tokens // 02"
              title="Typography Scale"
              description="Geometric Space Grotesk display headers paired with clean, accessible Inter body."
            />

            <div className="space-y-8 p-6 sm:p-10 rounded-2xl bg-surface border border-surface-border">
              <div className="border-b border-surface-border pb-6 space-y-2">
                <span className="font-mono text-xs text-lime">Display 2XL — clamp(2.75rem, 7vw, 5.75rem)</span>
                <p className="text-display-2xl font-display font-black tracking-tight text-content-primary leading-display">
                  DIGITAL PRODUCTS.
                </p>
              </div>

              <div className="border-b border-surface-border pb-6 space-y-2">
                <span className="font-mono text-xs text-lime">Display XL — clamp(2.25rem, 5vw, 4.25rem)</span>
                <p className="text-display-xl font-display font-bold tracking-tight text-content-primary leading-tight">
                  Selected Engineering Work
                </p>
              </div>

              <div className="border-b border-surface-border pb-6 space-y-2">
                <span className="font-mono text-xs text-lime">Display MD — clamp(1.35rem, 2.2vw, 2rem)</span>
                <p className="text-display-md font-display font-bold text-content-primary">
                  AgroMarket — High-Throughput Marketplace
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-lime">Body Lead &amp; Inter Regular</span>
                <p className="text-lg text-content-secondary leading-relaxed max-w-3xl">
                  Full-stack Web and Mobile Engineer with a strong foundation in designing, building, and deploying robust software solutions across cloud infrastructure.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3. Motion Primitives */}
        <Section spacing="tight" borderTop>
          <Container>
            <SectionHeading
              eyebrow="Motion // 03"
              title="Motion Utilities"
              description="Purposeful entrance reveals, stagger containers, and text reveals."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Text Reveal Card */}
              <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
                <span className="font-mono text-xs text-lime uppercase">TextReveal</span>
                <TextReveal
                  text={['ENGINEERED WITH', 'INTENTION & REALITY']}
                  className="text-xl font-display font-bold text-content-primary"
                />
                <p className="text-xs text-content-secondary leading-relaxed">
                  Clip-path overflow reveal with cinematic easing curve ([0.16, 1, 0.3, 1]).
                </p>
              </div>

              {/* Reveal Card */}
              <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
                <span className="font-mono text-xs text-lime uppercase">Reveal On Scroll</span>
                <Reveal direction="up" delay={0.1}>
                  <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-lime" />
                    <span className="text-sm font-semibold">Smooth directional fade up</span>
                  </div>
                </Reveal>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Automatic viewport observer trigger with prefers-reduced-motion fallback.
                </p>
              </div>

              {/* Stagger Container */}
              <div className="p-6 rounded-2xl bg-surface border border-surface-border space-y-4">
                <span className="font-mono text-xs text-lime uppercase">StaggerContainer</span>
                <StaggerContainer className="grid grid-cols-3 gap-2">
                  {['Flutter', 'NestJS', 'Docker'].map((tech) => (
                    <StaggerItem key={tech}>
                      <div className="p-2 rounded-lg bg-surface-elevated border border-surface-border text-center font-mono text-[11px] text-content-secondary">
                        {tech}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Orchestrated child stagger delays with configurable timing intervals.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. Interactive Components & Buttons */}
        <Section spacing="tight" borderTop>
          <Container>
            <SectionHeading
              eyebrow="Components // 04"
              title="Buttons &amp; Links"
              description="Primary action buttons, magnetic desktop cursor interaction, and editorial custom links."
            />

            <div className="p-8 rounded-2xl bg-surface border border-surface-border flex flex-wrap items-center gap-6">
              <MagneticButton strength={0.3}>
                <Button className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium px-6 h-11 shadow-glow">
                  Magnetic CTA Button
                </Button>
              </MagneticButton>

              <Button variant="outline" className="rounded-full border-surface-border hover:bg-surface-elevated text-content-primary px-6 h-11">
                Secondary Outline
              </Button>

              <Button variant="ghost" className="rounded-full text-content-secondary hover:text-content-primary hover:bg-surface-elevated h-11 px-4">
                Ghost Action
              </Button>

              <CustomLink href="#contact" arrow>
                Explore Selected Work
              </CustomLink>

              <CustomLink href="https://github.com/lord-joeh" external>
                View GitHub Repositories
              </CustomLink>
            </div>
          </Container>
        </Section>

        {/* 5. Project Card Foundation */}
        <Section spacing="tight" borderTop>
          <Container>
            <SectionHeading
              align="split"
              eyebrow="Components // 05"
              title="Project Card Foundations"
              description="Editorial showcase component supporting both full-width hero features and multi-column grid compositions."
            />

            <div className="space-y-8">
              {/* Featured Variant */}
              <ProjectCard
                featured
                title="AgroMarket"
                category="Marketplace / Full-Stack"
                year="2026"
                description="Full-stack, three-sided agricultural and logistics marketplace platform connecting farmers, commercial buyers, and verified logistics providers with high-performance caching and microservices."
                imageUrl={API_PROJECT_IMAGES.agromarket}
                tags={['NestJS', 'TypeScript', 'Redis', 'PostgreSQL', 'Paystack']}
                liveUrl="https://agromarket.dev-joseph.me"
                githubUrl="https://github.com/lord-joeh"
              />

              {/* Grid Variant */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectCard
                  title="The Vault"
                  category="Fintech &amp; Privacy / Mobile"
                  year="2026"
                  description="Privacy-focused encrypted messaging and asset management mobile application with client-side SQLCipher database encryption."
                  imageUrl={API_PROJECT_IMAGES['the-vault']}
                  tags={['Flutter', 'Node.js', 'SQLCipher', 'Queue Systems']}
                  githubUrl="https://github.com/lord-joeh"
                />

                <ProjectCard
                  title="AI-Powered CV Builder"
                  category="Web Application / AI"
                  year="2026"
                  description="Full-stack AI resume engineering platform built with Next.js, TypeScript, and customized design system."
                  imageUrl={API_PROJECT_IMAGES['cv-builder']}
                  tags={['Next.js', 'React', 'TypeScript', 'Gemini AI', 'Tailwind CSS']}
                  liveUrl="https://cv-builder.dev-joseph.me"
                />
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
