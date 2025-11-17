/**
 * ARGUED Debate Card Component
 * Displays debate topic, participants, and quick actions
 * Used in debates listing page
 */

import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

interface DebateCardProps {
  id: string;
  topic: string;
  description?: string;
  forCount: number;
  againstCount: number;
  participants: number;
  status: 'open' | 'in_progress' | 'completed';
  featured?: boolean;
  onClick?: () => void;
}

export function DebateCard({
  id,
  topic,
  description,
  forCount,
  againstCount,
  participants,
  status,
  featured = false,
  onClick,
}: DebateCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'open':
        return <Badge type="success" size="sm">Open</Badge>;
      case 'in_progress':
        return <Badge type="default" size="sm">In Progress</Badge>;
      case 'completed':
        return <Badge type="achievement" size="sm">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card variant={featured ? 'highlight' : 'standard'} onClick={onClick} className="cursor-pointer hover:shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-argued-navy flex-1 font-sans">
          {topic}
        </h3>
        <div className="flex items-center gap-2 ml-2">
          {getStatusBadge()}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-argued-black text-sm mb-4 line-clamp-2 font-serif">
          {description}
        </p>
      )}

      {/* Position Counters */}
      <div className="flex gap-2 mb-4">
        <Badge type="for" size="sm">
          FOR: {forCount}
        </Badge>
        <Badge type="against" size="sm">
          AGAINST: {againstCount}
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-argued-cream">
        <span className="text-argued-gray text-sm">
          {participants} {participants === 1 ? 'participant' : 'participants'}
        </span>
        <Button variant="primary" size="sm">
          View Debate
        </Button>
      </div>
    </Card>
  );
}
