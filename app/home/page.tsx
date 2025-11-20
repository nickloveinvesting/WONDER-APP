import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Root /home page
 * This handles the redirect to the authenticated dashboard
 * If not authenticated, the authenticated layout will redirect to /auth/login
 */
export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Only authenticated users can access this page
  // Redirect to the actual authenticated home
  if (user) {
    // This will load the (authenticated)/home/page.tsx content
    const response = await fetch(new URL('/(authenticated)/home', process.env.NEXTAUTH_URL || 'http://localhost:3000'), {
      headers: {
        'x-auth-user-id': user.id,
      },
    });
  }

  // If not logged in, show login page
  redirect('/auth/login');
}
