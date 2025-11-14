import { createClient } from '@/lib/supabase/server';
import { Trophy, Medal, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

interface LeaderboardEntry {
  id: string;
  username: string;
  delo_rating: number;
  reputation_score: number;
  total_debates: number;
  debates_won: number;
  win_rate: number;
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <span className="text-2xl">🥇</span>;
    case 2:
      return <span className="text-2xl">🥈</span>;
    case 3:
      return <span className="text-2xl">🥉</span>;
    default:
      return <span className="text-gray-400 font-semibold">#{rank}</span>;
  }
}

function getRankBgColor(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
    case 2:
      return 'bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30';
    case 3:
      return 'bg-gradient-to-r from-orange-600/20 to-orange-700/10 border-orange-600/30';
    default:
      return '';
  }
}

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch leaderboard data with aggregated stats
  const { data: leaderboardData, error } = await supabase
    .rpc('get_leaderboard', {})
    .limit(100);

  // If the RPC doesn't exist yet, fall back to a complex query
  let leaderboard: LeaderboardEntry[] = [];

  if (error || !leaderboardData) {
    // Fallback query using manual aggregation
    const { data: profiles } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        delo_rating,
        reputation_score,
        debates_won,
        debates_participated
      `)
      .order('delo_rating', { ascending: false })
      .limit(100);

    if (profiles) {
      leaderboard = profiles.map(p => ({
        id: p.id,
        username: p.username,
        delo_rating: p.delo_rating || 1000,
        reputation_score: p.reputation_score || 0,
        total_debates: p.debates_participated || 0,
        debates_won: p.debates_won || 0,
        win_rate: p.debates_participated > 0
          ? Math.round((p.debates_won / p.debates_participated) * 100)
          : 0,
      }));
    }
  } else {
    leaderboard = leaderboardData;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="text-accent-500" size={32} />
          <h1 className="text-4xl font-bold text-white">Philosopher Leaderboard</h1>
        </div>
        <p className="text-gray-400">Top 100 philosophers ranked by DeLO rating</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent-500/20 rounded-lg">
              <Trophy className="text-accent-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Philosophers</p>
              <p className="text-2xl font-bold text-white">{leaderboard.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-600/20 rounded-lg">
              <Medal className="text-primary-300" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Highest DeLO</p>
              <p className="text-2xl font-bold text-white">
                {leaderboard[0]?.delo_rating || 1000}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Award className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Best Win Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.max(...leaderboard.map(p => p.win_rate), 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10 sticky top-0 backdrop-blur-lg">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 w-20">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">DeLO Rating</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Reputation</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Debates</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Wins</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((profile, index) => {
                  const rank = index + 1;
                  const isCurrentUser = user?.id === profile.id;
                  const rankBg = getRankBgColor(rank);

                  return (
                    <tr
                      key={profile.id}
                      className={`
                        transition-colors
                        ${rankBg ? `${rankBg} border-l-4` : 'hover:bg-white/5'}
                        ${isCurrentUser ? 'bg-primary-600/20 border-l-4 border-primary-500' : ''}
                      `}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">
                            {profile.username}
                          </span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-accent-400 font-bold text-lg">
                          {profile.delo_rating}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-400 font-medium">
                          ★ {profile.reputation_score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">
                        {profile.total_debates}
                      </td>
                      <td className="px-6 py-4 text-green-400 font-medium">
                        {profile.debates_won}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2 w-20">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                              style={{ width: `${profile.win_rate}%` }}
                            />
                          </div>
                          <span className="text-white font-medium text-sm w-12 text-right">
                            {profile.win_rate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Trophy className="text-gray-600" size={64} />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Be the First Philosopher!
                        </h3>
                        <p className="text-gray-400">
                          Start debating to appear on the leaderboard
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((profile, index) => {
              const rank = index + 1;
              const isCurrentUser = user?.id === profile.id;
              const rankBg = getRankBgColor(rank);

              return (
                <div
                  key={profile.id}
                  className={`
                    p-4
                    ${rankBg ? `${rankBg} border-l-4` : ''}
                    ${isCurrentUser ? 'bg-primary-600/20 border-l-4 border-primary-500' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{profile.username}</span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-accent-400 font-bold text-lg">
                          {profile.delo_rating} DeLO
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Reputation:</span>
                      <span className="ml-2 text-yellow-400 font-medium">
                        ★ {profile.reputation_score}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Debates:</span>
                      <span className="ml-2 text-white font-medium">
                        {profile.total_debates}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Wins:</span>
                      <span className="ml-2 text-green-400 font-medium">
                        {profile.debates_won}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Win Rate:</span>
                      <span className="ml-2 text-white font-medium">
                        {profile.win_rate}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${profile.win_rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <Trophy className="text-gray-600" size={64} />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Be the First Philosopher!
                  </h3>
                  <p className="text-gray-400">
                    Start debating to appear on the leaderboard
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-primary-600/10 border border-primary-500/30 rounded-xl">
        <p className="text-primary-200 text-sm">
          <strong>DeLO Rating System:</strong> Similar to chess Elo, your DeLO rating increases when you win debates
          and decreases when you lose. All philosophers start at 1000 DeLO. The more debates you win, the higher you climb!
        </p>
      </div>
    </div>
  );
}
