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
  influence_score: number;
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
            .select('username, influence_score')
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
            .select('username, influence_score')
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

  // IMPROVED: Hide navigation on homepage AND authenticated routes
  // - Homepage has its own built-in header (white sticky header)
  // - Authenticated layout has its own Header component
  const shouldHideNavigation = pathname && (
    pathname === '/' ||  // Landing page has its own header
    pathname.startsWith('/debates') ||
    pathname.startsWith('/leaderboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings')
  );
  
  if (shouldHideNavigation) {
    return null; // Don't render on these pages
  }

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

  // Unauthenticated navigation items
  const publicNavItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  // Authenticated navigation items
  const authenticatedNavItems = [
    { href: '/debates', label: 'Conversations' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'Profile' },
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 border-b border-indigo-700 shadow-lg">
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
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-24 h-8 bg-indigo-500 animate-pulse rounded" />
            ) : user && profile ? (
              // Authenticated User Menu
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-white hover:bg-indigo-500 transition"
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <span className="font-medium">{profile.username}</span>
                  <span className="text-yellow-300">✨ {profile.influence_score}</span>
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
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Unauthenticated Buttons
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-white hover:text-indigo-100 transition font-medium"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition font-medium shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-indigo-500 transition"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-indigo-700">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive(item.href)
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {!loading && (
              <div className="pt-4 border-t border-indigo-700">
                {user && profile ? (
                  // Authenticated Mobile Menu
                  <>
                    <div className="px-4 py-2 text-white font-medium">
                      {profile.username}
                      <span className="ml-2 text-yellow-300">✨ {profile.influence_score}</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-500 rounded-md transition"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-500 rounded-md transition"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-indigo-500 rounded-md transition"
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
                      className="block px-4 py-2 text-center text-white hover:bg-indigo-500 rounded-md transition font-medium"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-2 text-center bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition font-medium"
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
