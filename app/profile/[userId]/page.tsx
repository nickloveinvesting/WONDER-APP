'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getRatingTier, RATING_TIERS, DebateCategory } from '@/lib/delo-rating';

interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  delo_rating: number;
  delo_rating_provisional: boolean;
  peak_rating: number;
  rating_volatility: number;
  delo_categories: Record<DebateCategory, number>;
  win_loss_record: {
    total_wins: number;
    total_losses: number;
    total_draws: number;
    win_rate: number;
    recent_results: Array<{
      outcome: 'win' | 'loss' | 'draw';
      category: string;
      timestamp: string;
    }>;
    by_category: Record<string, { wins: number; losses: number; draws: number }>;
    streak: {
      current: number;
      direction: 'win' | 'loss' | 'neutral';
      longest: number;
    };
  };
  total_upvotes: number;
  avg_upvote_ratio: number;
  created_at: string;
}

const CATEGORIES: DebateCategory[] = [
  'ethics',
  'logic',
  'metaphysics',
  'epistemology',
  'political_philosophy',
  'aesthetics'
];

const CATEGORY_LABELS: Record<DebateCategory, { emoji: string; name: string }> = {
  ethics: { emoji: '⚖️', name: 'Ethics' },
  logic: { emoji: '🧠', name: 'Logic' },
  metaphysics: { emoji: '🌌', name: 'Metaphysics' },
  epistemology: { emoji: '📚', name: 'Epistemology' },
  political_philosophy: { emoji: '🏛️', name: 'Political Philosophy' },
  aesthetics: { emoji: '🎨', name: 'Aesthetics' }
};

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const supabase = await createClient();
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (err) throw err;
      setProfile(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Profile not found');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <Link href="/debates" className="text-accent-400 hover:text-accent-300">
              ← Back to Debates
            </Link>
          </nav>
          <div className="text-center">
            <div className="text-4xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-white mb-2">Profile Not Found</h1>
            <p className="text-gray-400">{error || 'This philosopher does not exist'}</p>
          </div>
        </div>
      </div>
    );
  }

  const tier = getRatingTier(profile.delo_rating);
  const record = profile.win_loss_record || {
    total_wins: 0,
    total_losses: 0,
    total_draws: 0,
    win_rate: 0.5,
    recent_results: [],
    by_category: {},
    streak: { current: 0, direction: 'neutral', longest: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/debates" className="text-2xl font-bold text-white">
              PhiloDuel
            </Link>
            <div className="flex gap-4">
              <Link
                href="/leaderboards"
                className="px-4 py-2 text-gray-300 hover:text-white transition"
              >
                Leaderboards
              </Link>
              <Link
                href="/debates"
                className="px-4 py-2 text-gray-300 hover:text-white transition"
              >
                Debates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {profile.display_name || profile.username}
              </h1>
              <p className="text-gray-400">@{profile.username}</p>
              {profile.bio && <p className="text-gray-300 mt-2">{profile.bio}</p>}
            </div>
            <div className="text-right">
              <div className="text-6xl mb-2">{tier.emoji}</div>
              <div className="text-sm text-gray-400">{tier.title}</div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">DeLO Rating</div>
              <div className="text-3xl font-bold text-accent-400">{profile.delo_rating}</div>
              {profile.delo_rating_provisional && (
                <div className="text-xs text-yellow-400 mt-2">Provisional (P)</div>
              )}
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Peak Rating</div>
              <div className="text-3xl font-bold text-primary-400">{profile.peak_rating}</div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Win Rate</div>
              <div className="text-3xl font-bold text-green-400">
                {(record.win_rate * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Record</div>
              <div className="text-lg font-bold text-white">
                {record.total_wins}W-{record.total_losses}L-{record.total_draws}D
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">
                {record.streak.direction === 'win' && '🔥'} Streak
              </div>
              <div className="text-3xl font-bold text-white">{record.streak.current}</div>
              <div className="text-xs text-gray-400 mt-1">
                Best: {record.streak.longest}
              </div>
            </div>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Category Breakdown */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Expertise by Category</h2>
            <div className="space-y-4">
              {CATEGORIES.map((category) => {
                const categoryRating = profile.delo_categories?.[category] || 800;
                const categoryRecord = record.by_category?.[category] || {
                  wins: 0,
                  losses: 0,
                  draws: 0
                };
                const categoryTier = getRatingTier(categoryRating);
                const categoryWinRate =
                  categoryRecord.wins + categoryRecord.losses + categoryRecord.draws > 0
                    ? categoryRecord.wins / (categoryRecord.wins + categoryRecord.losses + categoryRecord.draws)
                    : 0.5;

                return (
                  <div key={category} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{CATEGORY_LABELS[category].emoji}</span>
                        <div>
                          <div className="font-semibold text-white">
                            {CATEGORY_LABELS[category].name}
                          </div>
                          <div className="text-sm text-gray-400">{categoryTier.title}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent-400">{categoryRating}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-300">
                      <span>
                        {categoryRecord.wins}W-{categoryRecord.losses}L-{categoryRecord.draws}D
                      </span>
                      <span>({(categoryWinRate * 100).toFixed(1)}% WR)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Quality Metrics</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Average Upvote Ratio</span>
                  <span className="text-accent-400 font-bold">
                    {(profile.avg_upvote_ratio * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all"
                    style={{ width: `${profile.avg_upvote_ratio * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Total Upvotes Received</span>
                  <span className="text-primary-400 font-bold">{profile.total_upvotes}</span>
                </div>
                <p className="text-sm text-gray-400">
                  Community karma from high-quality arguments
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="text-sm text-gray-400 mb-4">Member since</div>
                <div className="text-white">
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Results */}
        {record.recent_results && record.recent_results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Debates</h2>
            <div className="space-y-3">
              {record.recent_results.slice(0, 10).map((result, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                  <span className="text-2xl">
                    {result.outcome === 'win' && '✅'}
                    {result.outcome === 'loss' && '❌'}
                    {result.outcome === 'draw' && '⚖️'}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-white capitalize">
                      {result.outcome === 'win' && 'Victory'}
                      {result.outcome === 'loss' && 'Defeat'}
                      {result.outcome === 'draw' && 'Draw'}
                    </div>
                    <div className="text-sm text-gray-400">{CATEGORY_LABELS[result.category as DebateCategory]?.name}</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
