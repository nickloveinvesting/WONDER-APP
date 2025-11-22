import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VoteButtons } from '@/components/VoteButtons';
import { MessageCircle, Users, Clock } from 'lucide-react';
import { Database } from '@/lib/database.types';
import { type VoteType } from '@/lib/actions/voting';

// Helper function for relative time display
function getRelativeTime(dateString: string): string {
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
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Check if discussion is "active" (has activity in last 2 hours)
function isActive(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / 3600000;
  return diffHours < 2;
}

// Temporarily disable caching to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  searchParams: Promise<{ quadrant?: string }>;
};

// Extended debate type with computed fields from the database
type DebateWithCounts = Database['public']['Tables']['debates']['Row'] & {
  snap_count?: number;
  zap_count?: number;
  argument_count?: number;
  participant_count?: number;
  quadrant?: string;
  last_activity_at?: string;
};

type DailyPrompt = Database['public']['Tables']['daily_prompts']['Row'];

type PostVote = {
  post_id: string;
  vote_type: VoteType;
};

// Direct fetch function (no cache) to ensure fresh data
async function getDebates(quadrantFilter?: string) {
  const supabase = await createClient();
  let query = supabase
    .from('debates')
    .select('*')
    .order('created_at', { ascending: false });

  if (quadrantFilter) {
    query = query.eq('quadrant', quadrantFilter);
  }

  return query.limit(50);
}

export default async function DebatesPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { quadrant: quadrantFilter } = await searchParams;

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let debates: DebateWithCounts[] = [];
  let userVotes: Record<string, VoteType> = {};
  let todayPrompt: DailyPrompt | null = null;

  try {
    // Direct fetch for debates list (no cache to ensure fresh data)
    const { data: debatesData, error: debatesError } = await getDebates(
      quadrantFilter
    );

    if (debatesError) {
      // Debates fetch error - fail silently
    } else {
      debates = debatesData || [];

      // Fetch user votes for these debates
      if (user && debates.length > 0) {
        const debateIds = debates.map((d) => d.id);
        const { data: votes } = await supabase
          .from('post_votes')
          .select('post_id, vote_type')
          .eq('user_id', user.id)
          .in('post_id', debateIds);

        if (votes) {
          userVotes = votes.reduce((acc: Record<string, VoteType>, vote: PostVote) => {
            acc[vote.post_id] = vote.vote_type;
            return acc;
          }, {});
        }
      }
    }
  } catch (debatesError) {
    // Unexpected error fetching debates - fail silently
  }

  // Fetch today's prompt (CRITICAL for activation)
  try {
    const today = new Date().toISOString().split('T')[0];
    const { data: promptData, error: promptError } = await supabase
      .from('daily_prompts')
      .select('*')
      .eq('date', today)
      .single();

    if (promptError && promptError.code !== 'PGRST116') {
      // Prompt fetch error - fail silently
    } else {
      todayPrompt = promptData;
    }
  } catch (promptError) {
    // Unexpected error fetching prompt - fail silently
  }

  const getQuadrantName = (quadrant: string) => {
    const names: Record<string, string> = {
      'ai_technology': 'AI & Technology',
      'philosophy': 'Philosophy',
      'morality_ethics': 'Morality & Ethics',
      'economics_society': 'Economics & Society',
    };
    return names[quadrant] || 'All Quadrants';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight">
              {quadrantFilter ? getQuadrantName(quadrantFilter) : 'All Posts'}
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              {quadrantFilter
                ? `Explore ${getQuadrantName(quadrantFilter).toLowerCase()} discussions`
                : 'Explore ideas together with curious minds'}
            </p>
          </div>
          <Link href="/debates/create">
            <Button variant="primary" size="lg">
              Ask a question
            </Button>
          </Link>
        </div>

        {/* TODAY'S QUESTION - Enhanced with research insights */}
        {todayPrompt && (
          <div className="mb-12 mt-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-black text-teal-600 uppercase tracking-wider">
                Today's Question
              </h2>
            </div>
            <Link href={todayPrompt.debate_id ? `/debates/${todayPrompt.debate_id}` : '/debates/create'}>
              <div className="relative bg-gradient-to-br from-teal-50 via-white to-slate-50 rounded-2xl p-8 border-2 border-teal-300 hover:border-teal-400 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="status" color="teal" size="sm" className="mb-4">
                        {todayPrompt.category?.toUpperCase() || todayPrompt.topic}
                      </Badge>
                      <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight">
                        {todayPrompt.question}
                      </h3>
                      {todayPrompt.context && (
                        <p className="text-lg text-slate-600 font-medium leading-relaxed line-clamp-2">
                          {todayPrompt.context}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-teal-200">
                    <Button variant="primary" size="lg">
                      Share your take
                    </Button>
                    <span className="text-sm text-slate-500 font-medium">
                      What do you think?
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Debates List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-900">
              All Conversations
            </h2>
          </div>

          {debates && debates.length > 0 ? (
            debates.map((debate) => {
              const userVote: VoteType | null = userVotes[debate.id] || null;
              const lastActivity = debate.last_activity_at || debate.created_at || new Date().toISOString();
              const discussionActive = isActive(lastActivity);
              const commentCount = debate.argument_count || 0;
              const participantCount = debate.participant_count || 2;

              return (
                <div key={debate.id} className="group bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-5 p-5">
                    {/* Vote Column - Softer, appreciation-focused */}
                    <div className="flex-shrink-0 pt-1">
                      <VoteButtons
                        postId={debate.id}
                        initialSnapCount={debate.snap_count || 0}
                        initialZapCount={debate.zap_count || 0}
                        userVote={userVote}
                        orientation="vertical"
                        size="md"
                      />
                    </div>

                    {/* Content */}
                    <Link href={`/debates/${debate.id}`} className="flex-1 min-w-0">
                      <div className="cursor-pointer">
                        {/* Header Row with badges and activity indicator */}
                        <div className="flex items-center gap-3 mb-3">
                          {debate.quadrant && (
                            <Badge variant="status" color="slate" size="sm">
                              {getQuadrantName(debate.quadrant)}
                            </Badge>
                          )}
                          {discussionActive && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-teal-600">
                              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                              Active
                            </span>
                          )}
                        </div>

                        {/* Title - Larger, bolder */}
                        <h3 className="text-xl lg:text-2xl font-black text-slate-900 group-hover:text-teal-600 transition-colors mb-2 leading-tight">
                          {debate.topic}
                        </h3>

                        {/* Description - Truncated to 2 lines */}
                        {debate.description && (
                          <p className="text-base text-slate-600 leading-relaxed font-medium mb-4 line-clamp-2">
                            {debate.description}
                          </p>
                        )}

                        {/* Clean Stats Row */}
                        <div className="flex items-center gap-5 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Users size={14} className="text-slate-400" />
                            <span className="font-semibold text-slate-600">{participantCount}</span>
                            <span className="hidden sm:inline">discussing</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageCircle size={14} className="text-slate-400" />
                            <span className="font-semibold text-slate-600">{commentCount}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            <span>{getRelativeTime(lastActivity)}</span>
                          </span>
                        </div>

                        {/* CTA that appears on hover */}
                        <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="inline-flex items-center gap-2 text-teal-600 font-bold text-sm">
                            {commentCount === 0 ? 'Be first to share your thoughts' : 'Discuss this'} →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-gradient-to-br from-slate-50 via-white to-teal-50 rounded-2xl border border-slate-200 text-center py-16">
              <div className="max-w-md mx-auto px-6">
                <div className="text-6xl mb-6">💭</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  Start a conversation
                </h3>
                <p className="text-lg text-slate-600 font-medium mb-6">
                  What's on your mind? Share a question or idea—no expertise required, just curiosity.
                </p>
                <Link href="/debates/create">
                  <Button variant="primary" size="lg">
                    Ask a question
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
