"use client";

import React from 'react';
import { AuthProvider } from '@/lib/supabase/AuthContext';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
