/**
 * Depth Score Display Component
 * Shows the depth-weighted engagement score for arguments
 * Based on: read time, citations, view changes, expert endorsements
 */

'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Clock,
  BookOpen,
  Lightbulb,
  Award,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DepthScoreProps {
  score: number;
  breakdown?: {
    readTimeScore?: number;
    citationScore?: number;
    viewChangeScore?: number;
    expertEndorsementScore?: number;
    engagementDaysScore?: number;
  };
  variant?: 'compact' | 'detailed' | 'badge';
}

export function DepthScore({ score, breakdown, variant = 'compact' }: DepthScoreProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Determine score level for coloring
  const getScoreLevel = () => {
    if (score >= 80) return { level: 'exceptional', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (score >= 60) return { level: 'excellent', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' };
    if (score >= 40) return { level: 'good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (score >= 20) return { level: 'developing', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' };
    return { level: 'new', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' };
  };

  const { level, color, bg, border } = getScoreLevel();

  // Badge variant - minimal display
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${bg} ${border} border`}
        title={`Depth Score: ${score} (${level})`}
      >
        <TrendingUp size={12} className={color} />
        <span className={`text-xs font-bold ${color}`}>{score}</span>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${bg} ${border} border transition-all hover:shadow-sm`}
        >
          <TrendingUp size={16} className={color} />
          <span className={`font-black ${color}`}>{score}</span>
          <span className="text-xs text-slate-500 font-medium">depth</span>
          {breakdown && (
            showBreakdown ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />
          )}
        </button>

        {/* Breakdown Tooltip */}
        {showBreakdown && breakdown && (
          <div className="absolute z-10 mt-2 w-64 p-4 bg-white rounded-xl shadow-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info size={14} />
              Score Breakdown
            </h4>
            <div className="space-y-2">
              {breakdown.readTimeScore !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} />
                    Read Time
                  </span>
                  <span className="font-bold text-slate-900">+{breakdown.readTimeScore}</span>
                </div>
              )}
              {breakdown.citationScore !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={14} />
                    Citations
                  </span>
                  <span className="font-bold text-slate-900">+{breakdown.citationScore}</span>
                </div>
              )}
              {breakdown.viewChangeScore !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Lightbulb size={14} />
                    Changed Views
                  </span>
                  <span className="font-bold text-amber-600">+{breakdown.viewChangeScore}</span>
                </div>
              )}
              {breakdown.expertEndorsementScore !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Award size={14} />
                    Expert Endorsements
                  </span>
                  <span className="font-bold text-teal-600">+{breakdown.expertEndorsementScore}</span>
                </div>
              )}
              {breakdown.engagementDaysScore !== undefined && (
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <TrendingUp size={14} />
                    Sustained Engagement
                  </span>
                  <span className="font-bold text-slate-900">+{breakdown.engagementDaysScore}</span>
                </div>
              )}
            </div>
            <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              Depth score measures argument quality through engagement depth, not just quantity.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Detailed variant - full display
  return (
    <div className={`p-4 rounded-xl ${bg} ${border} border`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp size={18} className={color} />
          Depth Score
        </h4>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-black ${color}`}>{score}</span>
          <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${bg}`}>{level}</span>
        </div>
      </div>

      {breakdown && (
        <div className="grid grid-cols-2 gap-3">
          <ScoreBar
            label="Read Time"
            icon={<Clock size={14} />}
            score={breakdown.readTimeScore || 0}
            maxScore={25}
          />
          <ScoreBar
            label="Citations"
            icon={<BookOpen size={14} />}
            score={breakdown.citationScore || 0}
            maxScore={20}
          />
          <ScoreBar
            label="Changed Views"
            icon={<Lightbulb size={14} />}
            score={breakdown.viewChangeScore || 0}
            maxScore={30}
            highlight
          />
          <ScoreBar
            label="Expert Endorsements"
            icon={<Award size={14} />}
            score={breakdown.expertEndorsementScore || 0}
            maxScore={15}
          />
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Arguments are ranked by depth of engagement, not popularity. Quality discourse rises to the top.
      </p>
    </div>
  );
}

function ScoreBar({
  label,
  icon,
  score,
  maxScore,
  highlight = false
}: {
  label: string;
  icon: React.ReactNode;
  score: number;
  maxScore: number;
  highlight?: boolean;
}) {
  const percentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          {icon}
          {label}
        </span>
        <span className={`text-xs font-bold ${highlight ? 'text-amber-600' : 'text-slate-900'}`}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${highlight ? 'bg-amber-400' : 'bg-teal-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Compact depth indicator for lists
 */
export function DepthIndicator({ score }: { score: number }) {
  const getIndicator = () => {
    if (score >= 80) return { dots: 5, color: 'bg-amber-400' };
    if (score >= 60) return { dots: 4, color: 'bg-teal-500' };
    if (score >= 40) return { dots: 3, color: 'bg-blue-500' };
    if (score >= 20) return { dots: 2, color: 'bg-slate-400' };
    return { dots: 1, color: 'bg-slate-300' };
  };

  const { dots, color } = getIndicator();

  return (
    <div className="flex items-center gap-0.5" title={`Depth: ${score}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-1.5 h-1.5 rounded-full ${n <= dots ? color : 'bg-slate-200'}`}
        />
      ))}
    </div>
  );
}
