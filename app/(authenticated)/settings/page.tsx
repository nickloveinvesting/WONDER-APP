import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/lib/actions';
import { SettingsForm } from '@/components/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio')
    .eq('id', user.id)
    .single();

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Settings</h1>
        <p className="text-slate-600 font-medium">Manage your account preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg">
          <h2 className="text-xl font-black text-slate-900 mb-4">Account Settings</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-slate-900 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 disabled:opacity-60 font-medium"
              />
              <p className="text-sm text-slate-500 mt-1 font-medium">Email cannot be changed</p>
            </div>
          </div>

          <SettingsForm
            initialDisplayName={profile?.display_name || null}
            initialBio={profile?.bio || null}
          />
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg">
          <h2 className="text-xl font-black text-slate-900 mb-4">Notifications</h2>
          <p className="text-slate-600 text-sm font-medium mb-4">
            Notification preferences coming soon
          </p>
          <div className="space-y-3 opacity-50">
            <label className="flex items-center gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-teal-500"
              />
              <span className="text-slate-700 font-medium">New Responses</span>
            </label>
            <label className="flex items-center gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-teal-500"
              />
              <span className="text-slate-700 font-medium">Influence Score Updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-teal-500"
              />
              <span className="text-slate-700 font-medium">Daily Discussion Prompts</span>
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg">
          <h2 className="text-xl font-black text-slate-900 mb-4">Privacy</h2>
          <p className="text-slate-600 text-sm font-medium mb-4">
            Privacy preferences coming soon
          </p>
          <div className="space-y-3 opacity-50">
            <label className="flex items-center gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-teal-500"
              />
              <span className="text-slate-700 font-medium">Show Profile on Leaderboard</span>
            </label>
            <label className="flex items-center gap-3 cursor-not-allowed">
              <input
                type="checkbox"
                disabled
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-teal-500"
              />
              <span className="text-slate-700 font-medium">Allow Comments on My Posts</span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 shadow-lg">
          <h2 className="text-xl font-black text-red-700 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <p className="text-slate-700 text-sm font-medium">Sign out of your account and return to the home page.</p>
            <form action={signOut}>
              <button
                type="submit"
                className="px-6 py-3 text-lg font-bold rounded-lg transition-all duration-200 bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
