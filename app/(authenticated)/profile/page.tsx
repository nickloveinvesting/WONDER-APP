import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, Trophy, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';

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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
            Your Profile
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Manage your philosophical identity and achievements
          </p>
        </div>

        {/* Profile Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="gradient">
            <div className="text-slate-600 text-sm font-bold mb-2">Username</div>
            <p className="text-2xl font-black text-slate-900">{profile.username}</p>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-teal-600" />
              <span className="text-slate-600 text-sm font-bold">DeLO Rating</span>
            </div>
            <p className="text-2xl font-black text-teal-600">{profile.delo_rating || 1000}</p>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-slate-700" />
              <span className="text-slate-600 text-sm font-bold">Reputation</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{profile.reputation_score || 0}</p>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-slate-600 text-sm font-bold">Debates</span>
            </div>
            <p className="text-2xl font-black text-green-600">{profile.debates_participated || 0}</p>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="standard">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-700 font-bold">Debates Participated</span>
                <span className="font-black text-slate-900">{profile.debates_participated || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-700 font-bold">Debates Won</span>
                <span className="font-black text-green-600">{profile.debates_won || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-bold">Win Rate</span>
                <span className="font-black text-slate-900">
                  {profile.debates_participated > 0
                    ? Math.round((profile.debates_won / profile.debates_participated) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </Card>

          <Card variant="standard">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Account Info</h2>
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-200">
                <span className="text-slate-600 text-sm font-bold">Email</span>
                <p className="font-bold text-slate-900 mt-1">{user.email}</p>
              </div>
              <div className="pb-4 border-b border-slate-200">
                <span className="text-slate-600 text-sm font-bold">Member Since</span>
                <p className="font-bold text-slate-900 mt-1">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-slate-600 text-sm font-bold">Account Status</span>
                <p className="font-bold text-green-600 mt-1">Active</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
