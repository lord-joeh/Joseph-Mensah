"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
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
  );
}
