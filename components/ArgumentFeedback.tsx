/**
 * Argument Feedback Component
 * Structured feedback system for arguments
 * Replaces simple upvote/downvote with meaningful, constructive feedback
 */

'use client';

import { useState, useTransition } from 'react';
import {
  ThumbsUp,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

export type FeedbackType =
  | 'snap'
  | 'changed_view'
  | 'needs_evidence'
  | 'logic_unclear'
  | 'ignores_counterargument'
  | 'misrepresents_opponent'
  | 'assumes_without_justification';

export type FeedbackCategory = 'positive' | 'constructive';

interface FeedbackOption {
  type: FeedbackType;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: FeedbackCategory;
}

const feedbackOptions: FeedbackOption[] = [
  {
    type: 'snap',
    label: 'Well Argued',
    description: 'This argument is clear and compelling',
    icon: <ThumbsUp size={16} />,
    category: 'positive',
  },
  {
    type: 'changed_view',
    label: 'Changed My View',
    description: 'This perspective shifted my thinking',
    icon: <Lightbulb size={16} />,
    category: 'positive',
  },
  {
    type: 'needs_evidence',
    label: 'Needs Evidence',
    description: 'Would be stronger with sources or examples',
    icon: <AlertCircle size={16} />,
    category: 'constructive',
  },
  {
    type: 'logic_unclear',
    label: 'Logic Unclear',
    description: 'The reasoning is hard to follow',
    icon: <HelpCircle size={16} />,
    category: 'constructive',
  },
  {
    type: 'ignores_counterargument',
    label: 'Ignores Counter',
    description: 'Doesn\'t address opposing views',
    icon: <MessageCircle size={16} />,
    category: 'constructive',
  },
  {
    type: 'misrepresents_opponent',
    label: 'Misrepresents',
    description: 'Strawmans the other position',
    icon: <AlertCircle size={16} />,
    category: 'constructive',
  },
  {
    type: 'assumes_without_justification',
    label: 'Unsupported Claim',
    description: 'Makes assumptions without justification',
    icon: <HelpCircle size={16} />,
    category: 'constructive',
  },
];

interface ArgumentFeedbackProps {
  argumentId: string;
  initialFeedback?: FeedbackType[];
  onFeedbackSubmit?: (argumentId: string, feedbackType: FeedbackType) => Promise<{ error?: string }>;
  feedbackCounts?: Partial<Record<FeedbackType, number>>;
  variant?: 'compact' | 'expanded';
}

export function ArgumentFeedback({
  argumentId,
  initialFeedback = [],
  onFeedbackSubmit,
  feedbackCounts = {},
  variant = 'compact',
}: ArgumentFeedbackProps) {
  const [expanded, setExpanded] = useState(variant === 'expanded');
  const [selectedFeedback, setSelectedFeedback] = useState<Set<FeedbackType>>(new Set(initialFeedback));
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFeedback = async (feedbackType: FeedbackType) => {
    // Toggle selection
    const newSelected = new Set(selectedFeedback);
    if (newSelected.has(feedbackType)) {
      newSelected.delete(feedbackType);
    } else {
      newSelected.add(feedbackType);
    }
    setSelectedFeedback(newSelected);

    // Submit feedback if handler provided
    if (onFeedbackSubmit) {
      startTransition(async () => {
        const result = await onFeedbackSubmit(argumentId, feedbackType);
        if (result.error) {
          // Revert on error
          setSelectedFeedback(selectedFeedback);
          console.error('Feedback failed:', result.error);
        } else {
          setSuccessMessage('Feedback recorded');
          setTimeout(() => setSuccessMessage(null), 2000);
        }
      });
    }
  };

  const positiveOptions = feedbackOptions.filter(o => o.category === 'positive');
  const constructiveOptions = feedbackOptions.filter(o => o.category === 'constructive');

  // Calculate totals
  const totalPositive = positiveOptions.reduce((sum, o) => sum + (feedbackCounts[o.type] || 0), 0);
  const totalConstructive = constructiveOptions.reduce((sum, o) => sum + (feedbackCounts[o.type] || 0), 0);

  return (
    <div className="relative">
      {/* Compact View - Quick Buttons */}
      <div className="flex items-center gap-2">
        {/* Quick Positive Button */}
        <button
          onClick={() => handleFeedback('snap')}
          disabled={isPending}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-bold ${
            selectedFeedback.has('snap')
              ? 'bg-teal-500 text-white shadow-md'
              : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="This argument is well made"
        >
          <ThumbsUp size={14} className={selectedFeedback.has('snap') ? 'fill-white' : ''} />
          <span>{feedbackCounts.snap || 0}</span>
        </button>

        {/* Changed View Button */}
        <button
          onClick={() => handleFeedback('changed_view')}
          disabled={isPending}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-bold ${
            selectedFeedback.has('changed_view')
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="This changed my perspective"
        >
          <Lightbulb size={14} className={selectedFeedback.has('changed_view') ? 'fill-white' : ''} />
          <span>{feedbackCounts.changed_view || 0}</span>
        </button>

        {/* Expand for More Options */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 px-2 py-1.5 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span className="hidden sm:inline">
            {expanded ? 'Less' : 'More feedback'}
          </span>
        </button>

        {/* Success Message */}
        {successMessage && (
          <span className="flex items-center gap-1 text-sm text-green-600 font-medium animate-pulse">
            <Check size={14} />
            {successMessage}
          </span>
        )}
      </div>

      {/* Expanded View - All Feedback Options */}
      {expanded && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {/* Positive Feedback */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Positive Feedback ({totalPositive})
            </h4>
            <div className="flex flex-wrap gap-2">
              {positiveOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleFeedback(option.type)}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                    selectedFeedback.has(option.type)
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-teal-50 border border-slate-200'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={option.description}
                >
                  {option.icon}
                  <span className="font-bold">{option.label}</span>
                  {(feedbackCounts[option.type] || 0) > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                      selectedFeedback.has(option.type) ? 'bg-teal-400' : 'bg-slate-100'
                    }`}>
                      {feedbackCounts[option.type]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Constructive Feedback */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Constructive Feedback ({totalConstructive})
            </h4>
            <p className="text-xs text-slate-500 mb-2">
              Help improve this argument with specific, actionable feedback
            </p>
            <div className="flex flex-wrap gap-2">
              {constructiveOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleFeedback(option.type)}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                    selectedFeedback.has(option.type)
                      ? 'bg-slate-600 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={option.description}
                >
                  {option.icon}
                  <span className="font-medium">{option.label}</span>
                  {(feedbackCounts[option.type] || 0) > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                      selectedFeedback.has(option.type) ? 'bg-slate-500' : 'bg-slate-100'
                    }`}>
                      {feedbackCounts[option.type]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Philosophy Note */}
          <div className="mt-4 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500 italic">
              Quality feedback helps arguments improve. All feedback is anonymous and constructive.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Simple feedback summary display
 * Shows aggregated feedback counts in a compact format
 */
export function FeedbackSummary({ counts }: { counts: Partial<Record<FeedbackType, number>> }) {
  const total = Object.values(counts).reduce((sum, n) => sum + (n || 0), 0);

  if (total === 0) return null;

  const topFeedback = feedbackOptions
    .filter(o => (counts[o.type] || 0) > 0)
    .sort((a, b) => (counts[b.type] || 0) - (counts[a.type] || 0))
    .slice(0, 3);

  return (
    <div className="flex items-center gap-2 text-sm">
      {topFeedback.map((option) => (
        <span
          key={option.type}
          className={`flex items-center gap-1 px-2 py-1 rounded ${
            option.category === 'positive' ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-600'
          }`}
          title={option.description}
        >
          {option.icon}
          <span className="font-medium">{counts[option.type]}</span>
        </span>
      ))}
      {total > 3 && (
        <span className="text-slate-400 text-xs">+{total - 3} more</span>
      )}
    </div>
  );
}
