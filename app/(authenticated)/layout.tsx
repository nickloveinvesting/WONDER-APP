import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/ui/Header';
import { QuadrantNav } from '@/components/QuadrantNav';
import { signOut } from '@/lib/actions';

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
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('username, influence_score')
      .eq('id', user.id)
      .single();

    if (!error && profile) {
      userProfile = {
        id: user.id,
        username: profile.username || 'User',
        influenceScore: profile.influence_score || 0,
      };
    }
  } catch (error) {
    console.error('[AuthenticatedLayout] Failed to fetch profile:', error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <Header user={userProfile} onSignOut={signOut} />

      {/* Main Layout with Quadrant Nav */}
      <div className="flex-1 flex">
        {/* Left-hand Quadrant Navigation */}
        <QuadrantNav />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}