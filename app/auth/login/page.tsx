import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

/**
 * Login Page - Server Component with auth check
 * 
 * This page:
 * 1. Checks if user is already logged in (server-side)
 * 2. If logged in, redirects to /home (dashboard)
 * 3. If not logged in, renders the LoginForm client component
 * 
 * This eliminates the client-side useEffect redirect pattern
 * which caused race conditions and flickering.
 */
export default async function LoginPage() {
  // Server-side auth check
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // If already logged in, redirect to dashboard
  // This is server-side, so no flicker or race condition
  if (user && !error) {
    redirect('/home');
  }

  // User not logged in, render the login form
  return <LoginForm />;
}
