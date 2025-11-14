/**
 * ARGUED Leaderboard Row Component
 * Displays user ranking, DeLO rating, and stats
 */

import { Badge } from './Badge';

interface LeaderboardRowProps {
  rank: number;
  username: string;
  displayName?: string;
  deloRating: number;
  totalDebates: number;
  debatesWon: number;
  winRate: number;
  change?: number; // Rating change
  isCurrentUser?: boolean;
}

export function LeaderboardRow({
  rank,
  username,
  displayName,
  deloRating,
  totalDebates,
  debatesWon,
  winRate,
  change,
  isCurrentUser = false,
}: LeaderboardRowProps) {
  const getRankDisplay = () => {
    switch (rank) {
      case 1:
        return <span className="text-2xl">🥇</span>;
      case 2:
        return <span className="text-2xl">🥈</span>;
      case 3:
        return <span className="text-2xl">🥉</span>;
      default:
        return (
          <span className="text-argued-brown font-bold text-lg w-8">
            #{rank}
          </span>
        );
    }
  };

  const getRankBgColor = () => {
    if (isCurrentUser) return 'bg-argued-navy/10 border-l-4 border-l-argued-navy';
    if (rank <= 3) return 'bg-argued-gold/10';
    return '';
  };

  return (
    <div
      className={`
        bg-white rounded-lg p-4 border-l-4 border-argued-navy
        flex items-center justify-between
        hover:bg-argued-cream transition-all duration-200
        ${getRankBgColor()}
      `}
    >
      {/* Rank & User Info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 flex items-center justify-center">
          {getRankDisplay()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-argued-navy">
              {displayName || username}
            </p>
            {isCurrentUser && (
              <Badge type="default" size="sm">You</Badge>
            )}
          </div>
          <p className="text-sm text-argued-gray">
            {totalDebates} {totalDebates === 1 ? 'debate' : 'debates'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        {/* DeLO Rating */}
        <div className="text-right">
          <p className="text-xs text-argued-gray mb-1">DeLO</p>
          <Badge type="rating" size="md">
            {deloRating}
          </Badge>
        </div>

        {/* Win Rate */}
        <div className="text-right hidden md:block">
          <p className="text-xs text-argued-gray mb-1">Win Rate</p>
          <p className="text-argued-navy font-bold">{winRate}%</p>
        </div>

        {/* Change Indicator */}
        {change !== undefined && change !== 0 && (
          <div className="text-right">
            <span
              className={`text-sm font-bold ${
                change > 0 ? 'text-argued-success' : 'text-argued-error'
              }`}
            >
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
