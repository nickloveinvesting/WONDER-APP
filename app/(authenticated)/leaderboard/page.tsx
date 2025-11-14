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
      return <span className="text-argued-navy font-semibold">#{rank}</span>;
  }
}

function getRankBgColor(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-argued-brown/10 border-l-4 border-argued-brown';
    case 2:
      return 'bg-argued-navy/10 border-l-4 border-argued-navy';
    case 3:
      return 'bg-argued-success/10 border-l-4 border-argued-success';
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
          <Trophy className="text-argued-brown" size={32} />
          <h1 className="text-4xl font-bold text-argued-navy">Philosopher Leaderboard</h1>
        </div>
        <p className="text-argued-navy font-medium">Top 100 philosophers ranked by DeLO rating</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-argued-brown/10 rounded-lg">
              <Trophy className="text-argued-brown" size={24} />
            </div>
            <div>
              <p className="text-argued-navy text-sm font-medium">Total Philosophers</p>
              <p className="text-2xl font-bold text-argued-navy">{leaderboard.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-argued-navy/10 rounded-lg">
              <Medal className="text-argued-navy" size={24} />
            </div>
            <div>
              <p className="text-argued-navy text-sm font-medium">Highest DeLO</p>
              <p className="text-2xl font-bold text-argued-navy">
                {leaderboard[0]?.delo_rating || 1000}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-argued-success/10 rounded-lg">
              <Award className="text-argued-success" size={24} />
            </div>
            <div>
              <p className="text-argued-navy text-sm font-medium">Best Win Rate</p>
              <p className="text-2xl font-bold text-argued-navy">
                {Math.max(...leaderboard.map(p => p.win_rate), 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl border border-argued-cream overflow-hidden shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-argued-cream border-b border-argued-navy/10 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy w-20">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">Username</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">DeLO Rating</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">Reputation</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">Debates</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">Wins</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-argued-navy">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-argued-cream">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((profile, index) => {
                  const rank = index + 1;
                  const isCurrentUser = user?.id === profile.id;
                  const rankBg = getRankBgColor(rank);

                  return (
                    <tr
                      key={profile.id}
                      className={`
                        transition-colors hover:bg-argued-cream/50
                        ${rankBg}
                        ${isCurrentUser ? 'bg-argued-navy/10' : ''}
                      `}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-argued-navy font-bold">
                            {profile.username}
                          </span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-argued-navy/10 text-argued-navy text-xs rounded-full font-bold">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-argued-brown font-bold text-lg">
                          {profile.delo_rating}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-argued-navy font-bold">
                          ★ {profile.reputation_score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-argued-navy font-bold">
                        {profile.total_debates}
                      </td>
                      <td className="px-6 py-4 text-argued-success font-bold">
                        {profile.debates_won}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-argued-cream rounded-full h-2 w-20">
                            <div
                              className="bg-gradient-to-r from-argued-success to-argued-brown h-2 rounded-full transition-all"
                              style={{ width: `${profile.win_rate}%` }}
                            />
                          </div>
                          <span className="text-argued-navy font-bold text-sm w-12 text-right">
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
                      <Trophy className="text-argued-navy/20" size={64} />
                      <div>
                        <h3 className="text-xl font-bold text-argued-navy mb-2">
                          Be the First Philosopher!
                        </h3>
                        <p className="text-argued-navy">
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
        <div className="md:hidden divide-y divide-argued-cream">
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
                    ${isCurrentUser ? 'bg-argued-navy/10' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-argued-navy font-bold">{profile.username}</span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-argued-navy/10 text-argued-navy text-xs rounded-full font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-argued-brown font-bold text-lg">
                          {profile.delo_rating} DeLO
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-argued-navy font-medium">Reputation:</span>
                      <span className="ml-2 text-argued-navy font-bold">
                        ★ {profile.reputation_score}
                      </span>
                    </div>
                    <div>
                      <span className="text-argued-navy font-medium">Debates:</span>
                      <span className="ml-2 text-argued-navy font-bold">
                        {profile.total_debates}
                      </span>
                    </div>
                    <div>
                      <span className="text-argued-navy font-medium">Wins:</span>
                      <span className="ml-2 text-argued-success font-bold">
                        {profile.debates_won}
                      </span>
                    </div>
                    <div>
                      <span className="text-argued-navy font-medium">Win Rate:</span>
                      <span className="ml-2 text-argued-navy font-bold">
                        {profile.win_rate}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="bg-argued-cream rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-argued-success to-argued-brown h-2 rounded-full transition-all"
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
                <Trophy className="text-argued-navy/20" size={64} />
                <div>
                  <h3 className="text-xl font-bold text-argued-navy mb-2">
                    Be the First Philosopher!
                  </h3>
                  <p className="text-argued-navy">
                    Start debating to appear on the leaderboard
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-argued-navy/10 border border-argued-navy/20 rounded-xl">
        <p className="text-argued-navy font-medium text-sm">
          <strong>DeLO Rating System:</strong> Similar to chess Elo, your DeLO rating increases when you win debates
          and decreases when you lose. All philosophers start at 1000 DeLO. The more debates you win, the higher you climb!
        </p>
      </div>
    </div>
  );
}
