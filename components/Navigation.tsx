'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { signOut } from '@/app/auth/actions';
import { Menu, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import Logo from './Logo';

interface Profile {
  username: string;
  reputation_score: number;
}

export default function Navigation() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Fetch user and profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();

        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);

        // If user is authenticated, fetch profile
        if (currentUser) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username, reputation_score')
            .eq('id', currentUser.id)
            .maybeSingle();

          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Subscribe to auth changes
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch profile when user logs in
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username, reputation_score')
            .eq('id', session.user.id)
            .maybeSingle();

          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

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

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Navigation items visible to all users
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/debates', label: 'Debates' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary-600 border-b border-primary-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo variant="white" size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive(item.href)
                    ? 'bg-primary-700 text-white'
                    : 'text-white hover:bg-primary-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="w-24 h-8 bg-primary-500 animate-pulse rounded" />
            ) : user && profile ? (
              // Authenticated User Section
              <>
                {/* User Menu Dropdown */}
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-primary-500 transition border border-primary-400"
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">{profile.username}</span>
                    <span className="text-yellow-300">★ {profile.reputation_score}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </div>
                  )}
                </div>

                {/* Visible Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition font-medium shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // Unauthenticated Buttons
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-white hover:text-gray-200 transition font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition font-medium shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-primary-500 transition"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-700">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive(item.href)
                      ? 'bg-primary-700 text-white'
                      : 'text-white hover:bg-primary-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {!loading && (
              <div className="pt-4 border-t border-primary-700">
                {user && profile ? (
                  // Authenticated Mobile Menu
                  <>
                    <div className="px-4 py-3 bg-primary-700 rounded-md mb-3">
                      <div className="flex items-center space-x-2 text-white">
                        <User className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{profile.username}</div>
                          <div className="text-sm text-yellow-300">★ {profile.reputation_score} reputation</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-white hover:bg-primary-500 rounded-md transition"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-white hover:bg-primary-500 rounded-md transition"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center justify-center w-full mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition font-medium"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  // Unauthenticated Mobile Menu
                  <div className="space-y-2">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-center text-white hover:bg-primary-500 rounded-md transition font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 text-center bg-accent-500 text-white rounded-md hover:bg-accent-600 transition font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
