"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/supabase/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Lock, Mail, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && session) {
      router.replace('/admin');
    }
  }, [session, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        toast.error(error.message);
      } else if (data.session) {
        toast.success("Signed in successfully");
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in");
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lime" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-content-secondary hover:text-content-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
          <span className="font-mono text-xs text-lime">JM. ADMIN</span>
        </div>

        <Card className="bg-surface border-surface-border shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center mx-auto text-lime">
              <Lock className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-display font-bold text-content-primary">
              Admin Access
            </CardTitle>
            <CardDescription className="text-content-secondary text-sm">
              Sign in with your verified credentials to manage portfolio content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-content-secondary uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-content-muted absolute left-3 top-3.5 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="admin@dev-joseph.me"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="pl-9 h-11 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary placeholder:text-content-muted"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-content-secondary uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-content-muted absolute left-3 top-3.5 pointer-events-none" />
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pl-9 h-11 bg-surface-elevated border-surface-border focus-visible:ring-lime text-content-primary placeholder:text-content-muted"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-lime hover:bg-lime/90 text-canvas font-medium text-sm transition-all shadow-[0_0_20px_rgba(213,255,98,0.2)] mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                  </>
                ) : (
                  'Sign In to Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-content-muted font-mono">
          Protected by Supabase Auth & JWT Verification
        </p>
      </div>
    </div>
  );
}
