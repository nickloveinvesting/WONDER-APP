'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Cpu, Lightbulb, Heart, TrendingUp, Archive, Shield } from 'lucide-react';

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
 * Desktop: Always visible sidebar with quadrants and activity stats
 * Mobile: Horizontal chips on debates page only
 */
export function QuadrantNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuadrant = searchParams.get('quadrant');
  const isDebatesPage = pathname.startsWith('/debates');

  return (
    <>
      {/* Mobile: Horizontal scrollable chips - Only on debates page */}
      {isDebatesPage && (
        <div className="lg:hidden sticky top-14 z-40 bg-white border-b border-slate-200 overflow-x-auto">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {/* All Posts Chip */}
          <Link
            href="/debates"
            prefetch={true}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              !currentQuadrant
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Posts
          </Link>

          {/* Quadrant Chips */}
          {QUADRANTS.map((quadrant) => {
            const Icon = quadrant.icon;
            const isActive = currentQuadrant === quadrant.id;

            return (
              <Link
                key={quadrant.id}
                href={`/debates?quadrant=${quadrant.id}`}
                prefetch={true}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${quadrant.color} text-white shadow-md`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                {quadrant.name}
              </Link>
            );
          })}
        </div>
        </div>
      )}

      {/* Desktop: Sidebar - Always visible */}
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
            prefetch={true}
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
                  prefetch={true}
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

          {/* Resources Section */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide px-2">
              Resources
            </h3>
            <div className="space-y-1">
              <Link
                href="/vault"
                prefetch={true}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  pathname === '/vault'
                    ? 'bg-teal-50 text-teal-700'
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Archive size={18} className={pathname === '/vault' ? 'text-teal-600' : 'text-slate-400'} />
                <div className="font-bold text-sm">The Vault</div>
              </Link>
              <Link
                href="/moderation-log"
                prefetch={true}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  pathname === '/moderation-log'
                    ? 'bg-teal-50 text-teal-700'
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Shield size={18} className={pathname === '/moderation-log' ? 'text-teal-600' : 'text-slate-400'} />
                <div className="font-bold text-sm">Moderation Log</div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
