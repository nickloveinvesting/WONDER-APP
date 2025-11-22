import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail, logAdminAction } from '@/lib/admin/utils';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Shield,
  BarChart3,
  Settings,
  Megaphone,
  LogOut,
  ChevronRight,
  MessageSquare,
  Home,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/feedback', label: 'User Feedback', icon: MessageSquare },
  { href: '/admin/moderation', label: 'Moderation', icon: Shield },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/controls', label: 'Controls', icon: Settings },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Only allow specific admin email
  if (!user?.email || !isAdminEmail(user.email)) {
    redirect('/');
  }

  // Log admin dashboard access
  await logAdminAction(user.email, 'dashboard_access');

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-teal-400" />
            WONDER Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">God Mode</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-teal-400" />
                  {item.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin Info */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Nick</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <Link
            href="/home"
            className="flex items-center gap-2 px-4 py-2.5 mt-2 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
