import { getAnalyticsData } from '@/lib/admin/utils';
import { BarChart3, TrendingUp, Users, MessageSquare, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ days?: string }>;
}

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const days = parseInt(params.days || '7');

  const analytics = await getAnalyticsData(days);

  // Calculate totals
  const totalSignups = analytics.dailySignups.reduce((sum, d) => sum + d.count, 0);
  const totalDebates = analytics.dailyDebates.reduce((sum, d) => sum + d.count, 0);
  const totalComments = analytics.dailyComments.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-teal-400" />
            Analytics
          </h1>
          <p className="text-slate-400 mt-1">Platform performance and insights</p>
        </div>
        <select
          defaultValue={days}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="New Signups"
          value={totalSignups}
          icon={Users}
          color="blue"
          subtitle={`Last ${days} days`}
        />
        <SummaryCard
          title="New Debates"
          value={totalDebates}
          icon={MessageSquare}
          color="green"
          subtitle={`Last ${days} days`}
        />
        <SummaryCard
          title="Comments"
          value={totalComments}
          icon={TrendingUp}
          color="purple"
          subtitle={`Last ${days} days`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signups Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            User Signups
          </h3>
          <div className="h-48">
            <BarChart data={analytics.dailySignups} color="blue" />
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            Activity (Debates & Comments)
          </h3>
          <div className="h-48">
            <BarChart data={analytics.dailyComments} color="green" />
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Top Contributors
        </h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">User</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Influence</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Messages</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Debates</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topContributors.map((user, index) => (
              <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3">
                  <span className={`font-bold ${index < 3 ? 'text-yellow-400' : 'text-slate-400'}`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">
                      {user.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span className="text-white">{user.username || 'Anonymous'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-teal-400 font-medium">
                  {user.influence_score || 0}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {user.total_messages || 0}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {user.debates_participated || 0}
                </td>
              </tr>
            ))}
            {analytics.topContributors.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No contributors yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple';
  subtitle: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function BarChart({
  data,
  color,
}: {
  data: { date: string; count: number }[];
  color: 'blue' | 'green';
}) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
  };

  return (
    <div className="flex items-end justify-between h-full gap-1">
      {data.map((item) => (
        <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
          <div
            className={`w-full rounded-t ${colorClasses[color]} transition-all`}
            style={{ height: `${(item.count / maxCount) * 100}%`, minHeight: item.count > 0 ? '4px' : '0' }}
          />
          <span className="text-xs text-slate-500 transform -rotate-45 origin-left whitespace-nowrap">
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      ))}
    </div>
  );
}
