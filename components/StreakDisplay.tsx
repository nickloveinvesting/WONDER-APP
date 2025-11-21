/**
 * Streak Display Component
 * Shows user's daily activity streak with fire icon
 * Encourages daily engagement with the platform
 */

'use client';

import { Flame, Shield } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak?: number;
  isProtected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'compact' | 'detailed';
}

export function StreakDisplay({
  currentStreak,
  longestStreak,
  isProtected = false,
  size = 'sm',
  showLabel = false,
  variant = 'compact',
}: StreakDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  // Color based on streak length
  const getStreakColor = () => {
    if (currentStreak >= 30) return 'text-orange-500'; // On fire!
    if (currentStreak >= 14) return 'text-amber-500';
    if (currentStreak >= 7) return 'text-yellow-500';
    if (currentStreak >= 3) return 'text-teal-500';
    return 'text-slate-400';
  };

  const getBgColor = () => {
    if (currentStreak >= 30) return 'bg-orange-50';
    if (currentStreak >= 14) return 'bg-amber-50';
    if (currentStreak >= 7) return 'bg-yellow-50';
    if (currentStreak >= 3) return 'bg-teal-50';
    return 'bg-slate-50';
  };

  if (variant === 'detailed') {
    return (
      <div className={`${getBgColor()} rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Flame className={`${getStreakColor()}`} size={iconSizes.lg} />
            <span className={`font-black ${sizeClasses.lg} text-slate-900`}>
              {currentStreak} Day Streak
            </span>
          </div>
          {isProtected && (
            <div className="flex items-center gap-1 text-teal-600">
              <Shield size={16} />
              <span className="text-xs font-bold">Protected</span>
            </div>
          )}
        </div>
        {longestStreak !== undefined && longestStreak > currentStreak && (
          <p className="text-sm text-slate-500 font-medium">
            Your best: {longestStreak} days
          </p>
        )}
        {currentStreak >= 7 && (
          <p className="text-sm text-slate-600 font-medium mt-2">
            {currentStreak >= 30
              ? '🔥 Incredible! A month of daily thinking!'
              : currentStreak >= 14
              ? '✨ Two weeks strong! Keep it up!'
              : '👏 One week milestone achieved!'}
          </p>
        )}
      </div>
    );
  }

  // Compact variant (for header)
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${getBgColor()} ${sizeClasses[size]}`}
      title={`${currentStreak} day streak${isProtected ? ' (protected)' : ''}`}
    >
      <Flame className={getStreakColor()} size={iconSizes[size]} />
      <span className={`font-bold ${getStreakColor()}`}>{currentStreak}</span>
      {showLabel && (
        <span className="text-slate-500 font-medium">day streak</span>
      )}
      {isProtected && <Shield className="text-teal-500" size={iconSizes[size] - 2} />}
    </div>
  );
}
