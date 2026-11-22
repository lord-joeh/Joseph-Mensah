"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';

export interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export function Footer({
  githubUrl = 'https://github.com/lord-joeh',
  linkedinUrl = 'https://www.linkedin.com/in/josephtettehmensah',
  twitterUrl,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-surface-border bg-canvas pt-16 pb-12 text-content-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-surface-border">
          {/* Identity */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display font-black text-3xl tracking-tighter text-content-primary">
              JM<span className="text-lime">.</span>
            </span>
            <p className="text-sm text-content-secondary max-w-sm leading-relaxed">
              Software Engineer &amp; Digital Product Builder based in Accra, Ghana. Designing, building and deploying robust full-stack and mobile applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="uppercase text-content-muted tracking-wider block mb-2">Navigation</span>
            <ul className="space-y-2">
              <li><a href="#projects" className="text-content-secondary hover:text-lime transition-colors">Selected Work</a></li>
              <li><a href="#capabilities" className="text-content-secondary hover:text-lime transition-colors">Capabilities</a></li>
              <li><a href="#philosophy" className="text-content-secondary hover:text-lime transition-colors">Philosophy</a></li>
              <li><a href="#about" className="text-content-secondary hover:text-lime transition-colors">About Joseph</a></li>
              <li><a href="#contact" className="text-content-secondary hover:text-lime transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="uppercase text-content-muted tracking-wider block mb-2">Connect</span>
            <div className="flex gap-4 items-center">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-content-secondary hover:text-lime hover:border-lime/40 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-content-secondary hover:text-lime hover:border-lime/40 transition-all"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-content-secondary hover:text-lime hover:border-lime/40 transition-all"
                  aria-label="Twitter / X Profile"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="pt-2 text-content-muted text-[11px]">
              Location: Accra, Ghana
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-content-muted">
          <div>
            &copy; {new Date().getFullYear()} Joseph Mensah. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-lime transition-colors group focus-visible:ring-1 focus-visible:ring-lime rounded-sm p-1"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1 text-lime" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
