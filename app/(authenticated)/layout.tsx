import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { signOut } from '@/app/auth/actions';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect('/auth/login');
  }

  // Fetch user profile for header
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, reputation_score')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <nav className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="px-4 lg:px-8 py-4 flex justify-between items-center">
            <div className="lg:hidden" />
            <h1 className="text-xl font-bold text-white lg:block hidden">PhiloDuel</h1>
            
            <div className="flex items-center gap-6 ml-auto">
              <div className="text-white">
                <span className="text-gray-400">Welcome,</span>{' '}
                <span className="font-medium">{profile?.username || 'Philosopher'}</span>
                <span className="ml-2 text-accent-500">★ {profile?.reputation_score ?? 0}</span>
              </div>
              <form action={signOut}>
                <button className="px-4 py-2 text-gray-300 hover:text-white transition">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
