import { createClient } from '@/lib/supabase/server';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, email')
    .eq('id', user!.id)
    .maybeSingle();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="max-w-2xl bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Username</label>
                <p className="text-white font-medium">{profile?.username || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <p className="text-white font-medium">{user?.email || 'Not set'}</p>
              </div>
            </div>
          </div>

          <hr className="border-white/20" />

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
            <p className="text-gray-400">Additional settings coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
