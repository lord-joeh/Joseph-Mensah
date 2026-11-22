import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/button';

interface ProjectMeta {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  overview: string;
  problem: string;
  architecture: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const CASE_STUDIES: Record<string, ProjectMeta> = {
  agromarket: {
    slug: 'agromarket',
    title: 'AgroMarket',
    category: 'Full-Stack & Mobile Ecosystem',
    year: '2025 – Present',
    role: 'Lead Mobile & Backend Engineer',
    overview:
      'A multi-sided agricultural and logistics platform engineered to empower smallholder farmers in Ghana by connecting them directly with bulk commodity buyers, agricultural input suppliers, and logistics haulers without predatory middlemen.',
    problem:
      'Rural farmers face severe post-harvest losses and price exploitation due to fragmented supply chains, lack of price transparency, and cash-flow delays.',
    architecture: [
      'Cross-platform Flutter mobile client with offline-first caching for rural connectivity',
      'Modular NestJS backend engine handling multi-tier role-based authentication',
      'Paystack automated payment escrow settlements and instant webhook notifications',
      'Redis high-throughput caching for real-time market price discovery',
      'PostgreSQL relational schema with transactional safety and audit logging',
    ],
    techStack: ['Flutter', 'Dart', 'NestJS', 'PostgreSQL', 'Redis', 'Paystack', 'OneSignal'],
    image: '/assets/projects/agromarket.png',
  },
  'the-vault': {
    slug: 'the-vault',
    title: 'The Vault',
    category: 'Mobile Security & Encryption',
    year: '2024',
    role: 'Mobile Systems Engineer',
    overview:
      'A zero-knowledge encrypted messaging and sensitive asset vault built for mobile devices, combining local hardware keystore integration with encrypted SQLite databases.',
    problem:
      'Standard messaging and note apps transmit or store plaintext data on remote cloud servers, creating single points of failure for confidential information.',
    architecture: [
      'Client-side AES-256 GCM encryption via SQLCipher',
      'Biometric authentication bound to Android Keystore / iOS Secure Enclave',
      'Ephemeral offline sync queues that purge decrypted state on application backgrounding',
      'Zero-knowledge backend relay with no persistent plaintext storage',
    ],
    techStack: ['Flutter', 'Dart', 'Node.js', 'SQLCipher', 'SQLite', 'WebSockets'],
    image: '/assets/projects/the-vault.png',
  },
  'cv-builder': {
    slug: 'cv-builder',
    title: 'AI-Powered CV Builder',
    category: 'Full-Stack AI Platform',
    year: '2024',
    role: 'Full-Stack Engineer',
    overview:
      'An intelligent resume creation engine that transforms unformatted career notes into ATS-compliant, recruiter-optimized engineering resumes with real-time AI critique.',
    problem:
      'Engineers frequently struggle to articulate their impact in recruiter-friendly formats, resulting in resume rejections by automated applicant tracking systems (ATS).',
    architecture: [
      'Next.js App Router frontend with real-time dynamic markdown preview',
      'Google Gemini AI integration for contextual bullet-point enhancement',
      'Strict Zod schema validation ensuring consistent JSON resume structures',
      'Headless Puppeteer PDF generation preserving pixel-perfect print typography',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Puppeteer', 'Zod'],
    image: '/assets/projects/cv-builder.png',
    liveUrl: 'https://cv-builder.dev-joseph.me',
  },
  'course-rep': {
    slug: 'course-rep',
    title: 'Course Representative Management System',
    category: 'Campus Web Infrastructure',
    year: '2024',
    role: 'Full-Stack Developer',
    overview:
      'A unified academic communication platform serving university course representatives, eliminating communication fragmentation across WhatsApp groups through automated SMS and centralized resource distribution.',
    problem:
      'Critical academic notices, timetable adjustments, and learning materials were lost in high-volume chat groups, leading to missed lectures and exams.',
    architecture: [
      'React frontend with instant search and responsive document previews',
      'Node.js backend with automated SMS gateway integration for urgent alerts',
      'PostgreSQL database for timetable logs, representative rosters, and resource files',
      'Docker containerized deployment on self-managed VPS with NGINX reverse proxy',
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'SMS Gateway API', 'Docker'],
    image: '/assets/projects/cv-builder.png',
    liveUrl: 'https://rep.dev-joseph.me',
  },
};

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = CASE_STUDIES[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas text-content-primary selection:bg-lime/20 selection:text-lime">
      <Navigation />

      <main className="pt-32 sm:pt-40 pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12 sm:space-y-16">
          {/* Back Navigation */}
          <div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-content-secondary hover:text-lime transition-colors uppercase tracking-wider group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to selected work</span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow variant="pill">{project.category}</Eyebrow>
              <span className="text-xs font-mono text-content-muted">{project.year}</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border text-xs font-mono text-lime">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Architecture</span>
              </div>
            </div>

            <h1 className="text-display-xl font-display font-black tracking-tight text-content-primary">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-content-secondary max-w-3xl leading-relaxed">
              {project.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border">
              {project.liveUrl && (
                <Button asChild className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-semibold text-xs tracking-wider h-10 px-5">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              )}

              {project.githubUrl && (
                <Button asChild variant="outline" className="rounded-full border-surface-border hover:border-lime/40 text-content-primary hover:bg-surface-elevated text-xs font-mono h-10 px-5">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <FaGithub className="w-3.5 h-3.5" /> Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="rounded-2xl overflow-hidden bg-surface border border-surface-border shadow-2xl p-3 sm:p-4">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-surface-elevated">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Architecture & Engineering Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pt-6">
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-content-primary">
                  The Problem &amp; Core Challenge
                </h2>
                <p className="text-base text-content-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-content-primary">
                  System Architecture &amp; Implementation
                </h2>
                <ul className="space-y-3">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-content-secondary leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Meta */}
            <div className="md:col-span-4 space-y-6 p-6 rounded-2xl bg-surface border border-surface-border self-start">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-content-muted uppercase">Role</span>
                <p className="font-display font-semibold text-sm text-content-primary">{project.role}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-content-muted uppercase">Timeline</span>
                <p className="font-display font-semibold text-sm text-content-primary">{project.year}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-surface-border">
                <span className="text-[11px] font-mono text-content-muted uppercase block">Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded text-xs font-mono bg-surface-elevated border border-surface-border text-content-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border">
                <Button asChild variant="outline" className="w-full rounded-xl border-surface-border hover:border-lime/40 text-xs font-mono text-content-primary">
                  <Link href="/#contact">Discuss this project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
