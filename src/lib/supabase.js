import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://kgqotwnboauopvxwouik.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncW90d25ib2F1b3B2eHdvdWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4ODg4ODAsImV4cCI6MjAzMjQ2NDg4MH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);