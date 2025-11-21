/**
 * WONDER Header Component
 * Top navigation with logo, nav links, and user menu
 * Matches the landing page design: compact, white/backdrop blur, teal accents
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, Settings, LogOut, MessageSquarePlus } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from './Button';
import { Badge } from './Badge';
import { FeedbackModal } from '@/components/FeedbackModal';
import { StreakDisplay } from '@/components/StreakDisplay';

interface HeaderProps {
  user?: {
    id: string;
    username: string;
    influenceScore: number;
    dailyStreak?: number;
    longestStreak?: number;
    streakProtected?: boolean;
  } | null;
  onSignOut?: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const pathname = usePathname();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const navItems = user
    ? [
      { href: '/home', label: 'Home' },
      { href: '/debates', label: 'Posts' },
      { href: '/discuss', label: 'Discuss' },
      { href: '/journal', label: 'Journal' },
      { href: '/leaderboard', label: 'Leaderboard' },
    ]
    : [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
    ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-1.5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo variant="black" size="xs" clickable={true} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`text-sm font-bold transition-all relative ${isActive(item.href)
                    ? 'text-teal-600'
                    : 'text-slate-700 hover:text-teal-600'
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {/* Feedback Button */}
                <button
                  onClick={() => setFeedbackModalOpen(true)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-all"
                  title="Share feedback"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Feedback</span>
                </button>

                {/* User Menu */}
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-1.5 rounded-lg text-slate-700 font-bold hover:text-teal-600 hover:bg-teal-50 transition-all text-sm"
                  >
                    <span className="font-bold">{user.username}</span>
                    {(user.dailyStreak ?? 0) > 0 && (
                      <StreakDisplay
                        currentStreak={user.dailyStreak ?? 0}
                        isProtected={user.streakProtected}
                        size="sm"
                      />
                    )}
                    <Badge type="rating" size="sm" color="teal">
                      ✨ {user.influenceScore}
                    </Badge>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 border border-slate-200">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1 border-slate-200" />
                      <button
                        onClick={() => {
                          onSignOut?.();
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="compact" size="sm">Join Free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-50 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`block px-4 py-2 text-sm font-bold rounded-lg transition ${isActive(item.href)
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-slate-700 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {user ? (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="px-4 py-2 text-sm font-bold text-slate-700 flex items-center space-x-2">
                  <span>{user.username}</span>
                  {(user.dailyStreak ?? 0) > 0 && (
                    <StreakDisplay
                      currentStreak={user.dailyStreak ?? 0}
                      isProtected={user.streakProtected}
                      size="sm"
                    />
                  )}
                  <Badge type="rating" size="sm" color="teal">
                    ✨ {user.influenceScore}
                  </Badge>
                </div>
                <button
                  onClick={() => {
                    setFeedbackModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <MessageSquarePlus className="w-4 h-4 mr-2" />
                  Share Feedback
                </button>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    onSignOut?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" fullWidth size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="compact" fullWidth size="sm">
                    Join Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </header>
  );
}
