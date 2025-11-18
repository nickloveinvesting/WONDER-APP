'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Cpu, Lightbulb, Heart, TrendingUp } from 'lucide-react';

type Quadrant = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
};

const QUADRANTS: Quadrant[] = [
  {
    id: 'ai_technology',
    name: 'AI & Technology',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'morality_ethics',
    name: 'Morality & Ethics',
    icon: Heart,
    color: 'from-rose-500 to-red-500',
  },
  {
    id: 'economics_society',
    name: 'Economics & Society',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
  },
];

/**
 * Left-hand quadrant navigation
 * Displays the 4 main content quadrants for filtering posts
 */
export function QuadrantNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuadrant = searchParams.get('quadrant');

  // Only show on debates page
  if (!pathname.startsWith('/debates')) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-black text-slate-900 mb-1">Quadrants</h2>
          <p className="text-sm text-slate-600 font-medium">Explore by topic</p>
        </div>

        {/* All Posts Link */}
        <Link
          href="/debates"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
            !currentQuadrant
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
              : 'hover:bg-slate-50 text-slate-700'
          }`}
        >
          <div className="flex-1">
            <div className="font-bold text-sm">All Posts</div>
          </div>
        </Link>

        {/* Quadrant Links */}
        <div className="space-y-2">
          {QUADRANTS.map((quadrant) => {
            const Icon = quadrant.icon;
            const isActive = currentQuadrant === quadrant.id;

            return (
              <Link
                key={quadrant.id}
                href={`/debates?quadrant=${quadrant.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${quadrant.color} text-white shadow-lg`
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                <div className="flex-1">
                  <div className="font-bold text-sm">{quadrant.name}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
          <h3 className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
            Today's Activity
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">Active Posts</span>
              <span className="font-black text-slate-900">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">New Comments</span>
              <span className="font-black text-teal-600">187</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
