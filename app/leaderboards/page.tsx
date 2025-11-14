'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getRatingTier, DebateCategory } from '@/lib/delo-rating';

interface LeaderboardEntry {
  id: string;
  username: string;
  display_name: string;
  delo_rating: number;
  peak_rating: number;
  win_loss_record: any;
  delo_categories: any;
}

const CATEGORIES: DebateCategory[] = [
  'ethics',
  'logic',
  'metaphysics',
  'epistemology',
  'political_philosophy',
  'aesthetics'
];

export default function LeaderboardsPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [categoryLeaderboards, setCategoryLeaderboards] = useState<Record<string, LeaderboardEntry[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<DebateCategory | 'overall'>('overall');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const supabase = await createClient();

      // Fetch overall leaderboard
      const { data: overallData } = await supabase
        .from('profiles')
        .select('*')
        .order('delo_rating', { ascending: false })
        .limit(50);

      if (overallData) {
        setLeaderboard(overallData);
      }

      // Fetch category leaderboards
      const categoryBoards: Record<string, LeaderboardEntry[]> = {};
      for (const category of CATEGORIES) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .order(`delo_categories->${category}`, { ascending: false })
          .limit(50);

        if (data) {
          categoryBoards[category] = data;
        }
      }
      setCategoryLeaderboards(categoryBoards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
      setLoading(false);
    }
  };

  const currentLeaderboard = selectedCategory === 'overall' ? leaderboard : (categoryLeaderboards[selectedCategory] || []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white text-xl">Loading leaderboards...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/debates" className="text-2xl font-bold text-white">
              PhiloDuel
            </Link>
            <Link
              href="/debates"
              className="px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Back to Debates
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-2">🏆 Leaderboards</h1>
        <p className="text-gray-300 mb-8">Climb the ranks and prove your philosophical mastery</p>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('overall')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === 'overall'
                ? 'bg-accent-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            🌍 Overall
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                selectedCategory === category
                  ? 'bg-accent-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category === 'ethics' && '⚖️'}
              {category === 'logic' && '🧠'}
              {category === 'metaphysics' && '🌌'}
              {category === 'epistemology' && '📚'}
              {category === 'political_philosophy' && '🏛️'}
              {category === 'aesthetics' && '🎨'}
              {' '}
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Peak</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">W-L-D</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {currentLeaderboard.length > 0 ? (
                  currentLeaderboard.map((player, index) => {
                    const rating = selectedCategory === 'overall'
                      ? player.delo_rating
                      : (player.delo_categories?.[selectedCategory] || 800);
                    const tier = getRatingTier(rating);
                    const record = player.win_loss_record || { total_wins: 0, total_losses: 0, total_draws: 0, win_rate: 0.5 };

                    return (
                      <tr
                        key={player.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="px-6 py-4 text-white font-semibold">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/profile/${player.id}`}
                            className="text-white hover:text-accent-400 transition"
                          >
                            {player.display_name || player.username}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-accent-400 font-bold">{rating}</td>
                        <td className="px-6 py-4 text-gray-400">{player.peak_rating}</td>
                        <td className="px-6 py-4 text-white">
                          <span className="text-lg">{tier.emoji}</span> {tier.title}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {record.total_wins}W-{record.total_losses}L-{record.total_draws}D
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {(record.win_rate * 100).toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No players on this leaderboard yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Total Players</div>
            <div className="text-3xl font-bold text-white">{currentLeaderboard.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Average Rating</div>
            <div className="text-3xl font-bold text-accent-400">
              {Math.round(
                currentLeaderboard.reduce((sum, p) => {
                  const rating = selectedCategory === 'overall'
                    ? p.delo_rating
                    : (p.delo_categories?.[selectedCategory] || 800);
                  return sum + rating;
                }, 0) / (currentLeaderboard.length || 1)
              )}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-gray-400 text-sm mb-2">Top Rating</div>
            <div className="text-3xl font-bold text-accent-500">
              {currentLeaderboard[0]
                ? selectedCategory === 'overall'
                  ? currentLeaderboard[0].delo_rating
                  : currentLeaderboard[0].delo_categories?.[selectedCategory] || 800
                : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
