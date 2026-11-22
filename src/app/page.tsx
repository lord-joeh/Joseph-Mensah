import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ToolkitSection } from '@/components/sections/ToolkitSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
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

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  let about: AboutInfo | null = null;
  let projects: Project[] = [];
  let skills: Skill[] = [];
  let certificates: Certificate[] = [];

  try {
    const [aboutRes, projectsRes, skillsRes, certsRes] = await Promise.allSettled([
      getAboutInfo(),
      getProjects(),
      getSkills(),
      getCertificates(),
    ]);

    if (aboutRes.status === 'fulfilled' && aboutRes.value.success) {
      about = aboutRes.value.data;
    }
    if (projectsRes.status === 'fulfilled' && projectsRes.value.success) {
      projects = projectsRes.value.data;
    }
    if (skillsRes.status === 'fulfilled' && skillsRes.value.success) {
      skills = skillsRes.value.data;
    }
    if (certsRes.status === 'fulfilled' && certsRes.value.success) {
      certificates = certsRes.value.data;
    }
  } catch (err) {
    console.error('Failed to pre-fetch homepage data:', err);
  }

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
      <ScrollToTopButton />

      {/* Global Footer */}
      <Footer
        githubUrl={about?.github_url}
        linkedinUrl={about?.linkedin_url}
        twitterUrl={about?.twitter_url}
      />
    </div>
  );
}
