/**
 * ARGUED Header Component
 * Top navigation with logo, nav links, and user menu
 * Cream background with navy accents
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from './Button';
import { Badge } from './Badge';

interface HeaderProps {
  user?: {
    id: string;
    username: string;
    reputationScore: number;
  } | null;
  onSignOut?: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = user
    ? [
        { href: '/debates', label: 'Debates' },
        { href: '/leaderboard', label: 'Leaderboard' },
        { href: '/profile', label: 'Profile' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
      ];

  return (
    <header className="sticky top-0 z-50 bg-argued-cream border-b-2 border-argued-navy shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-black.png"
              alt="ARGUED"
              width={140}
              height={45}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-argued-navy font-medium hover:text-argued-brown transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-argued-navy hover:bg-argued-cream transition"
                >
                  <span className="font-medium">{user.username}</span>
                  <Badge type="rating" size="sm">
                    {user.reputationScore}
                  </Badge>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border-2 border-argued-navy">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-argued-black hover:bg-argued-cream transition"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-argued-black hover:bg-argued-cream transition"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <hr className="my-1 border-argued-cream" />
                    <button
                      onClick={onSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-argued-error hover:bg-argued-cream transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-argued-navy hover:bg-argued-cream transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-argued-navy">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-argued-navy font-medium hover:bg-argued-cream rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {user ? (
              <div className="mt-4 pt-4 border-t border-argued-cream">
                <div className="px-4 py-2 text-argued-navy font-medium">
                  {user.username}
                  <Badge type="rating" size="sm" className="ml-2">
                    {user.reputationScore}
                  </Badge>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-argued-black hover:bg-argued-cream rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-argued-black hover:bg-argued-cream rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    onSignOut?.();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-argued-error hover:bg-argued-cream rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-argued-cream space-y-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
