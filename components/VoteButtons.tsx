'use client';

import { memo, useState, useTransition } from 'react';
import { Zap } from 'lucide-react';
import { voteOnPost, type VoteType } from '@/lib/actions/voting';

type VoteButtonsProps = {
  postId: string;
  initialSnapCount: number;
  initialZapCount: number;
  userVote: VoteType | null;
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Snap/Zap voting buttons for posts
 * Memoized to prevent re-renders when parent updates but props unchanged
 * Handles optimistic updates and server actions
 */
function VoteButtonsComponent({
  postId,
  initialSnapCount,
  initialZapCount,
  userVote,
  orientation = 'vertical',
  size = 'md',
}: VoteButtonsProps) {
  const [snapCount, setSnapCount] = useState(initialSnapCount);
  const [zapCount, setZapCount] = useState(initialZapCount);
  const [currentVote, setCurrentVote] = useState<VoteType | null>(userVote);
  const [isPending, startTransition] = useTransition();

  const netScore = snapCount - zapCount;

  const handleVote = (voteType: VoteType) => {
    // Optimistic update
    let newSnapCount = snapCount;
    let newZapCount = zapCount;
    let newVote: VoteType | null = voteType;

    if (currentVote === voteType) {
      // Removing vote
      if (voteType === 'snap') {
        newSnapCount--;
      } else {
        newZapCount--;
      }
      newVote = null;
    } else if (currentVote) {
      // Changing vote
      if (currentVote === 'snap') {
        newSnapCount--;
        newZapCount++;
      } else {
        newZapCount--;
        newSnapCount++;
      }
    } else {
      // New vote
      if (voteType === 'snap') {
        newSnapCount++;
      } else {
        newZapCount++;
      }
    }

    setSnapCount(newSnapCount);
    setZapCount(newZapCount);
    setCurrentVote(newVote);

    // Server action
    startTransition(async () => {
      const result = await voteOnPost(postId, voteType);
      if (result.error) {
        // Revert on error
        setSnapCount(snapCount);
        setZapCount(zapCount);
        setCurrentVote(currentVote);
        console.error('Vote failed:', result.error);
      }
    });
  };

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const scoreSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center gap-3">
        {/* Snap Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('snap');
          }}
          disabled={isPending}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            currentVote === 'snap'
              ? 'bg-teal-500 text-white shadow-lg'
              : 'hover:bg-teal-50 text-slate-600'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Snap if it resonates"
        >
          <Zap size={iconSize} className={currentVote === 'snap' ? 'fill-white' : ''} />
          <span className="font-bold">{snapCount}</span>
        </button>

        {/* Net Score */}
        <div className={`font-black ${scoreSize} ${
          netScore > 0 ? 'text-teal-600' :
          netScore < 0 ? 'text-slate-400' :
          'text-slate-600'
        }`}>
          {netScore > 0 ? '+' : ''}{netScore}
        </div>

        {/* Zap Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVote('zap');
          }}
          disabled={isPending}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            currentVote === 'zap'
              ? 'bg-slate-500 text-white shadow-lg'
              : 'hover:bg-slate-100 text-slate-600'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Zap if it sparks debate"
        >
          <Zap size={iconSize} className={`rotate-180 ${currentVote === 'zap' ? 'fill-white' : ''}`} />
          <span className="font-bold">{zapCount}</span>
        </button>
      </div>
    );
  }

  // Vertical orientation (Reddit-style)
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Snap Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote('snap');
        }}
        disabled={isPending}
        className={`p-2 rounded-lg transition-all ${
          currentVote === 'snap'
            ? 'bg-teal-500 text-white shadow-lg'
            : 'hover:bg-teal-50 text-slate-400 hover:text-teal-600'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Snap if it resonates"
      >
        <Zap size={iconSize} className={currentVote === 'snap' ? 'fill-white' : ''} />
      </button>

      {/* Net Score */}
      <div className={`font-black ${scoreSize} ${
        netScore > 0 ? 'text-teal-600' :
        netScore < 0 ? 'text-slate-400' :
        'text-slate-600'
      }`}>
        {netScore}
      </div>

      {/* Zap Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote('zap');
        }}
        disabled={isPending}
        className={`p-2 rounded-lg transition-all ${
          currentVote === 'zap'
            ? 'bg-slate-500 text-white shadow-lg'
            : 'hover:bg-slate-100 text-slate-400'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Zap if it sparks debate"
      >
        <Zap size={iconSize} className={`rotate-180 ${currentVote === 'zap' ? 'fill-white' : ''}`} />
      </button>
    </div>
  );
}

// Memoize the component - prevents unnecessary re-renders when parent updates
// Significantly improves performance on pages with many voting buttons (debates list)
export const VoteButtons = memo(VoteButtonsComponent);
