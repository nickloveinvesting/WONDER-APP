import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

/**
 * Login Page - Server Component with auth check
 * 
 * This page:
 * 1. Checks if user is already logged in (server-side)
 * 2. If logged in and valid, redirects to /home (dashboard)
 * 3. If not logged in, renders the LoginForm client component
 * 
 * This eliminates the client-side useEffect redirect pattern
 * which caused race conditions and flickering.
 */
export default async function LoginPage() {
  // Server-side auth check
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Only redirect if we have a valid user AND no error
  // This prevents phantom sessions from causing redirects
  if (user && !error) {
    // Double-check by trying to fetch user profile
    // If profile doesn't exist, the session is phantom
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      // Only redirect if profile exists (real user)
      if (profile && !profileError) {
        redirect('/home');
      }
    } catch (e) {
      // Profile lookup failed, continue to show login form
    }
  }

  // User not logged in or session is phantom, render the login form
  return <LoginForm />;
}
