/**
 * WONDER Sidebar Navigation Component
 * Navy background with brown active states
 * Collapsible on mobile with hamburger menu
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, User, PlusCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface SidebarProps {
  username?: string;
  deloRating?: number;
}

export function Sidebar({ username, deloRating }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/debates', label: 'Debates', icon: Home },
    { href: '/debates/create', label: 'Create Debate', icon: PlusCircle },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-argued-navy text-white shadow-lg"
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
          fixed top-0 left-0 h-full bg-argued-navy
          transition-transform duration-300 z-40 shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-argued-brown/30">
            <Image
              src="/logo-white.png"
              alt="WONDER"
              width={140}
              height={45}
              className="h-8 w-auto"
            />
          </div>

          {/* User Info (if logged in) */}
          {username && (
            <div className="p-4 border-b border-argued-brown/30">
              <p className="text-white font-medium mb-1">{username}</p>
              <p className="text-argued-gold text-sm">
                DeLO: {deloRating || 1000}
              </p>
            </div>
          )}

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
                    transition-all duration-200 font-medium
                    ${
                      isActive(item.href)
                        ? 'bg-argued-brown text-white shadow-md'
                        : 'text-white/80 hover:bg-argued-brown/50 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-argued-brown/30 text-white/60 text-xs">
            © 2025 WONDER
          </div>
        </div>
      </aside>
    </>
  );
}
