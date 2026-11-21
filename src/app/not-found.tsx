import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-canvas">
      <div className="space-y-6 max-w-md">
        <span className="font-mono text-xs tracking-widest text-lime uppercase px-3 py-1 rounded-full border border-lime/30 bg-lime/5">
          404 — Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-content-primary">
          Page doesn&apos;t exist.
        </h1>
        <p className="text-content-secondary text-base">
          The page or case study you requested could not be found. It may have been moved or updated.
        </p>
        <div className="pt-2">
          <Button asChild className="rounded-full bg-lime text-canvas hover:bg-lime/90 font-medium px-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
