import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  MessageSquare,
  Lightbulb,
  Bug,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

type FeedbackSubmission = {
  id: string;
  user_id: string;
  username: string;
  feedback_type: 'feature' | 'bug';
  title: string;
  description: string;
  status: 'pending' | 'reviewed' | 'in_progress' | 'completed' | 'dismissed';
  github_issue_url: string | null;
  github_issue_number: number | null;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export default async function AdminFeedbackPage() {
  const supabase = await createClient();

  const { data: feedback, error } = await supabase
    .from('feedback_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  const submissions = (feedback || []) as FeedbackSubmission[];

  // Group by status
  const pending = submissions.filter(f => f.status === 'pending');
  const inProgress = submissions.filter(f => f.status === 'in_progress');
  const completed = submissions.filter(f => f.status === 'completed' || f.status === 'dismissed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-teal-400" />
          User Feedback
        </h1>
        <p className="text-slate-400 mt-1">
          Feature requests and bug reports from users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Submissions"
          value={submissions.length}
          icon={MessageSquare}
          color="blue"
        />
        <StatCard
          label="Pending Review"
          value={pending.length}
          icon={Clock}
          color={pending.length > 0 ? 'yellow' : 'green'}
        />
        <StatCard
          label="Feature Requests"
          value={submissions.filter(f => f.feedback_type === 'feature').length}
          icon={Lightbulb}
          color="purple"
        />
        <StatCard
          label="Bug Reports"
          value={submissions.filter(f => f.feedback_type === 'bug').length}
          icon={Bug}
          color="red"
        />
      </div>

      {/* Pending Feedback */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Pending Review ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map(item => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            In Progress ({inProgress.length})
          </h2>
          <div className="space-y-4">
            {inProgress.map(item => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        </section>
      )}

      {/* Completed/Dismissed */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Resolved ({completed.length})
          </h2>
          <div className="space-y-4">
            {completed.map(item => (
              <FeedbackCard key={item.id} feedback={item} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {submissions.length === 0 && (
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Feedback Yet</h3>
          <p className="text-slate-400">
            User feedback submissions will appear here when users submit feature requests or bug reports.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    red: 'bg-red-500/20 text-red-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function FeedbackCard({ feedback }: { feedback: FeedbackSubmission }) {
  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    in_progress: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    dismissed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  const typeIcon = feedback.feedback_type === 'feature' ? (
    <Lightbulb className="w-4 h-4 text-purple-400" />
  ) : (
    <Bug className="w-4 h-4 text-red-400" />
  );

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            {typeIcon}
            <h3 className="text-lg font-semibold text-white">{feedback.title}</h3>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColors[feedback.status]}`}>
              {feedback.status.replace('_', ' ')}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-3 line-clamp-3">
            {feedback.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>From: <span className="text-slate-400">{feedback.username}</span></span>
            <span>{formatTimeAgo(feedback.created_at)}</span>
            {feedback.github_issue_url && (
              <a
                href={feedback.github_issue_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                GitHub #{feedback.github_issue_number}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
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
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
