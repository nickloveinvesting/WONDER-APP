import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const CATEGORY_LABELS: Record<string, { emoji: string; name: string }> = {
  ethics: { emoji: '⚖️', name: 'Ethics' },
  logic: { emoji: '🧠', name: 'Logic' },
  metaphysics: { emoji: '🌌', name: 'Metaphysics' },
  epistemology: { emoji: '📚', name: 'Epistemology' },
  political_philosophy: { emoji: '🏛️', name: 'Political Philosophy' },
  aesthetics: { emoji: '🎨', name: 'Aesthetics' }
};

const FORMAT_LABELS: Record<string, string> = {
  quick_match: '⚡ Quick',
  standard: '⚖️ Standard',
  deep_debate: '🔬 Deep',
  lightning_round: '💨 Lightning'
};

export default async function DebatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch all debates with participant info
  const { data: debates } = await supabase
    .from('debates')
    .select(`
      *,
      creator:created_by(username, display_name, delo_rating),
      for_user:for_participant(username, display_name, delo_rating),
      against_user:against_participant(username, display_name, delo_rating)
    `)
    .order('created_at', { ascending: false })
    .limit(20);

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
            {/* Navigation Links */}
            <div className="flex gap-4">
              <Link
                href="/leaderboards"
                className="px-3 py-2 text-gray-300 hover:text-white transition text-sm"
              >
                🏆 Leaderboards
              </Link>
              <Link
                href={`/profile/${user?.id}`}
                className="px-3 py-2 text-gray-300 hover:text-white transition text-sm"
              >
                👤 Profile
              </Link>
            </div>

            {/* User Info */}
            <div className="text-white">
              <span className="text-gray-400">Welcome,</span>{' '}
              <Link
                href={`/profile/${user?.id}`}
                className="font-medium hover:text-accent-400 transition"
              >
                {profile?.username}
              </Link>
              <span className="ml-2 text-accent-500">★ {profile?.delo_rating || profile?.reputation_score}</span>
            </div>

            {/* Sign Out */}
            <form action={handleSignOut}>
              <button className="px-4 py-2 text-gray-300 hover:text-white transition text-sm">
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
            debates.map((debate: any) => {
              const categoryLabel = CATEGORY_LABELS[debate.category] || CATEGORY_LABELS.ethics;
              const formatLabel = FORMAT_LABELS[debate.debate_format] || 'Standard';

              return (
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
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        debate.status === 'open'
                          ? 'bg-green-500/20 text-green-300'
                          : debate.status === 'in_progress'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {debate.status.replace('_', ' ')}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">
                        {categoryLabel.emoji} {categoryLabel.name}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-300">
                        {formatLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-gray-400">
                      Created by{' '}
                      <Link
                        href={`/profile/${debate.created_by}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-white font-medium hover:text-accent-400 transition"
                      >
                        {debate.creator?.username}
                      </Link>
                      {debate.creator?.delo_rating && (
                        <span className="text-accent-400 ml-1">{debate.creator.delo_rating}</span>
                      )}
                    </div>

                    {debate.status !== 'open' && (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">FOR:</span>
                          <Link
                            href={`/profile/${debate.for_participant}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-white hover:text-accent-400 transition font-medium"
                          >
                            {debate.for_user?.username || 'TBD'}
                          </Link>
                          {debate.for_user?.delo_rating && (
                            <span className="text-green-300 text-xs">{debate.for_user.delo_rating}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">AGAINST:</span>
                          <Link
                            href={`/profile/${debate.against_participant}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-white hover:text-accent-400 transition font-medium"
                          >
                            {debate.against_user?.username || 'TBD'}
                          </Link>
                          {debate.against_user?.delo_rating && (
                            <span className="text-red-300 text-xs">{debate.against_user.delo_rating}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              );
            })
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
