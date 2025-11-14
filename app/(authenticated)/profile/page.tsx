import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, Trophy, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
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

  if (!profile) {
    redirect('/auth/login');
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-argued-navy mb-2">Your Profile</h1>
        <p className="text-argued-gray">Manage your philosophical identity and achievements</p>
      </div>

      {/* Profile Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="text-argued-gray text-sm mb-2">Username</div>
          <p className="text-2xl font-bold text-argued-navy">{profile.username}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-argued-brown" />
            <span className="text-argued-gray text-sm">DeLO Rating</span>
          </div>
          <p className="text-2xl font-bold text-argued-brown">{profile.delo_rating || 1000}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-argued-navy" />
            <span className="text-argued-gray text-sm">Reputation</span>
          </div>
          <p className="text-2xl font-bold text-argued-navy">{profile.reputation_score || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-argued-success" />
            <span className="text-argued-gray text-sm">Debates</span>
          </div>
          <p className="text-2xl font-bold text-argued-success">{profile.debates_participated || 0}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <h2 className="text-xl font-bold text-argued-navy mb-4">Statistics</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-argued-cream">
              <span className="text-argued-gray">Debates Participated</span>
              <span className="font-bold text-argued-navy">{profile.debates_participated || 0}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-argued-cream">
              <span className="text-argued-gray">Debates Won</span>
              <span className="font-bold text-argued-success">{profile.debates_won || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-argued-gray">Win Rate</span>
              <span className="font-bold text-argued-navy">
                {profile.debates_participated > 0
                  ? Math.round((profile.debates_won / profile.debates_participated) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <h2 className="text-xl font-bold text-argued-navy mb-4">Account Info</h2>
          <div className="space-y-3">
            <div className="pb-3 border-b border-argued-cream">
              <span className="text-argued-gray text-sm">Email</span>
              <p className="font-medium text-argued-navy">{user.email}</p>
            </div>
            <div className="pb-3 border-b border-argued-cream">
              <span className="text-argued-gray text-sm">Member Since</span>
              <p className="font-medium text-argued-navy">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-argued-gray text-sm">Account Status</span>
              <p className="font-medium text-argued-success">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
