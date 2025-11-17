import { createClient } from '@/lib/supabase/server';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

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
      return <span className="text-slate-900 font-semibold">#{rank}</span>;
  }
}

function getRankBgColor(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-yellow-50 border-l-4 border-yellow-500';
    case 2:
      return 'bg-slate-50 border-l-4 border-slate-400';
    case 3:
      return 'bg-amber-50 border-l-4 border-amber-600';
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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="text-teal-600" size={32} />
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Philosopher Leaderboard
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Top 100 philosophers ranked by DeLO rating
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="gradient">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/10 rounded-xl">
                <Trophy className="text-teal-600" size={24} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-bold">Total Philosophers</p>
                <p className="text-2xl font-black text-slate-900">{leaderboard.length}</p>
              </div>
            </div>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-500/10 rounded-xl">
                <Medal className="text-slate-700" size={24} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-bold">Highest DeLO</p>
                <p className="text-2xl font-black text-teal-600">
                  {leaderboard[0]?.delo_rating || 1000}
                </p>
              </div>
            </div>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <Award className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-bold">Best Win Rate</p>
                <p className="text-2xl font-black text-green-600">
                  {Math.max(...leaderboard.map(p => p.win_rate), 0)}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card variant="standard" className="overflow-hidden p-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b-2 border-slate-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900 w-20">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">DeLO Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Reputation</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Debates</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Wins</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Win Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leaderboard && leaderboard.length > 0 ? (
                  leaderboard.map((profile, index) => {
                    const rank = index + 1;
                    const isCurrentUser = user?.id === profile.id;
                    const rankBg = getRankBgColor(rank);

                    return (
                      <tr
                        key={profile.id}
                        className={`
                          transition-colors hover:bg-slate-50
                          ${rankBg}
                          ${isCurrentUser ? 'bg-teal-50/50' : ''}
                        `}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center w-12">
                            {getRankIcon(rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-black">
                              {profile.username}
                            </span>
                            {isCurrentUser && (
                              <span className="px-2 py-1 bg-teal-500/20 text-teal-700 text-xs rounded-full font-bold">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-teal-600 font-black text-lg">
                            {profile.delo_rating}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-700 font-bold">
                            ★ {profile.reputation_score}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-900 font-bold">
                          {profile.total_debates}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-bold">
                          {profile.debates_won}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                              <div
                                className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all"
                                style={{ width: `${profile.win_rate}%` }}
                              />
                            </div>
                            <span className="text-slate-900 font-bold text-sm w-12 text-right">
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
                        <Trophy className="text-slate-300" size={64} />
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-2">
                            Be the First Philosopher!
                          </h3>
                          <p className="text-slate-600 font-medium">
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
          <div className="md:hidden divide-y divide-slate-200">
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
                      ${rankBg}
                      ${isCurrentUser ? 'bg-teal-50/50' : ''}
                    `}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 flex items-center justify-center">
                          {getRankIcon(rank)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-black">{profile.username}</span>
                            {isCurrentUser && (
                              <span className="px-2 py-1 bg-teal-500/20 text-teal-700 text-xs rounded-full font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-teal-600 font-black text-lg">
                            {profile.delo_rating} DeLO
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-600 font-medium">Reputation:</span>
                        <span className="ml-2 text-slate-900 font-bold">
                          ★ {profile.reputation_score}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-medium">Debates:</span>
                        <span className="ml-2 text-slate-900 font-bold">
                          {profile.total_debates}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-medium">Wins:</span>
                        <span className="ml-2 text-green-600 font-bold">
                          {profile.debates_won}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-medium">Win Rate:</span>
                        <span className="ml-2 text-slate-900 font-bold">
                          {profile.win_rate}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all"
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
                  <Trophy className="text-slate-300" size={64} />
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      Be the First Philosopher!
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Start debating to appear on the leaderboard
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Footer Info */}
        <Card variant="gradient" className="mt-6">
          <p className="text-slate-700 font-medium text-sm leading-relaxed">
            <strong className="text-slate-900">DeLO Rating System:</strong> Similar to chess Elo, your DeLO rating increases when you win debates
            and decreases when you lose. All philosophers start at 1000 DeLO. The more debates you win, the higher you climb!
          </p>
        </Card>
      </div>
    </div>
  );
}
