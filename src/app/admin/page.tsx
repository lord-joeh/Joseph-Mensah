"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  getProjects,
  getSkills,
  getCertificates,
  getAboutInfo,
  getHealth,
  getNotifications,
  type HealthResponse,
} from '@/lib/api';
import { useAuth } from '@/lib/supabase/AuthContext';
import {
  Briefcase,
  Code,
  Award,
  Mail,
  FileText,
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { session } = useAuth();
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    certificates: 0,
    inquiries: 0,
    aboutSet: false,
  });
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const [pRes, sRes, cRes, aRes, hRes] = await Promise.allSettled([
          getProjects(),
          getSkills(),
          getCertificates(),
          getAboutInfo(),
          getHealth(),
        ]);

        let notifCount = 0;
        if (session?.access_token) {
          try {
            const nRes = await getNotifications(session.access_token);
            if (nRes.success && Array.isArray(nRes.data)) {
              notifCount = nRes.data.length;
            }
          } catch {
            // Ignore inquiry count failure
          }
        }

        setCounts({
          projects: pRes.status === 'fulfilled' && pRes.value.success ? pRes.value.data.length : 0,
          skills: sRes.status === 'fulfilled' && sRes.value.success ? sRes.value.data.length : 0,
          certificates: cRes.status === 'fulfilled' && cRes.value.success ? cRes.value.data.length : 0,
          inquiries: notifCount,
          aboutSet: aRes.status === 'fulfilled' && Boolean(aRes.value.data?.about_text),
        });

        if (hRes.status === 'fulfilled') {
          setHealth(hRes.value);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [session]);

  const cards = [
    {
      title: 'Projects',
      count: counts.projects,
      desc: 'Active portfolio case studies',
      href: '/admin/projects',
      icon: Briefcase,
    },
    {
      title: 'Skills',
      count: counts.skills,
      desc: 'Technical competencies & stack',
      href: '/admin/skills',
      icon: Code,
    },
    {
      title: 'Certificates',
      count: counts.certificates,
      desc: 'Credentials and recognitions',
      href: '/admin/certificates',
      icon: Award,
    },
    {
      title: 'Inquiries',
      count: counts.inquiries,
      desc: 'Contact submissions received',
      href: '/admin/notifications',
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <span className="font-mono text-xs text-lime uppercase tracking-wider block mb-1">
            System Overview
          </span>
          <h1 className="text-3xl font-display font-bold text-content-primary">
            Dashboard
          </h1>
          <p className="text-content-secondary text-sm mt-1">
            Manage your personal engineering portfolio content and inspect system health.
          </p>
        </div>

        {/* Backend Status Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface border border-surface-border text-xs font-mono">
          <Activity className="w-4 h-4 text-lime" />
          <span className="text-content-secondary">NestJS Backend:</span>
          {health?.status === 'ok' ? (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> Checking...
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-lime" />
          <span className="text-xs font-mono text-content-secondary uppercase">
            Loading metrics...
          </span>
        </div>
      ) : (
        <>
          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <Card
                  key={c.title}
                  className="bg-surface border-surface-border hover:border-lime/30 transition-all hover:-translate-y-0.5 group"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium text-content-secondary">
                      {c.title}
                    </CardTitle>
                    <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-content-primary group-hover:text-lime transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-display text-content-primary">
                      {c.count}
                    </div>
                    <p className="text-xs text-content-muted mt-1">{c.desc}</p>
                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="p-0 h-auto text-xs font-mono text-lime hover:text-lime/80 hover:bg-transparent"
                      >
                        <Link href={c.href} className="inline-flex items-center gap-1.5">
                          Manage {c.title} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Shortcuts & Profile Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-surface border-surface-border">
              <CardHeader>
                <CardTitle className="text-lg font-display font-bold text-content-primary">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-content-secondary text-xs">
                  Frequently accessed content management operations
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="justify-start gap-2.5 h-12 bg-surface-elevated border-surface-border hover:border-lime/40 text-content-primary"
                >
                  <Link href="/admin/projects">
                    <Briefcase className="w-4 h-4 text-lime" /> Add / Reorder Projects
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="justify-start gap-2.5 h-12 bg-surface-elevated border-surface-border hover:border-lime/40 text-content-primary"
                >
                  <Link href="/admin/skills">
                    <Code className="w-4 h-4 text-lime" /> Update Technical Skills
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="justify-start gap-2.5 h-12 bg-surface-elevated border-surface-border hover:border-lime/40 text-content-primary"
                >
                  <Link href="/admin/about">
                    <FileText className="w-4 h-4 text-lime" /> Edit Bio & Upload Resume
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="justify-start gap-2.5 h-12 bg-surface-elevated border-surface-border hover:border-lime/40 text-content-primary"
                >
                  <Link href="/admin/notifications">
                    <Mail className="w-4 h-4 text-lime" /> View Inbound Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-surface border-surface-border">
              <CardHeader>
                <CardTitle className="text-lg font-display font-bold text-content-primary">
                  Profile Status
                </CardTitle>
                <CardDescription className="text-content-secondary text-xs">
                  Biographical and resume configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-content-secondary">Biographical Narrative:</span>
                  <span className={counts.aboutSet ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {counts.aboutSet ? 'Configured' : 'Missing'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-content-secondary">Active Portfolio Origin:</span>
                  <span className="text-content-primary truncate max-w-[140px]">
                    dev-joseph.me
                  </span>
                </div>
                <div className="pt-2">
                  <Button asChild className="w-full bg-lime text-canvas hover:bg-lime/90 font-medium">
                    <Link href="/admin/about">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
