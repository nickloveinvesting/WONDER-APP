import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-2xl">
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Username</p>
            <p className="text-white text-lg font-medium">{profile?.username || 'N/A'}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Display Name</p>
            <p className="text-white text-lg font-medium">{profile?.display_name || 'N/A'}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Reputation Score</p>
            <p className="text-accent-500 text-2xl font-bold">★ {profile?.reputation_score ?? 0}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-gray-400 text-sm">Debates Won</p>
              <p className="text-white text-xl font-medium">{profile?.debates_won ?? 0}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Debates Participated</p>
              <p className="text-white text-xl font-medium">{profile?.debates_participated ?? 0}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            <strong>Coming Soon:</strong> Edit profile, upload avatar, view detailed statistics, and more!
          </p>
        </div>
      </div>
    </div>
  );
}
