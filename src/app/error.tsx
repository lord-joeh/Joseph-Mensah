"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-canvas text-content-primary">
      <div className="bg-red-500/10 p-6 rounded-full mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
      </div>
      <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight text-content-primary">
        An error occurred
      </h1>
      <p className="text-content-secondary text-base md:text-lg mb-8 max-w-xl leading-relaxed">
        {error.message || "An unexpected error occurred while rendering this page."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => reset()}
          size="lg"
          className="gap-2 rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="gap-2 rounded-full border-surface-border text-content-primary hover:bg-surface-elevated"
        >
          <Link href="/">
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
