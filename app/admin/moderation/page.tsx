import { getContentReports } from '@/lib/admin/utils';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminModerationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status || 'pending';
  const page = parseInt(params.page || '1');

  const { reports, total } = await getContentReports(status, page, 20);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-400" />
            Moderation Queue
          </h1>
          <p className="text-slate-400 mt-1">
            {total} {status} reports
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatusCard
          label="Pending"
          count={status === 'pending' ? total : 0}
          icon={Clock}
          active={status === 'pending'}
          href="/admin/moderation?status=pending"
          color="yellow"
        />
        <StatusCard
          label="Resolved"
          count={status === 'resolved' ? total : 0}
          icon={CheckCircle}
          active={status === 'resolved'}
          href="/admin/moderation?status=resolved"
          color="green"
        />
        <StatusCard
          label="Dismissed"
          count={status === 'dismissed' ? total : 0}
          icon={XCircle}
          active={status === 'dismissed'}
          href="/admin/moderation?status=dismissed"
          color="slate"
        />
        <StatusCard
          label="Escalated"
          count={status === 'escalated' ? total : 0}
          icon={AlertTriangle}
          active={status === 'escalated'}
          href="/admin/moderation?status=escalated"
          color="red"
        />
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
        <Filter className="w-5 h-5 text-slate-400" />
        <select
          defaultValue={status}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
          <option value="escalated">Escalated</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
        ) : (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
            <p className="text-slate-400">No {status} reports at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({
  label,
  count,
  icon: Icon,
  active,
  href,
  color,
}: {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  href: string;
  color: 'yellow' | 'green' | 'slate' | 'red';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <Link
      href={href}
      className={`p-4 rounded-xl border transition-all ${
        active
          ? `${colorClasses[color]} border-2`
          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${active ? '' : 'text-slate-400'}`} />
        <div>
          <p className={`font-semibold ${active ? '' : 'text-white'}`}>{label}</p>
          <p className={`text-2xl font-bold ${active ? '' : 'text-white'}`}>{count}</p>
        </div>
      </div>
    </Link>
  );
}

function ReportCard({ report }: { report: Record<string, unknown> }) {
  const reasonColors: Record<string, string> = {
    spam: 'bg-yellow-500/20 text-yellow-400',
    harassment: 'bg-red-500/20 text-red-400',
    misinformation: 'bg-orange-500/20 text-orange-400',
    inappropriate: 'bg-purple-500/20 text-purple-400',
    other: 'bg-slate-500/20 text-slate-400',
  };

  const reason = report.reason as string;
  const colorClass = reasonColors[reason.toLowerCase()] || reasonColors.other;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
            {reason}
          </span>
          <span className="text-slate-400 text-sm">
            {report.content_type as string} #{(report.content_id as string)?.slice(0, 8)}
          </span>
        </div>
        <span className="text-slate-500 text-sm">
          {new Date(report.created_at as string).toLocaleDateString()}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-slate-300">{report.details as string || 'No additional details provided.'}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <p className="text-sm text-slate-500">
          Reported by: {(report.reporter as { username?: string })?.username || 'Anonymous'}
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
            Dismiss
          </button>
          <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
            Remove Content
          </button>
          <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors">
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
}
