"use client";

import React from 'react';
import { Smartphone, Layout, Server, Cpu, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface CapabilityItem {
  number: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string[];
  techStack: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    category: 'CLIENT-SIDE ARCHITECTURE',
    title: 'Frontend Engineering',
    icon: Layout,
    description:
      'Designing and developing fast, accessible, and responsive user interfaces with Next.js App Router, React 19, TypeScript, and Tailwind CSS. Specializing in component design systems, fluid micro-interactions with Motion, and Core Web Vitals optimization.',
    deliverables: [
      'Next.js App Router & SSR Platforms',
      'Design Systems & Reusable UI Libraries',
      'Fluid Micro-Interactions & Motion',
      'Performance & Web Vitals Optimization',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    number: '02',
    category: 'CROSS-PLATFORM ENGINEERING',
    title: 'Mobile App Development',
    icon: Smartphone,
    description:
      'Building production-grade mobile applications for iOS and Android with Flutter and React Native. Focusing on native device integration, robust offline-first synchronization, local database encryption with SQLCipher, and fluid 60/120fps UI experiences.',
    deliverables: [
      'Cross-Platform iOS & Android Deployments',
      'Encrypted Local Storage (SQLCipher / SQLite)',
      'Background Synchronization & Push Messaging',
      'Mobile Payment Gateways (Paystack)',
    ],
    techStack: ['Flutter', 'Dart', 'React Native', 'SQLCipher', 'OneSignal'],
  },
  {
    number: '03',
    category: 'SYSTEMS & API ARCHITECTURE',
    title: 'Backend Engineering',
    icon: Server,
    description:
      'Architecting modular backend engines and RESTful microservices with NestJS and Node.js. Establishing strict type-safe contracts, transaction-safe database operations in PostgreSQL, high-speed Redis caching, and robust JWT/RBAC authorization boundaries.',
    deliverables: [
      'Type-Safe REST APIs & Microservices',
      'PostgreSQL Schema Design & Migrations',
      'Redis In-Memory Caching & Rate Limiting',
      'Role-Based Authorization & Session Control',
    ],
    techStack: ['NestJS', 'Node.js', 'PostgreSQL', 'Supabase', 'Redis'],
  },
  {
    number: '04',
    category: 'DEPLOYMENT & RELIABILITY',
    title: 'Infrastructure & DevOps',
    icon: Cpu,
    description:
      'Automating deployment workflows and self-managed cloud environments using Docker containerization, NGINX reverse proxies, GitHub Actions CI/CD pipelines, and cloud VPS hosting with SSL automation and production health monitoring.',
    deliverables: [
      'Automated GitHub Actions CI/CD Pipelines',
      'Dockerized Multi-Container Workflows',
      'NGINX Reverse Proxies & SSL Certificates',
      'VPS Provisioning & Production Monitoring',
    ],
    techStack: ['Docker', 'NGINX', 'GitHub Actions', 'DigitalOcean VPS', 'Git'],
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 scroll-mt-20 sm:scroll-mt-24 border-t border-surface-border/60 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
        <SectionHeading
          eyebrow="WHAT I DO"
          title="From the first idea to the final deployment."
          description="I work across the entire technical product spectrum, taking products from whiteboard architecture to production deployment."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.number}
                className="group relative p-8 sm:p-10 rounded-2xl bg-surface border border-surface-border hover:border-lime/40 transition-all duration-300 flex flex-col justify-between space-y-8"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-surface-border group-hover:border-lime/40 flex items-center justify-center text-lime transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-content-muted group-hover:text-lime transition-colors">
                      {cap.number}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-lime block mb-1">
                      {cap.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-content-primary group-hover:text-lime transition-colors">
                      {cap.title}
                    </h3>
                  </div>

                  <p className="text-content-secondary text-sm sm:text-base leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="space-y-3 pt-4 border-t border-surface-border">
                  <span className="text-xs font-mono uppercase text-content-muted tracking-wider block">
                    Core Focus &amp; Deliverables
                  </span>
                  <ul className="space-y-2">
                    {cap.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-content-secondary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cap.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface-elevated border border-surface-border text-content-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
