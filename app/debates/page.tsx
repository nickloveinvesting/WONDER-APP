import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/app/auth/actions';

// Prevent caching - server component must run on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DebatesPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // Must be logged in
  if (!user || authError) {
    console.error('[DebatesPage] Auth check failed:', authError?.message);
    redirect('/auth/login');
  }

  console.log(`[DebatesPage] User authenticated: ${user.id}`);

  let profile = null;
  let debates = [];

  // CRITICAL: Profile initialization with explicit error handling
  try {
    // Step 1: Try to fetch existing profile
    const { data: profileData, error: profileFetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileFetchError) {
      console.error('[DebatesPage] Profile fetch error:', profileFetchError.message);
      throw new Error(`Profile fetch failed: ${profileFetchError.message}`);
    }

    profile = profileData;

    // Step 2: If no profile exists, create one immediately with .select()
    if (!profile) {
      console.log(`[DebatesPage] Creating new profile for user: ${user.id}`);
      
      const { data: createdProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: `user_${user.id.substring(0, 8)}`,
          display_name: 'New Philosopher',
          reputation_score: 0,
          debates_won: 0,
          debates_participated: 0,
        })
        .select()
        .single();

      if (insertError) {
        console.error('[DebatesPage] Profile creation failed:', insertError.message);
        throw new Error(`Profile creation failed: ${insertError.message}`);
      }

      profile = createdProfile;
      console.log(`[DebatesPage] Profile created successfully`);
    } else {
      console.log(`[DebatesPage] Profile exists for user: ${user.id}`);
    }
  } catch (profileError: any) {
    // If profile initialization fails, log it and show user-facing error
    console.error('[DebatesPage] CRITICAL - Profile initialization failed:', profileError.message);
    
    // Return error UI instead of silently continuing
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="bg-red-500/20 border border-red-500 rounded-xl p-6">
            <h1 className="text-2xl font-bold text-red-300 mb-2">Profile Error</h1>
            <p className="text-red-200 mb-4">{profileError.message}</p>
            <p className="text-red-200 text-sm mb-6">Please try signing out and back in.</p>
            <form action={signOut}>
              <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                Sign Out & Retry
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Fetch debates (only after profile is ready)
  try {
    const { data: debatesData, error: debatesError } = await supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (debatesError) {
      console.error('[DebatesPage] Debates fetch error:', debatesError.message);
    } else {
      debates = debatesData || [];
      console.log(`[DebatesPage] Loaded ${debates.length} debates`);
    }
  } catch (debatesError) {
    console.error('[DebatesPage] Unexpected error fetching debates:', debatesError);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-300';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/debates" className="text-2xl font-bold text-white">
            PhiloDuel
          </Link>

          <div className="flex items-center gap-6">
            <div className="text-white">
              <span className="text-gray-400">Welcome,</span> <span className="font-medium">{profile?.username || 'Philosopher'}</span>
              <span className="ml-2 text-accent-500">★ {profile?.reputation_score ?? 0}</span>
            </div>
            <form action={signOut}>
              <button className="px-4 py-2 text-gray-300 hover:text-white transition">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Create Debate Button */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Active Debates</h1>
          <Link
            href="/debates/create"
            className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition font-medium"
          >
            + Create Debate
          </Link>
        </div>

        {/* Debates List */}
        <div className="space-y-4">
          {debates && debates.length > 0 ? (
            debates.map((debate: any) => (
              <Link
                key={debate.id}
                href={`/debates/${debate.id}`}
                className="block bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-accent-500 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{debate.topic}</h3>
                    {debate.description && (
                      <p className="text-gray-300 mb-3">{debate.description}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(debate.status)}`}>
                    {debate.status?.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No debates yet. Be the first!</p>
              <Link
                href="/debates/create"
                className="inline-block px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition"
              >
                Create First Debate
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
