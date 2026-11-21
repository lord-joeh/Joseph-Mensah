"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  LogOut,
  FileText,
  Briefcase,
  Award,
  Code,
  Mail,
  Loader2,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/about', label: 'About & Bio', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', icon: Code },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/notifications', label: 'Inquiries', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-lime" />
        <p className="font-mono text-xs text-content-secondary tracking-widest uppercase">
          Verifying authorization...
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-canvas text-content-primary flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-surface-border sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-bold text-lime">JM.</span>
          <span className="text-xs uppercase font-mono tracking-wider text-content-secondary">
            Admin Console
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-content-primary"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-surface/98 backdrop-blur-xl border-b border-surface-border z-40 p-4 flex flex-col justify-between">
          <nav className="space-y-1 pt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-lime text-canvas font-semibold'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-surface-border space-y-3 pb-6">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono text-content-secondary hover:text-content-primary hover:bg-surface-elevated"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 h-10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surface-border fixed top-0 bottom-0 left-0 z-30">
        <div className="p-6 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lime/10 border border-lime/30 flex items-center justify-center font-mono font-bold text-xs text-lime">
              JM
            </div>
            <div>
              <h2 className="text-sm font-bold font-display text-content-primary leading-tight">
                Admin Console
              </h2>
              <span className="text-[10px] font-mono text-content-muted">
                v2.0 · Next.js
              </span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="px-5 py-3.5 mx-3 my-3 rounded-xl bg-surface-elevated border border-surface-border/50">
          <span className="text-[10px] uppercase font-mono tracking-wider text-content-muted block mb-0.5">
            Authenticated as
          </span>
          <p className="text-xs font-mono text-content-primary truncate font-medium">
            {user?.email || 'admin'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-lime text-canvas font-semibold shadow-[0_0_15px_rgba(213,255,98,0.15)]'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-surface-border space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 px-3.5 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10 min-h-screen max-w-7xl">
        {children}
      </main>
    </div>
  );
}
