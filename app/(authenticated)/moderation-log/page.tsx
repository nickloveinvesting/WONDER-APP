import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type ModerationAction = {
  id: string;
  content_id: string;
  content_type: string;
  action_type: string;
  reason: string;
  rule_violated: string | null;
  moderator_type: string;
  is_appealable: boolean;
  created_at: string;
  appeals?: {
    id: string;
    appeal_status: string;
    appeal_reason: string;
    created_at: string;
  }[];
};

type CommunityGuideline = {
  rule_key: string;
  rule_text: string;
  examples: string[];
};

export default async function ModerationLogPage() {
  const supabase = await createClient();

  // Fetch moderation actions (public ones only via RLS)
  const { data: actions } = await supabase
    .from('moderation_actions')
    .select(`
      *,
      appeals:moderation_appeals(id, appeal_status, appeal_reason, created_at)
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  // Fetch community guidelines
  const { data: guidelines } = await supabase
    .from('community_guidelines')
    .select('rule_key, rule_text, examples')
    .order('rule_key');

  const getActionBadge = (actionType: string) => {
    switch (actionType) {
      case 'remove':
        return <Badge variant="status" color="red" size="sm">REMOVED</Badge>;
      case 'flag':
        return <Badge variant="status" color="amber" size="sm">FLAGGED</Badge>;
      case 'hide':
        return <Badge variant="status" color="slate" size="sm">HIDDEN</Badge>;
      case 'cleared':
        return <Badge variant="status" color="green" size="sm">CLEARED</Badge>;
      case 'overturned_by_appeal':
        return <Badge variant="status" color="teal" size="sm">OVERTURNED</Badge>;
      default:
        return <Badge variant="status" color="slate" size="sm">{actionType.toUpperCase()}</Badge>;
    }
  };

  const getModeratorLabel = (type: string) => {
    switch (type) {
      case 'ai':
        return 'AI Triage';
      case 'human':
        return 'Community Moderator';
      case 'system':
        return 'System';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Moderation Log
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Full transparency on all moderation decisions. Every action is logged and appealable.
          </p>
        </div>

        {/* Community Guidelines */}
        <Card variant="gradient" className="mb-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Community Guidelines</h2>
          <p className="text-slate-600 mb-6 font-medium">
            Our moderation focuses on <strong>how</strong> you engage, not <strong>what</strong> you believe.
            All viewpoints are welcome when expressed respectfully.
          </p>

          <div className="grid gap-4">
            {guidelines && guidelines.length > 0 ? (
              guidelines.map((guideline: CommunityGuideline) => (
                <div key={guideline.rule_key} className="bg-white rounded-lg p-4 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">
                    {guideline.rule_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-slate-600 mb-2">{guideline.rule_text}</p>
                  {guideline.examples && guideline.examples.length > 0 && (
                    <div className="text-sm text-slate-500">
                      <strong>Examples:</strong> {guideline.examples.join(', ')}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-500">Guidelines being finalized...</p>
            )}
          </div>
        </Card>

        {/* Moderation Actions Log */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Recent Actions</h2>
          <p className="text-slate-600 font-medium">
            All moderation decisions are public. Users can appeal within 30 days.
          </p>
        </div>

        <div className="space-y-4">
          {actions && actions.length > 0 ? (
            actions.map((action: ModerationAction) => (
              <Card key={action.id} variant="standard" className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getActionBadge(action.action_type)}
                      <span className="text-sm text-slate-500 font-medium">
                        {action.content_type.charAt(0).toUpperCase() + action.content_type.slice(1)}
                      </span>
                    </div>

                    <p className="text-slate-900 font-medium mb-2">{action.reason}</p>

                    {action.rule_violated && (
                      <p className="text-sm text-slate-500">
                        <strong>Rule:</strong> {action.rule_violated.replace(/_/g, ' ')}
                      </p>
                    )}

                    {action.appeals && action.appeals.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-sm font-semibold text-amber-700 mb-1">
                          Appeal: {action.appeals[0].appeal_status.toUpperCase()}
                        </p>
                        <p className="text-sm text-slate-600">
                          {action.appeals[0].appeal_reason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500 mb-1">
                      {new Date(action.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-xs font-medium text-slate-600">
                      {getModeratorLabel(action.moderator_type)}
                    </p>
                    {action.is_appealable && action.action_type !== 'cleared' && action.action_type !== 'overturned_by_appeal' && (
                      <p className="text-xs text-teal-600 mt-1 font-medium">
                        Appealable
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card variant="gradient" className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">No moderation actions</h3>
              <p className="text-slate-600 font-medium">
                Our community has been engaging respectfully. Keep up the great discourse!
              </p>
            </Card>
          )}
        </div>

        {/* Appeals Info */}
        <Card variant="standard" className="mt-10">
          <h3 className="text-xl font-black text-slate-900 mb-3">How Appeals Work</h3>
          <div className="space-y-3 text-slate-600 font-medium">
            <p>
              <strong>1. Submit within 30 days:</strong> If your content was removed, you can appeal the decision.
            </p>
            <p>
              <strong>2. Community review:</strong> Appeals are reviewed by an elected appeals board, not the original moderator.
            </p>
            <p>
              <strong>3. Transparent outcome:</strong> All appeal decisions are logged here with reasoning.
            </p>
            <p>
              <strong>4. Final decision:</strong> Appeals board decisions are final but documented for accountability.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
