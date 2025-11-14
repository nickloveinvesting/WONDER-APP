import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { signOut } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-argued-navy mb-2">Settings</h1>
        <p className="text-argued-gray">Manage your account preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <h2 className="text-xl font-bold text-argued-navy mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-argued-gray text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-2 bg-argued-cream/50 border border-argued-cream rounded-lg text-argued-navy disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <h2 className="text-xl font-bold text-argued-navy mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-argued-cream"
              />
              <span className="text-argued-navy">Debate Responses</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-argued-cream"
              />
              <span className="text-argued-navy">Rating Changes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-argued-cream"
              />
              <span className="text-argued-navy">Achievements Unlocked</span>
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl p-6 border border-argued-cream shadow-sm">
          <h2 className="text-xl font-bold text-argued-navy mb-4">Privacy</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-argued-cream"
              />
              <span className="text-argued-navy">Show Profile on Leaderboard</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-argued-cream"
              />
              <span className="text-argued-navy">Allow Comments on My Arguments</span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-argued-error/10 rounded-xl p-6 border border-argued-error/20 shadow-sm">
          <h2 className="text-xl font-bold text-argued-error mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <p className="text-argued-gray text-sm">Sign out of your account and return to the home page.</p>
            <form action={signOut}>
              <Button variant="error" size="lg">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
