'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Plus, Bell, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/debates', label: 'Discuss', icon: MessageSquare },
  { href: '/debates/create', label: 'Create', icon: Plus, isAction: true },
  { href: '/leaderboard', label: 'Activity', icon: Bell },
  { href: '/profile', label: 'Profile', icon: User },
];

/**
 * Mobile Bottom Navigation
 * Fixed 56px bottom bar with 5 primary actions
 * Hidden on desktop (lg:hidden)
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/home') return pathname === '/home';
    if (href === '/debates/create') return pathname === '/debates/create';
    return pathname?.startsWith(href) && pathname !== '/debates/create';
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          // Special styling for the Create button
          if (item.isAction) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shadow-lg hover:bg-teal-600 transition-colors">
                  <Icon size={24} className="text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active
                  ? 'text-teal-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={22} className={active ? 'text-teal-600' : ''} />
              <span className={`text-xs mt-1 font-medium ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
