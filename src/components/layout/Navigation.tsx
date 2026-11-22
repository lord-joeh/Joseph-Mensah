"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { cn } from '@/lib/utils';
import { EASING, DURATION } from '@/lib/motion/tokens';

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
          isScrolled
            ? 'py-3 sm:py-4 bg-canvas/85 backdrop-blur-xl border-b border-surface-border shadow-2xl'
            : 'py-6 sm:py-8 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Monogram Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:ring-1 focus-visible:ring-lime rounded-md"
            aria-label="Joseph Mensah Homepage"
          >
            <span className="font-display font-black text-2xl tracking-tighter text-content-primary group-hover:text-lime transition-colors">
              JM<span className="text-lime">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-content-secondary" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-content-primary transition-colors duration-200 relative py-1 focus-visible:ring-1 focus-visible:ring-lime rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton strength={0.25}>
              <Button
                asChild
                className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium text-xs px-5 h-9 tracking-wider shadow-[0_0_20px_rgba(213,255,98,0.15)] transition-all hover:shadow-[0_0_25px_rgba(213,255,98,0.3)]"
              >
                <a href="#contact" className="inline-flex items-center gap-1.5">
                  Let&apos;s talk <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-content-primary hover:text-lime focus-visible:ring-2 focus-visible:ring-lime transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: DURATION.standard, ease: EASING.cinematic }}
            className="fixed inset-0 z-mobileMenu bg-canvas/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Header in menu */}
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <span className="font-display font-black text-2xl tracking-tighter text-content-primary">
                JM<span className="text-lime">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-content-primary hover:text-lime focus-visible:ring-2 focus-visible:ring-lime"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="py-8 space-y-5 flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: DURATION.standard,
                    delay: shouldReduceMotion ? 0 : 0.05 + index * 0.06,
                    ease: EASING.cinematic,
                  }}
                  className="text-display-md font-display font-bold text-content-primary hover:text-lime transition-colors flex items-center justify-between py-2 border-b border-surface-border/40"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-content-muted">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>

            {/* Mobile Footer CTA */}
            <div className="pt-6 border-t border-surface-border space-y-4">
              <Button
                asChild
                className="w-full h-12 rounded-xl bg-lime text-canvas hover:bg-lime/90 font-semibold text-base"
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Start a conversation
                </a>
              </Button>
              <div className="flex items-center justify-between text-xs font-mono text-content-muted pt-2">
                <span>Accra, Ghana</span>
                <span>Available for Q1/Q2</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
