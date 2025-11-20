/**
 * WONDER Comment Section Component
 * Manages comment display, sorting, voting, and interactions
 */

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CommentCard } from '@/components/ui/CommentCard';
import { CommentForm } from './CommentForm';
import { Button } from '@/components/ui/Button';
import { ArrowUpDown } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  user_id: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  parent_comment_id: string | null;
  profiles: {
    username: string;
  };
}

interface CommentVote {
  comment_id: string;
  vote_type: 'upvote' | 'downvote';
}

interface CommentTreeNode {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  onUpvote: () => Promise<void>;
  onDownvote: () => Promise<void>;
  onReply: () => void;
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
  replies: CommentTreeNode[];
}

interface CommentSectionProps {
  discussionId: string;
  initialComments: Comment[];
  currentUserId: string;
}

export function CommentSection({
  discussionId,
  initialComments,
  currentUserId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'upvote' | 'downvote'>>({});
  const supabase = createClient();

  // Load user's votes
  useEffect(() => {
    loadUserVotes();
  }, [discussionId]);

  const loadUserVotes = async () => {
    const { data: votes } = await supabase
      .from('comment_votes')
      .select('comment_id, vote_type')
      .eq('user_id', currentUserId);

    if (votes) {
      const votesMap: Record<string, 'upvote' | 'downvote'> = {};
      votes.forEach((vote: CommentVote) => {
        votesMap[vote.comment_id] = vote.vote_type;
      });
      setUserVotes(votesMap);
    }
  };

  const refreshComments = async () => {
    const { data } = await supabase
      .from('discussion_comments')
      .select(`
        *,
        profiles (username)
      `)
      .eq('discussion_id', discussionId)
      .order('created_at', { ascending: false });

    if (data) {
      setComments(data);
    }
  };

  const handleAddComment = async (content: string, parentCommentId?: string) => {
    const { error } = await supabase
      .from('discussion_comments')
      .insert({
        discussion_id: discussionId,
        user_id: currentUserId,
        content,
        parent_comment_id: parentCommentId || null,
      });

    if (!error) {
      await refreshComments();
      setReplyingTo(null);

      // Update comment count
      await supabase.rpc('increment_discussion_comment_count', {
        discussion_id: discussionId,
      });
    }
  };

  const handleVote = async (commentId: string, voteType: 'upvote' | 'downvote') => {
    const currentVote = userVotes[commentId];

    // Remove vote if clicking the same vote type
    if (currentVote === voteType) {
      await supabase
        .from('comment_votes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', currentUserId);

      // Update vote count
      const field = voteType === 'upvote' ? 'upvotes' : 'downvotes';
      const comment = comments.find((c) => c.id === commentId);
      if (comment) {
        await supabase
          .from('discussion_comments')
          .update({ [field]: Math.max(0, comment[field] - 1) })
          .eq('id', commentId);
      }

      const newVotes = { ...userVotes };
      delete newVotes[commentId];
      setUserVotes(newVotes);
    } else {
      // Add or change vote
      await supabase
        .from('comment_votes')
        .upsert({
          comment_id: commentId,
          user_id: currentUserId,
          vote_type: voteType,
        });

      // Update vote counts
      const comment = comments.find((c) => c.id === commentId);
      if (comment) {
        const updates: Partial<{ upvotes: number; downvotes: number }> = {};

        if (currentVote) {
          // Change vote type
          const oldField = currentVote === 'upvote' ? 'upvotes' : 'downvotes';
          const newField = voteType === 'upvote' ? 'upvotes' : 'downvotes';
          updates[oldField] = Math.max(0, comment[oldField] - 1);
          updates[newField] = comment[newField] + 1;
        } else {
          // New vote
          const field = voteType === 'upvote' ? 'upvotes' : 'downvotes';
          updates[field] = comment[field] + 1;
        }

        await supabase
          .from('discussion_comments')
          .update(updates)
          .eq('id', commentId);
      }

      setUserVotes({ ...userVotes, [commentId]: voteType });
    }

    await refreshComments();
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    const { error } = await supabase
      .from('discussion_comments')
      .update({ content: newContent, updated_at: new Date().toISOString() })
      .eq('id', commentId)
      .eq('user_id', currentUserId);

    if (!error) {
      await refreshComments();
      setEditingComment(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      const { error } = await supabase
        .from('discussion_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUserId);

      if (!error) {
        await refreshComments();

        // Update comment count
        await supabase.rpc('decrement_discussion_comment_count', {
          discussion_id: discussionId,
        });
      }
    }
  };

  // Build comment tree
  const buildCommentTree = (parentId: string | null = null): CommentTreeNode[] => {
    return comments
      .filter((comment) => comment.parent_comment_id === parentId)
      .map((comment) => ({
        id: comment.id,
        content: comment.content,
        author: comment.profiles?.username || 'Unknown',
        authorId: comment.user_id,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        createdAt: comment.created_at,
        hasUpvoted: userVotes[comment.id] === 'upvote',
        hasDownvoted: userVotes[comment.id] === 'downvote',
        onUpvote: () => handleVote(comment.id, 'upvote'),
        onDownvote: () => handleVote(comment.id, 'downvote'),
        onReply: () => setReplyingTo(comment.id),
        onEdit: comment.user_id === currentUserId ? () => setEditingComment(comment.id) : undefined,
        onDelete: comment.user_id === currentUserId ? () => handleDeleteComment(comment.id) : undefined,
        replies: buildCommentTree(comment.id),
      }));
  };

  const sortedTopLevelComments = () => {
    const topLevel = buildCommentTree();

    if (sortBy === 'top') {
      return topLevel.sort((a, b) => {
        const scoreA = a.upvotes - a.downvotes;
        const scoreB = b.upvotes - b.downvotes;
        return scoreB - scoreA;
      });
    }

    return topLevel;
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Add Your Thoughts</h3>
        <CommentForm onSubmit={(content) => handleAddComment(content)} />
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'recent' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Recent
          </Button>
          <Button
            variant={sortBy === 'top' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('top')}
          >
            Top
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedTopLevelComments().map((comment) => (
          <div key={comment.id}>
            {editingComment === comment.id ? (
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <CommentForm
                  onSubmit={(content) => handleEditComment(comment.id, content)}
                  onCancel={() => setEditingComment(null)}
                  initialValue={comment.content}
                  submitLabel="Save Changes"
                />
              </div>
            ) : (
              <CommentCard {...comment} currentUserId={currentUserId} />
            )}

            {replyingTo === comment.id && (
              <div className="ml-8 mt-4 bg-slate-50 rounded-lg border border-slate-200 p-4">
                <CommentForm
                  onSubmit={(content) => handleAddComment(content, comment.id)}
                  onCancel={() => setReplyingTo(null)}
                  placeholder="Write a reply..."
                  submitLabel="Post Reply"
                />
              </div>
            )}
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-600">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
