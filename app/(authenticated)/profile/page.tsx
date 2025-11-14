import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Debate {
  id: string;
  topic: string;
  status: string;
  for_participant: string | null;
  against_participant: string | null;
  created_at: string;
  judgment?: {
    winner_position: 'for' | 'against' | 'tie';
    scores: {
      for: { logic: number; evidence: number; rhetoric: number };
      against: { logic: number; evidence: number; rhetoric: number };
    };
  };
}

interface DebateWithPosition extends Debate {
  userPosition: 'for' | 'against';
  outcome: 'won' | 'lost' | 'tie' | 'pending';
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Layout will redirect
  }

  // Get page from search params
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const debatesPerPage = 10;
  const offset = (currentPage - 1) * debatesPerPage;

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch debates where user participated
  const { data: debates, count: totalDebates } = await supabase
    .from('debates')
    .select('id, topic, status, for_participant, against_participant, created_at', { count: 'exact' })
    .or(`for_participant.eq.${user.id},against_participant.eq.${user.id}`)
    .order('created_at', { ascending: false })
    .range(offset, offset + debatesPerPage - 1);

  // Fetch judgments for these debates
  const debateIds = debates?.map(d => d.id) || [];
  const { data: judgments } = await supabase
    .from('judgments')
    .select('debate_id, winner_position, scores')
    .in('debate_id', debateIds);

  // Process debates with their outcomes
  const debatesWithOutcomes: DebateWithPosition[] = (debates || []).map(debate => {
    const userPosition = debate.for_participant === user.id ? 'for' : 'against';
    const judgment = judgments?.find(j => j.debate_id === debate.id);

    let outcome: 'won' | 'lost' | 'tie' | 'pending' = 'pending';
    if (judgment) {
      if (judgment.winner_position === 'tie') {
        outcome = 'tie';
      } else if (judgment.winner_position === userPosition) {
        outcome = 'won';
      } else {
        outcome = 'lost';
      }
    } else if (debate.status === 'completed') {
      // Completed but no judgment yet - treat as pending
      outcome = 'pending';
    }

    return {
      ...debate,
      userPosition,
      outcome,
      judgment: judgment as any,
    };
  });

  // Calculate statistics
  const completedDebates = debatesWithOutcomes.filter(d => d.outcome !== 'pending');
  const wonDebates = debatesWithOutcomes.filter(d => d.outcome === 'won').length;
  const lostDebates = debatesWithOutcomes.filter(d => d.outcome === 'lost').length;
  const tieDebates = debatesWithOutcomes.filter(d => d.outcome === 'tie').length;
  const winRate = completedDebates.length > 0
    ? Math.round((wonDebates / completedDebates.length) * 100)
    : 0;

  // Calculate average scores from judgments
  const scoresData = debatesWithOutcomes
    .filter(d => d.judgment?.scores)
    .map(d => {
      const position = d.userPosition;
      return d.judgment!.scores[position];
    });

  const avgLogic = scoresData.length > 0
    ? (scoresData.reduce((sum, s) => sum + s.logic, 0) / scoresData.length).toFixed(1)
    : 'N/A';
  const avgEvidence = scoresData.length > 0
    ? (scoresData.reduce((sum, s) => sum + s.evidence, 0) / scoresData.length).toFixed(1)
    : 'N/A';
  const avgRhetoric = scoresData.length > 0
    ? (scoresData.reduce((sum, s) => sum + s.rhetoric, 0) / scoresData.length).toFixed(1)
    : 'N/A';

  // Pagination
  const totalPages = Math.ceil((totalDebates || 0) / debatesPerPage);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">
              {profile?.username || 'Philosopher'}
            </h1>
            {profile?.display_name && profile.display_name !== profile.username && (
              <p className="text-gray-300 text-lg mb-3">{profile.display_name}</p>
            )}
            {profile?.bio && (
              <p className="text-gray-400 mb-4">{profile.bio}</p>
            )}
            <p className="text-gray-400 text-sm">
              Member since {new Date(profile?.created_at || '').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-primary-600/20 to-accent-500/20 rounded-lg p-6 border border-accent-500/30 text-center">
              <p className="text-gray-300 text-sm mb-1">DeLO Rating</p>
              <p className="text-5xl font-bold text-accent-400">{profile?.reputation_score ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <p className="text-gray-400 text-sm mb-2">Total Debates</p>
          <p className="text-3xl font-bold text-white">{totalDebates || 0}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <p className="text-gray-400 text-sm mb-2">Debates Won</p>
          <p className="text-3xl font-bold text-green-400">{wonDebates}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <p className="text-gray-400 text-sm mb-2">Debates Lost</p>
          <p className="text-3xl font-bold text-red-400">{lostDebates}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <p className="text-gray-400 text-sm mb-2">Win Rate</p>
          <p className="text-3xl font-bold text-accent-400">{winRate}%</p>
        </div>
      </div>

      {/* Average Scores */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Average Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-600/10 rounded-lg p-4 border border-primary-500/30">
            <p className="text-gray-300 text-sm mb-1">Logic</p>
            <p className="text-2xl font-bold text-white">{avgLogic}/10</p>
          </div>
          <div className="bg-primary-600/10 rounded-lg p-4 border border-primary-500/30">
            <p className="text-gray-300 text-sm mb-1">Evidence</p>
            <p className="text-2xl font-bold text-white">{avgEvidence}/10</p>
          </div>
          <div className="bg-primary-600/10 rounded-lg p-4 border border-primary-500/30">
            <p className="text-gray-300 text-sm mb-1">Rhetoric</p>
            <p className="text-2xl font-bold text-white">{avgRhetoric}/10</p>
          </div>
        </div>
        {scoresData.length === 0 && (
          <p className="text-gray-400 text-sm mt-3 text-center">
            Complete judged debates to see your average scores
          </p>
        )}
      </div>

      {/* Debate History */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Debate History</h2>

        {debatesWithOutcomes.length > 0 ? (
          <div className="space-y-4">
            {debatesWithOutcomes.map((debate) => (
              <Link
                key={debate.id}
                href={`/debates/${debate.id}`}
                className="block bg-white/5 rounded-lg p-4 border border-white/10 hover:border-accent-500 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {debate.topic}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          debate.userPosition === 'for'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {debate.userPosition.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          debate.outcome === 'won'
                            ? 'bg-green-500/30 text-green-200'
                            : debate.outcome === 'lost'
                            ? 'bg-red-500/30 text-red-200'
                            : debate.outcome === 'tie'
                            ? 'bg-yellow-500/30 text-yellow-200'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {debate.outcome === 'pending' ? 'IN PROGRESS' : debate.outcome.toUpperCase()}
                      </span>
                      {debate.judgment?.scores && (
                        <span className="text-gray-400 text-xs ml-2">
                          Avg: {(
                            (debate.judgment.scores[debate.userPosition].logic +
                              debate.judgment.scores[debate.userPosition].evidence +
                              debate.judgment.scores[debate.userPosition].rhetoric) / 3
                          ).toFixed(1)}/10
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(debate.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">No debates yet. Start your philosophical journey!</p>
            <Link
              href="/debates"
              className="inline-block px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition shadow-md"
            >
              Browse Debates
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 pt-6 border-t border-white/10">
            {currentPage > 1 && (
              <Link
                href={`/profile?page=${currentPage - 1}`}
                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition"
              >
                ← Previous
              </Link>
            )}

            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <Link
                    key={pageNum}
                    href={`/profile?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg transition ${
                      pageNum === currentPage
                        ? 'bg-accent-500 text-white shadow-md'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/profile?page=${currentPage + 1}`}
                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
