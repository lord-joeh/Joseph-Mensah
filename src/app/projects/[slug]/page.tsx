import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { CaseStudyMetadata } from '@/components/case-study/CaseStudyMetadata';
import { CaseStudyOverview } from '@/components/case-study/CaseStudyOverview';
import { FeatureWalkthrough } from '@/components/case-study/FeatureWalkthrough';
import { ArchitectureDiagram } from '@/components/case-study/ArchitectureDiagram';
import { ChallengeSolution } from '@/components/case-study/ChallengeSolution';
import { TechnologyStack } from '@/components/case-study/TechnologyStack';
import { CaseStudyNavigation } from '@/components/case-study/CaseStudyNavigation';
import { getCaseStudy } from '@/lib/case-studies/data';
import { ALL_CANONICAL_SLUGS } from '@/lib/projects/slugs';
import { getProjects, getAboutInfo } from '@/lib/api';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_CANONICAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: 'Project Not Found | Joseph Mensah',
    };
  }

  return {
    title: `${caseStudy.title} — Case Study`,
    description: caseStudy.overview.slice(0, 155),
    alternates: {
      canonical: `/projects/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.title} — Case Study | Joseph Mensah`,
      description: caseStudy.overview.slice(0, 155),
      url: `https://mensah.dev-joseph.me/projects/${caseStudy.slug}`,
      type: 'article',
      images: [
        {
          url: caseStudy.image,
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} — Case Study | Joseph Mensah`,
      description: caseStudy.overview.slice(0, 155),
      images: [caseStudy.image],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  // Fetch live API projects to enrich image/link data if available
  let apiProjects: any[] = [];
  let aboutInfo: any = null;
  try {
    const [pRes, aRes] = await Promise.allSettled([getProjects(), getAboutInfo()]);
    if (pRes.status === 'fulfilled' && pRes.value.success) {
      apiProjects = pRes.value.data;
    }
    if (aRes.status === 'fulfilled' && aRes.value.success) {
      aboutInfo = aRes.value.data;
    }
  } catch {
    // Graceful fallback to static data
  }

  const caseStudy = getCaseStudy(slug, apiProjects);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas text-content-primary selection:bg-lime/20 selection:text-lime">
      <Navigation />

      <main className="pt-28 sm:pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 space-y-16 sm:space-y-20">
          {/* 1. Hero & Header */}
          <CaseStudyHero caseStudy={caseStudy} />

          {/* 2. Metadata Cards */}
          <CaseStudyMetadata caseStudy={caseStudy} />

          {/* 3. Problem & Objectives */}
          <CaseStudyOverview caseStudy={caseStudy} />

          {/* 4. Product Features Walkthrough */}
          <FeatureWalkthrough
            features={caseStudy.keyFeatures}
            projectTitle={caseStudy.title}
          />

          {/* 5. System Architecture Breakdown */}
          <ArchitectureDiagram
            architecture={caseStudy.architecture}
            projectTitle={caseStudy.title}
          />

          {/* 6. Real Challenges & Engineering Solutions */}
          <ChallengeSolution challenges={caseStudy.challenges} />

          {/* 7. Technology Stack Grid */}
          <TechnologyStack technologies={caseStudy.techStack} />

          {/* 8. Circular Next Project Navigation */}
          <CaseStudyNavigation
            nextSlug={caseStudy.nextSlug}
            nextTitle={caseStudy.nextTitle}
            nextCategory={caseStudy.nextCategory}
          />
        </div>
      </main>

      <Footer
        githubUrl={aboutInfo?.github_url}
        linkedinUrl={aboutInfo?.linkedin_url}
        twitterUrl={aboutInfo?.twitter_url}
      />
    </div>
  );
}
