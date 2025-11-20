/**
 * WONDER Comment Card Component
 * Displays individual comment with voting, replies, and actions
 * Used in discussion threads
 */

'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, Edit2, Trash2, User } from 'lucide-react';
import { Button } from './Button';

interface CommentCardProps {
  id: string;
  content: string;
  author: string;
  authorId: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  onUpvote: () => void;
  onDownvote: () => void;
  onReply: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  replies?: CommentCardProps[];
  currentUserId?: string;
  isReply?: boolean;
}

export function CommentCard({
  id,
  content,
  author,
  authorId,
  upvotes,
  downvotes,
  createdAt,
  hasUpvoted,
  hasDownvoted,
  onUpvote,
  onDownvote,
  onReply,
  onEdit,
  onDelete,
  replies = [],
  currentUserId,
  isReply = false,
}: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(true);

  const isOwnComment = currentUserId === authorId;
  const netVotes = upvotes - downvotes;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 text-sm">{author}</span>
              <span className="text-xs text-slate-500">{formatDate(createdAt)}</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-11">
          {/* Voting */}
          <div className="flex items-center gap-2">
            <button
              onClick={onUpvote}
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                hasUpvoted
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{upvotes}</span>
            </button>
            <button
              onClick={onDownvote}
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                hasDownvoted
                  ? 'bg-red-100 text-red-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{downvotes}</span>
            </button>
            <span className={`text-xs font-bold ${netVotes >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
              {netVotes >= 0 ? '+' : ''}{netVotes}
            </span>
          </div>

          {/* Reply Button */}
          <button
            onClick={onReply}
            className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition"
          >
            <Reply className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold">Reply</span>
          </button>

          {/* Edit/Delete for own comments */}
          {isOwnComment && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Edit</span>
            </button>
          )}
          {isOwnComment && onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {replies && replies.length > 0 && (
        <div className="mt-2">
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              {...reply}
              isReply={true}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
