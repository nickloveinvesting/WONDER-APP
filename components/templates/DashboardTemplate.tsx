/**
 * WONDER Dashboard Template
 * Post-login landing page with stats, recent activity, featured debates
 */

import Link from 'next/link';
import { StatCard } from '../ui/StatCard';
import { DebateCard } from '../ui/DebateCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Trophy, TrendingUp, Target, Zap } from 'lucide-react';

interface DashboardProps {
  user: {
    username: string;
    deloRating: number;
    rank: number;
    totalUsers: number;
  };
  stats: {
    totalDebates: number;
    winRate: number;
    avgScore: number;
    currentStreak: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'win' | 'loss' | 'achievement';
    title: string;
    date: string;
  }>;
  featuredDebate: {
    id: string;
    topic: string;
    description: string;
    forCount: number;
    againstCount: number;
    participants: number;
  };
}

export function DashboardTemplate({
  user,
  stats,
  recentActivity,
  featuredDebate,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-argued-cream">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-argued-navy mb-2 font-sans">
            Welcome back, {user.username}!
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-argued-gray">Your DeLO Rating:</span>
              <Badge type="rating" size="lg">
                {user.deloRating}
              </Badge>
              <span className="text-argued-success text-sm">↑ 15 this week</span>
            </div>
            <div className="text-argued-gray">
              Rank: #{user.rank} / {user.totalUsers} users
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Debates"
            value={stats.totalDebates}
            icon={Trophy}
            variant="default"
          />
          <StatCard
            label="Win Rate"
            value={`${stats.winRate}%`}
            icon={TrendingUp}
            variant="success"
            trend={{ value: 5, label: 'vs last month' }}
          />
          <StatCard
            label="Avg Score"
            value={`${stats.avgScore}/10`}
            icon={Target}
            variant="achievement"
          />
          <StatCard
            label="Current Streak"
            value={stats.currentStreak}
            icon={Zap}
            variant="default"
            trend={{ value: 3, label: 'debates' }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Debate */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-argued-navy font-sans">
                  Featured Debate
                </h2>
                <Link href="/debates">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <DebateCard
                {...featuredDebate}
                status="open"
                featured={true}
                onClick={() => {}}
              />
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-l-argued-brown shadow-md">
              <h3 className="text-xl font-bold text-argued-navy mb-4 font-sans">
                Performance Insights
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-argued-black font-medium">Logic</span>
                    <span className="text-argued-navy font-bold">8.5/10</span>
                  </div>
                  <div className="w-full bg-argued-cream rounded-full h-2">
                    <div
                      className="bg-argued-navy h-2 rounded-full"
                      style={{ width: '85%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-argued-black font-medium">Evidence</span>
                    <span className="text-argued-navy font-bold">7.2/10</span>
                  </div>
                  <div className="w-full bg-argued-cream rounded-full h-2">
                    <div
                      className="bg-argued-navy h-2 rounded-full"
                      style={{ width: '72%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-argued-black font-medium">Rhetoric</span>
                    <span className="text-argued-navy font-bold">9.1/10</span>
                  </div>
                  <div className="w-full bg-argued-cream rounded-full h-2">
                    <div
                      className="bg-argued-navy h-2 rounded-full"
                      style={{ width: '91%' }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-argued-gray font-serif italic">
                💡 Your rhetoric is excellent! Focus on citing more peer-reviewed sources
                to improve your evidence score.
              </p>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-l-argued-navy shadow-md">
              <h3 className="text-xl font-bold text-argued-navy mb-4 font-sans">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      {activity.type === 'win' && (
                        <span className="text-argued-success">✓</span>
                      )}
                      {activity.type === 'loss' && (
                        <span className="text-argued-error">✗</span>
                      )}
                      {activity.type === 'achievement' && (
                        <span className="text-argued-brown">🏆</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-argued-black font-medium">
                        {activity.title}
                      </p>
                      <p className="text-xs text-argued-gray">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-l-argued-brown shadow-md">
              <h3 className="text-xl font-bold text-argued-navy mb-4 font-sans">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/debates/create">
                  <Button variant="primary" fullWidth>
                    Create New Debate
                  </Button>
                </Link>
                <Link href="/debates">
                  <Button variant="outline" fullWidth>
                    Browse Debates
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" fullWidth>
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-white rounded-lg p-6 border-l-4 border-l-argued-brown shadow-md">
              <h3 className="text-xl font-bold text-argued-navy mb-4 font-sans">
                Recent Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-argued-brown/10 rounded-lg">
                  <div className="text-2xl mb-1">🏆</div>
                  <p className="text-xs text-argued-black font-medium">
                    First Victory
                  </p>
                </div>
                <div className="text-center p-3 bg-argued-brown/10 rounded-lg">
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-xs text-argued-black font-medium">
                    Perfect Logic
                  </p>
                </div>
                <div className="text-center p-3 bg-argued-cream rounded-lg opacity-50">
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-argued-gray">10 Win Streak</p>
                </div>
                <div className="text-center p-3 bg-argued-cream rounded-lg opacity-50">
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-argued-gray">100 Arguments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
