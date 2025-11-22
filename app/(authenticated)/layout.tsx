import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AuthenticatedShell } from '@/components/AuthenticatedShell';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Temporarily disable caching to ensure fresh data
export const dynamic = 'force-dynamic';

// Direct profile fetch (bypassing cache for now to fix header display)
async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, influence_score, daily_streak, longest_streak, streak_protected')
    .eq('id', userId)
    .single();

  return profile;
}

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect('/auth/login');
  }

  // Fetch user profile data for display in header
  let userProfile = null;
  try {
    const profile = await getProfile(user.id);

    if (profile) {
      userProfile = {
        id: user.id,
        username: profile.username || 'User',
        email: user.email,
        influenceScore: profile.influence_score || 0,
        dailyStreak: profile.daily_streak || 0,
        longestStreak: profile.longest_streak || 0,
        streakProtected: profile.streak_protected || false,
      };
    }
  } catch (error) {
    // Failed to fetch profile - fail silently
  }

  return (
    <ErrorBoundary>
      <AuthenticatedShell user={userProfile}>
        {children}
      </AuthenticatedShell>
    </ErrorBoundary>
  );
}