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
            Track your contributions and growth in the Ponder community
          </p>
        </div>

        {/* Profile Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="gradient">
            <div className="text-slate-600 text-sm font-bold mb-2">Username</div>
            <p className="text-2xl font-black text-slate-900">{profile.username}</p>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-teal-600" />
              <span className="text-slate-600 text-sm font-bold">Influence Score</span>
            </div>
            <p className="text-2xl font-black text-teal-600">{profile.influence_score || 0}</p>
          </Card>

          <Card variant="gradient">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-slate-600 text-sm font-bold">Conversations</span>
            </div>
            <p className="text-2xl font-black text-green-600">{profile.debates_participated || 0}</p>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="standard">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-700 font-bold">Conversations Participated</span>
                <span className="font-black text-slate-900">{profile.debates_participated || 0}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-700 font-bold">Influence Score</span>
                <span className="font-black text-teal-600">{profile.influence_score || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-bold">Member Since</span>
                <span className="font-black text-slate-900">
                  {new Date(profile.created_at).toLocaleDateString()}
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
