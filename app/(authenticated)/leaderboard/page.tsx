import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeaderboardPage() {
  const supabase = await createClient();
  
  const { data: topProfiles } = await supabase
    .from('profiles')
    .select('username, reputation_score, debates_won, debates_participated')
    .order('reputation_score', { ascending: false })
    .limit(10);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-8">Leaderboard</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Reputation</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Wins</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Debates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {topProfiles && topProfiles.length > 0 ? (
                topProfiles.map((profile, index) => (
                  <tr key={profile.username} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white font-medium">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4 text-white">{profile.username}</td>
                    <td className="px-6 py-4 text-accent-500 font-medium">★ {profile.reputation_score}</td>
                    <td className="px-6 py-4 text-white">{profile.debates_won}</td>
                    <td className="px-6 py-4 text-gray-400">{profile.debates_participated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No data yet. Start debating to appear on the leaderboard!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-yellow-500/10 border-t border-yellow-500/30">
          <p className="text-yellow-300 text-sm text-center">
            <strong>Coming Soon:</strong> DeLO rating system, win/loss ratios, debate history, and more advanced stats!
          </p>
        </div>
      </div>
    </div>
  );
}
