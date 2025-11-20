import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Root /home page - checks auth status
 * If authenticated: allows authenticated layout to render
 * If unauthenticated: redirects to landing page
 */
export default async function HomeRedirect() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not authenticated, redirect to landing page
  if (!user) {
    redirect('/');
  }

  // If authenticated, redirect to the authenticated dashboard
  redirect('/(authenticated)/home');
}
