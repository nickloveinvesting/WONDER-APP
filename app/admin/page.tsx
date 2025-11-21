import { getDashboardStats, getAdminLogs } from '@/lib/admin/utils';
import {
  Users,
  MessageSquare,
  Swords,
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const { logs } = await getAdminLogs(1, 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Command Center</h1>
        <p className="text-slate-400 mt-1">
          Welcome back, Nick. Here&apos;s what&apos;s happening on WONDER.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={`+${stats.newUsers24h} today`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Debates"
          value={stats.activeDebates}
          subtitle="Open & in progress"
          icon={Swords}
          color="green"
        />
        <StatCard
          title="Discussions"
          value={stats.totalDiscussions}
          subtitle={`${stats.totalComments} comments`}
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          subtitle="Needs review"
          icon={AlertTriangle}
          color={stats.pendingReports > 0 ? 'red' : 'green'}
          href="/admin/moderation"
        />
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              href="/admin/users"
              label="Manage Users"
              icon={Users}
            />
            <QuickAction
              href="/admin/moderation"
              label="Review Reports"
              icon={AlertTriangle}
              badge={stats.pendingReports > 0 ? stats.pendingReports : undefined}
            />
            <QuickAction
              href="/admin/announcements"
              label="Send Announcement"
              icon={MessageSquare}
            />
            <QuickAction
              href="/admin/controls"
              label="Platform Settings"
              icon={TrendingUp}
            />
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-400" />
            Recent Users
          </h2>
          <div className="space-y-3">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-slate-300">{user.username || 'Anonymous'}</span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {formatTimeAgo(user.created_at)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">No recent users</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Admin Activity */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          Recent Admin Activity
        </h2>
        <div className="space-y-2">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between py-2 px-3 bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-teal-500/20 text-teal-400 rounded">
                    {log.action}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {log.target_type && `${log.target_type}: ${log.target_id?.slice(0, 8)}...`}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {formatTimeAgo(log.created_at)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Components
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  href,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'red';
  href?: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const content = (
    <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 ${href ? 'hover:border-slate-600 transition-colors cursor-pointer' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function QuickAction({
  href,
  label,
  icon: Icon,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group relative"
    >
      <Icon className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
      <span className="text-slate-300 group-hover:text-white transition-colors">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
