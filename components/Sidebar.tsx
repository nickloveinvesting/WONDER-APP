'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Trophy, X, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/debates', label: 'Debates', icon: Home },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-700
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:block w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-black text-white tracking-tight">WONDER</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
