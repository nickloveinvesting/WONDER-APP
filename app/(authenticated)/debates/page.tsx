import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VoteButtons } from '@/components/VoteButtons';
import { Zap } from 'lucide-react';
import { Database } from '@/lib/database.types';
import { type VoteType } from '@/lib/actions/voting';
import { unstable_cache } from 'next/cache';

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
};

type DailyPrompt = Database['public']['Tables']['daily_prompts']['Row'];

type PostVote = {
  post_id: string;
  vote_type: VoteType;
};

// Cached function to fetch debates list
// Tagged so voting action can invalidate cache when votes change
const getCachedDebates = unstable_cache(
  async (quadrantFilter?: string) => {
    const supabase = await createClient();
    let query = supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false });

    if (quadrantFilter) {
      query = query.eq('quadrant', quadrantFilter);
    }

    return query.limit(50);
  },
  ['debates-list-v2'], // Updated cache key to force fresh data
  { revalidate: 30, tags: ['debates'] } // Tag for smart cache invalidation
);

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
    // Use cached function for debates list (saves 50-100ms per request)
    const { data: debatesData, error: debatesError } = await getCachedDebates(
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge type="success" size="sm">OPEN</Badge>;
      case 'in_progress':
        return <Badge variant="status" color="teal" size="sm">IN PROGRESS</Badge>;
      default:
        return <Badge variant="status" color="slate" size="sm">{status.toUpperCase()}</Badge>;
    }
  };

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
              + New Post
            </Button>
          </Link>
        </div>

        {/* TODAY'S QUESTION - CRITICAL FOR ACTIVATION */}
        {todayPrompt && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-black text-teal-600 uppercase tracking-wide">
                Today's Question
              </h2>
            </div>
            <Link href={todayPrompt.debate_id ? `/debates/${todayPrompt.debate_id}` : '/debates/create'}>
              <Card variant="gradient" className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-teal-400">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="status" color="teal" size="sm" className="mb-3">
                        {todayPrompt.category?.toUpperCase() || todayPrompt.topic}
                      </Badge>
                      <h3 className="text-3xl font-black text-slate-900 mb-3 leading-tight">
                        {todayPrompt.question}
                      </h3>
                      {todayPrompt.context && (
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                          {todayPrompt.context}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    <Button variant="primary" size="md">
                      Join the Conversation →
                    </Button>
                    <span className="text-sm text-slate-500 font-medium">
                      Fresh today • Open to everyone
                    </span>
                  </div>
                </div>
              </Card>
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
              const totalVotes = (debate.snap_count || 0) + (debate.zap_count || 0);
              const userVote: VoteType | null = userVotes[debate.id] || null;

              return (
                <Card key={debate.id} variant="standard" className="hover:shadow-2xl transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Vote Column (Reddit-style) */}
                    <div className="flex-shrink-0">
                      <VoteButtons
                        postId={debate.id}
                        initialSnapCount={debate.snap_count || 0}
                        initialZapCount={debate.zap_count || 0}
                        userVote={userVote}
                        orientation="vertical"
                        size="lg"
                      />
                    </div>

                    {/* Content */}
                    <Link href={`/debates/${debate.id}`} className="flex-1 min-w-0 group">
                      <div className="cursor-pointer py-2">
                        <div className="flex items-center gap-3 mb-3">
                          {debate.quadrant && (
                            <Badge variant="status" color="slate" size="sm">
                              {getQuadrantName(debate.quadrant)}
                            </Badge>
                          )}
                          {getStatusBadge(debate.status)}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-teal-600 transition-colors mb-3 leading-tight">
                          {debate.topic}
                        </h3>
                        {debate.description && (
                          <p className="text-lg text-slate-600 leading-relaxed font-medium mb-4 line-clamp-3">
                            {debate.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-bold">
                          <span className="flex items-center gap-2">
                            💬 <span className="text-slate-700">{debate.argument_count || 0}</span> comments
                          </span>
                          <span className="flex items-center gap-2">
                            👤 <span className="text-slate-700">{debate.participant_count || 2}</span> participants
                          </span>
                          {totalVotes > 0 && (
                            <span className="flex items-center gap-2">
                              <Zap size={14} className="text-teal-600" />
                              <span className="text-teal-700 font-black">{totalVotes}</span> {totalVotes === 1 ? 'vote' : 'votes'}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card variant="gradient" className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">🤔</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  No conversations yet
                </h3>
                <p className="text-lg text-slate-600 font-medium mb-6">
                  Every great conversation starts with a simple question. No expertise required—just curiosity!
                </p>
                <Link href="/debates/create">
                  <Button variant="primary" size="lg">
                    Start Your First Conversation
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
