import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DebatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Must be logged in
  if (!user) {
    redirect('/auth/login');
  }

  let profile = null;
  let debates = [];

  try {
    // Try to get profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    profile = profileData;

    // If no profile, create one
    if (!profile) {
      await supabase.from('profiles').insert({
        id: user.id,
        username: `user_${user.id.substring(0, 8)}`,
        display_name: 'New Philosopher',
        reputation_score: 0,
        debates_won: 0,
        debates_participated: 0,
      });

      // Fetch the newly created profile
      const { data: newProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      profile = newProfile;
    }
  } catch (profileError) {
    console.error('Profile error:', profileError);
    // Continue without profile - we'll show a placeholder
  }

  try {
    // Fetch debates
    const { data: debatesData } = await supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    debates = debatesData || [];
  } catch (debatesError) {
    console.error('Debates error:', debatesError);
  }

  const handleSignOut = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
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
              <span className="text-gray-400">Welcome,</span>{' '}
              <span className="font-medium">{profile?.username || 'Philosopher'}</span>
              <span className="ml-2 text-accent-500">★ {profile?.reputation_score ?? 0}</span>
            </div>
            <form action={handleSignOut}>
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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    debate.status === 'open'
                      ? 'bg-green-500/20 text-green-300'
                      : debate.status === 'in_progress'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
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
