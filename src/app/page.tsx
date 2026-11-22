"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUp } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';

// Below-the-fold sections dynamically imported to reduce initial JavaScript payload & main-thread blocking
const CapabilitiesSection = dynamic(
  () => import('@/components/sections/CapabilitiesSection').then((m) => m.CapabilitiesSection),
  { ssr: true }
);
const PhilosophySection = dynamic(
  () => import('@/components/sections/PhilosophySection').then((m) => m.PhilosophySection),
  { ssr: true }
);
const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((m) => m.AboutSection),
  { ssr: true }
);
const ToolkitSection = dynamic(
  () => import('@/components/sections/ToolkitSection').then((m) => m.ToolkitSection),
  { ssr: true }
);
const CertificationsSection = dynamic(
  () => import('@/components/sections/CertificationsSection').then((m) => m.CertificationsSection),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then((m) => m.ContactSection),
  { ssr: true }
);
import {
  getAboutInfo,
  getProjects,
  getSkills,
  getCertificates,
  type AboutInfo,
  type Project,
  type Skill,
  type Certificate,
} from '@/lib/api';

export default function HomePage() {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Parallel non-blocking data fetching
    Promise.allSettled([
      getAboutInfo(),
      getProjects(),
      getSkills(),
      getCertificates(),
    ]).then(([aboutRes, projectsRes, skillsRes, certsRes]) => {
      if (aboutRes.status === 'fulfilled' && aboutRes.value.success) {
        setAbout(aboutRes.value.data);
      }
      if (projectsRes.status === 'fulfilled' && projectsRes.value.success) {
        setProjects(projectsRes.value.data);
      }
      if (skillsRes.status === 'fulfilled' && skillsRes.value.success) {
        setSkills(skillsRes.value.data);
      }
      if (certsRes.status === 'fulfilled' && certsRes.value.success) {
        setCertificates(certsRes.value.data);
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-canvas text-content-primary selection:bg-lime/25 selection:text-lime">
      {/* Sticky Top Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 01. Hero Section */}
        <HeroSection about={about} />

        {/* 02. Selected Work */}
        <SelectedWorkSection projects={projects} />

        {/* 03. Capabilities */}
        <CapabilitiesSection />

        {/* 04. Engineering Philosophy */}
        <PhilosophySection />

        {/* 05. About Joseph */}
        <AboutSection about={about} />

        {/* 06. Technology Ecosystem (Toolkit) */}
        <ToolkitSection skills={skills} />

        {/* 07. Verified Certifications */}
        <CertificationsSection certificates={certificates} />

        {/* 08. Contact Section */}
        <ContactSection />
      </main>

      {/* Floating Scroll to Top Button */}
      <div
        className={`fixed bottom-8 right-8 z-sticky transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          type="button"
          className="p-3.5 rounded-full bg-lime text-canvas shadow-[0_0_20px_rgba(213,255,98,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(213,255,98,0.5)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-lime"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      </div>

      {/* Global Footer */}
      <Footer
        githubUrl={about?.github_url}
        linkedinUrl={about?.linkedin_url}
        twitterUrl={about?.twitter_url}
      />
    </div>
  );
}
