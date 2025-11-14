import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing environment variable: NEXT_PUBLIC_SUPABASE_URL. ' +
      'This should be set in your Vercel project environment variables. ' +
      'Value should be: https://cbnqsuzsvkjfieplmahn.supabase.co'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'This should be set in your Vercel project environment variables.'
    );
  }

  // Validate URL format
  if (!supabaseUrl.startsWith('https://')) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL format. Expected https:// URL, got: ${supabaseUrl}`
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}