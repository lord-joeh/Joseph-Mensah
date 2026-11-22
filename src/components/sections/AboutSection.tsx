"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { AboutInfo } from '@/lib/api';

export interface AboutSectionProps {
  about?: AboutInfo | null;
}

export function AboutSection({ about }: AboutSectionProps) {
  const profileImg =
    about?.profile_image_url || '/assets/profile/joseph-mensah.jpeg';
  const resumeUrl =
    about?.resume_url ||
    'https://xckruzkltbawoksfmtbr.supabase.co/storage/v1/object/public/portfolio-assets/resumes/1833207d-3d14-4374-bdf4-754957204eb7.pdf';

  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <SectionHeading
          eyebrow="A LITTLE ABOUT ME"
          title="Software Engineer & Digital Product Builder"
          description="Bridging technical engineering excellence and product vision to create digital solutions that solve real problems."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait & Quick Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-surface-border p-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={profileImg}
                    alt="Joseph Mensah"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                    quality={80}
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-cinematic"
                  />
                </div>
              </div>
            </div>

            {/* Quick Fact Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="flex items-center gap-1.5 text-lime text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>LOCATION</span>
                </div>
                <p className="font-display font-bold text-sm text-content-primary">
                  Accra, Ghana
                </p>
                <p className="text-[11px] font-mono text-content-muted">GMT+0 Timezone</p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-surface-border space-y-1">
                <div className="flex items-center gap-1.5 text-lime text-xs font-mono">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>SPECIALIZATION</span>
                </div>
                <p className="font-display font-bold text-sm text-content-primary">
                  Full-Stack &amp; Mobile
                </p>
                <p className="text-[11px] font-mono text-content-muted">Flutter · Nest · Next</p>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Resume */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <Eyebrow variant="subtle">Engineering Background &amp; Approach</Eyebrow>

              <div className="text-base sm:text-lg text-content-secondary leading-relaxed space-y-4">
                <p>
                  I am a highly analytical and results-driven Software Engineer based in
                  Accra, Ghana, specialized in building scalable, production-grade applications
                  across the full product lifecycle.
                </p>
                <p>
                  My engineering expertise spans cross-platform mobile architectures (Flutter,
                  Dart, React Native), modular backend systems (NestJS, Node.js, Redis,
                  PostgreSQL), and modern web platforms (Next.js, TypeScript, Tailwind CSS).
                </p>
                <p>
                  Beyond writing clean, type-safe code, I care deeply about the entire system:
                  self-managed cloud infrastructure with Docker and NGINX, robust database
                  schemas, automated CI/CD pipelines, and user interfaces that feel responsive,
                  intuitive, and refined.
                </p>
              </div>
            </div>

            {/* Core Values / Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-surface-border">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-content-primary font-display font-semibold text-sm">
                  <GraduationCap className="w-4 h-4 text-lime" />
                  <span>Technical Leadership &amp; Mentorship</span>
                </div>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Active contributor to engineering discussions, guiding junior developers,
                  and promoting code quality best practices.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-content-primary font-display font-semibold text-sm">
                  <Briefcase className="w-4 h-4 text-lime" />
                  <span>End-to-End Product Ownership</span>
                </div>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Translating ambiguous business needs into tangible milestones, scalable data
                  models, and deployed applications.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-semibold text-xs uppercase tracking-wider px-6 h-11 shadow-[0_0_20px_rgba(213,255,98,0.2)]"
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Resume (PDF)
                </a>
              </Button>

              {about?.github_url && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated text-xs font-mono px-5 h-11"
                >
                  <a
                    href={about.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" /> GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              )}

              {about?.linkedin_url && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated text-xs font-mono px-5 h-11"
                >
                  <a
                    href={about.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FaLinkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
