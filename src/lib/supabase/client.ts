import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xckruzkltbawoksfmtbr.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja3J1emtsdGJhd29rc2ZtdGJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MzY2NzEsImV4cCI6MjEwMDIxMjY3MX0.7Ejun-FsiUrIEiUxP8Lq3gLy0akfedZtpf3ihGJypCE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
