import { createClient } from '@/lib/supabase/server';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

interface LeaderboardEntry {
  id: string;
  username: string;
  influence_score: number;
  total_conversations: number;
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

  // Fetch leaderboard data - ranked by influence score
  const { data: profiles } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      influence_score,
      debates_participated
    `)
    .order('influence_score', { ascending: false })
    .limit(100);

  const leaderboard: LeaderboardEntry[] = profiles ? profiles.map(p => ({
    id: p.id,
    username: p.username,
    influence_score: p.influence_score || 0,
    total_conversations: p.debates_participated || 0,
  })) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="text-teal-600" size={32} />
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Community Leaderboard
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Top contributors ranked by influence score
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card variant="gradient">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500/10 rounded-xl">
                <Trophy className="text-teal-600" size={24} />
              </div>
              <div>
                <p className="text-slate-600 text-sm font-bold">Active Contributors</p>
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
                <p className="text-slate-600 text-sm font-bold">Highest Influence</p>
                <p className="text-2xl font-black text-teal-600">
                  {leaderboard[0]?.influence_score || 0}
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
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Influence Score</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-slate-900">Conversations</th>
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
                          <div className="flex items-center gap-2">
                            <span className="text-teal-600 font-black text-lg">
                              {profile.influence_score}
                            </span>
                            <span className="text-lg">✨</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-900 font-bold">
                          {profile.total_conversations}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Trophy className="text-slate-300" size={64} />
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-2">
                            Be the First Contributor!
                          </h3>
                          <p className="text-slate-600 font-medium">
                            Join conversations to appear on the leaderboard
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
                          <div className="flex items-center gap-2 text-teal-600 font-black text-lg">
                            <span>{profile.influence_score}</span>
                            <span>✨</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 font-medium">Conversations:</span>
                        <span className="ml-2 text-slate-900 font-bold">
                          {profile.total_conversations}
                        </span>
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
                      Be the First Contributor!
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Join conversations to appear on the leaderboard
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
            <strong className="text-slate-900">Influence Score:</strong> Your influence grows as you contribute thoughtfully to conversations. Quality insights, helpful perspectives, and meaningful engagement all increase your influence in the ARGUED community.
          </p>
        </Card>
      </div>
    </div>
  );
}
