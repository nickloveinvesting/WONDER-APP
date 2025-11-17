import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CommentSection } from './CommentSection';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DiscussionPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch discussion
  const { data: discussion, error: discussionError } = await supabase
    .from('discussions')
    .select('*')
    .eq('id', id)
    .single();

  if (discussionError || !discussion) {
    redirect('/discuss');
  }

  // Fetch comments with user info
  const { data: comments } = await supabase
    .from('discussion_comments')
    .select(`
      *,
      profiles (username)
    `)
    .eq('discussion_id', id)
    .order('created_at', { ascending: false });

  const getCategoryBadge = (category: string) => {
    const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
      moral: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      ai: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      philosophical: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      existential: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    };

    const colors = categoryColors[category] || categoryColors.philosophical;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${colors.bg} ${colors.text} border ${colors.border}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-4xl">
      {/* Back Button */}
      <Link
        href="/discuss"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-semibold">Back to Discussions</span>
      </Link>

      {/* Discussion Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
        <div className="flex items-start gap-4 mb-4">
          {getCategoryBadge(discussion.category)}
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
          {discussion.question}
        </h1>

        {discussion.description && (
          <p className="text-slate-700 text-lg leading-relaxed mb-6 font-serif">
            {discussion.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-slate-600 text-sm pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>
              {discussion.comment_count || 0}{' '}
              {discussion.comment_count === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection
        discussionId={id}
        initialComments={comments || []}
        currentUserId={user.id}
      />
    </div>
  );
}
