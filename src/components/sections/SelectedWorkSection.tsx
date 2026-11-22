"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { getProjectSlug } from '@/lib/projects/slugs';
import { API_PROJECT_IMAGES } from '@/lib/case-studies/data';
import type { Project } from '@/lib/api';

export interface SelectedWorkSectionProps {
  projects: Project[];
}

export function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const getProjectCategory = (title: string): string => {
    const t = title.toLowerCase();
    if (t.includes('agro')) return 'Full-Stack Ecosystem & Architecture';
    if (t.includes('cv')) return 'Full-Stack AI Platform';
    if (t.includes('zee')) return 'Commercial E-Commerce Client Prototype';
    if (t.includes('adepa')) return 'Commercial Retail Storefront Prototype';
    if (t.includes('vault')) return 'Mobile Security & Encryption';
    if (t.includes('course') || t.includes('rep')) return 'Campus Web Infrastructure';
    if (t.includes('ci/cd') || t.includes('infra')) return 'DevOps & Cloud Systems';
    if (t.includes('ticket')) return 'Event Platform & Payments';
    if (t.includes('shop')) return 'E-Commerce Frontend';
    return 'Software Engineering Project';
  };

  // 1. Exact Approved Featured Order
  const agroProject = projects.find((p) => p.title.toLowerCase().includes('agro'));
  const cvProject = projects.find((p) => p.title.toLowerCase().includes('cv'));
  const zeeProject = projects.find((p) => p.title.toLowerCase().includes('zee'));
  const adepaProject = projects.find((p) => p.title.toLowerCase().includes('adepa'));

  // 2. Identify remaining projects for the archive
  const featuredIds = new Set(
    [agroProject?.id, cvProject?.id, zeeProject?.id, adepaProject?.id].filter(Boolean)
  );
  const remainingProjects = projects.filter((p) => !featuredIds.has(p.id));

  // Enriched tags & fallbacks from verified data
  const agroTags = agroProject?.tags
    ? agroProject.tags.split(',').map((t) => t.trim())
    : ['NestJS', 'TypeScript', 'Redis', 'BullMQ', 'PostgreSQL', 'Paystack', 'OneSignal'];

  const cvTags = cvProject?.tags
    ? cvProject.tags.split(',').map((t) => t.trim())
    : ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Puppeteer', 'Zod'];

  const zeeTags = zeeProject?.tags
    ? zeeProject.tags.split(',').map((t) => t.trim())
    : ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'];

  const adepaTags = adepaProject?.tags
    ? adepaProject.tags.split(',').map((t) => t.trim())
    : ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'];

  return (
    <section id="projects" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Featured Engineering Projects"
            description="Four selected digital products spanning full-stack marketplace architecture, production generative AI, and commercial client storefronts."
            align="left"
            className="mb-0"
          />
          <div className="text-xs font-mono text-content-muted shrink-0">
            <span>01 / 04 APPROVED SHOWCASE</span>
          </div>
        </div>

        {/* 1. Flagship Featured Project: AgroMarket */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-lime uppercase tracking-widest">
              01 — Flagship Architecture
            </span>
            <div className="h-px bg-surface-border flex-1" />
          </div>

          <ProjectCard
            title={agroProject?.title || 'AgroMarket'}
            category="Full-Stack Ecosystem & Architecture"
            year="2025 – Present"
            description={
              agroProject?.description ||
              'A multi-sided agricultural and logistics marketplace platform connecting rural Ghanaian farmers with commercial buyers and haulers. Engineered with platform-managed Paystack wallet settlements, single-use OTP delivery verification, and SMS alerts.'
            }
            imageUrl={agroProject?.image_url || API_PROJECT_IMAGES.agromarket}
            tags={agroTags}
            slug="agromarket"
            liveUrl={agroProject?.link || undefined}
            githubUrl={agroProject?.github_link || undefined}
            featured={true}
          />
        </div>

        {/* 2. Secondary Showcase Grid: CV Builder, Zee Essentials, Adepa */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-content-muted uppercase tracking-widest">
              02 – 04 Selected Products &amp; Prototypes
            </span>
            <div className="h-px bg-surface-border flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 02: AI-Powered CV Builder */}
            <ProjectCard
              title={cvProject?.title || 'AI-Powered CV Builder'}
              category="Full-Stack AI Platform"
              year="2024"
              description={
                cvProject?.description ||
                'An intelligent resume creation platform transforming raw work history into ATS-optimized, high-conversion developer resumes using Gemini AI inference, schema validation, and headless Puppeteer PDF rendering.'
              }
              imageUrl={cvProject?.image_url || API_PROJECT_IMAGES['cv-builder']}
              tags={cvTags}
              slug="cv-builder"
              liveUrl={cvProject?.link || 'https://cv-builder.dev-joseph.me'}
              githubUrl={cvProject?.github_link || undefined}
            />

            {/* 03: Zee Essentials */}
            <ProjectCard
              title={zeeProject?.title || 'Zee Essentials'}
              category="Commercial E-Commerce Client Prototype"
              year="2024"
              description={
                zeeProject?.description ||
                'A premium e-commerce storefront prototype crafted for an Accra Lapaz creator gear retailer. Features responsive catalog discovery, interactive bag drawers, and admin demo controls.'
              }
              imageUrl={zeeProject?.image_url || API_PROJECT_IMAGES['zee-essentials']}
              tags={zeeTags}
              slug="zee-essentials"
              liveUrl={zeeProject?.link || 'https://zee-essentials-prototype.vercel.app/'}
              githubUrl={zeeProject?.github_link || undefined}
            />

            {/* 04: Adepa Wc Mpaboa */}
            <ProjectCard
              title={adepaProject?.title || 'Adepa Wc Mpaboa'}
              category="Commercial Retail Storefront Prototype"
              year="2024"
              description={
                adepaProject?.description ||
                'A modern digital storefront prototype built for a Kumasi Adum footwear brand, bringing streetwear sneaker discovery, category filtering, and shopping bag interactions into one polished interface.'
              }
              imageUrl={adepaProject?.image_url || API_PROJECT_IMAGES['adepa-wc-mpaboa']}
              tags={adepaTags}
              slug="adepa-wc-mpaboa"
              liveUrl={adepaProject?.link || 'https://adepa-wc-mpaboa.vercel.app/'}
              githubUrl={adepaProject?.github_link || undefined}
            />
          </div>
        </div>

        {/* 3. Expandable Project Archive (Remaining live backend projects) */}
        {remainingProjects.length > 0 && (
          <div className="pt-6 border-t border-surface-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-content-primary">
                  Engineering Project Archive
                </h3>
                <p className="text-sm text-content-secondary">
                  Explore {remainingProjects.length} additional systems, utilities, and applications from Joseph&apos;s production portfolio.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="rounded-full border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated text-xs font-mono tracking-wider gap-2"
              >
                <span>{showAll ? 'HIDE ARCHIVE' : `VIEW ARCHIVE (${remainingProjects.length})`}</span>
                {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </Button>
            </div>

            {showAll && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 animate-in fade-in duration-300">
                {remainingProjects.map((p) => {
                  const pSlug = getProjectSlug(p);
                  return (
                    <div
                      key={p.id}
                      className="p-6 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Eyebrow variant="pill">{getProjectCategory(p.title)}</Eyebrow>
                        </div>
                        <h4 className="font-display font-bold text-lg text-content-primary group-hover:text-lime transition-colors">
                          <Link href={`/projects/${pSlug}`} className="hover:underline">
                            {p.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-content-secondary leading-relaxed line-clamp-3">
                          {p.description}
                        </p>
                      </div>

                      {p.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {p.tags.split(',').map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-elevated text-content-muted"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-surface-border/60 text-xs font-mono">
                        <Link
                          href={`/projects/${pSlug}`}
                          className="text-lime hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          Case Study <ArrowUpRight className="w-3 h-3" />
                        </Link>
                        <div className="flex items-center gap-3">
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-content-secondary hover:text-content-primary inline-flex items-center gap-1"
                            >
                              Live <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {p.github_link && (
                            <a
                              href={p.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-content-secondary hover:text-content-primary inline-flex items-center gap-1"
                            >
                              <FaGithub className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
