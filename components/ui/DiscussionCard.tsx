/**
 * WONDER Discussion Card Component
 * Displays discussion question preview with category and comment count
 * Used in discuss listing page
 */

import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { MessageCircle } from 'lucide-react';

interface DiscussionCardProps {
  id: string;
  question: string;
  description: string;
  category: 'moral' | 'ai' | 'philosophical' | 'existential';
  commentCount: number;
  onClick: () => void;
}

export function DiscussionCard({
  id,
  question,
  description,
  category,
  commentCount,
  onClick,
}: DiscussionCardProps) {
  const getCategoryBadge = () => {
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
    <Card variant="standard" onClick={onClick} className="cursor-pointer hover:shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900 flex-1 font-sans leading-tight">
          {question}
        </h3>
      </div>

      {/* Description */}
      {description && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 font-serif">
          {description}
        </p>
      )}

      {/* Category Badge */}
      <div className="flex gap-2 mb-4">
        {getCategoryBadge()}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
        </div>
        <Button variant="primary" size="sm">
          Join Discussion
        </Button>
      </div>
    </Card>
  );
}
