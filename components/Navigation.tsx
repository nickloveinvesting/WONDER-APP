'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { signOut } from '@/lib/actions'; // Use server action for sign out
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Header } from '@/components/ui/Header';

interface Profile {
  username: string;
  influence_score: number;
}

export default function Navigation() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
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
        // Error fetching user data - fail silently
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

  // Hide navigation on homepage, auth pages, and authenticated routes
  // - Homepage has its own built-in header
  // - Auth pages (login/signup) have their own branded pages
  // - Authenticated layout has its own Header component
  const shouldHideNavigation = pathname && (
    pathname === '/' ||  // Landing page
    pathname.startsWith('/auth') ||  // Hide on ALL auth pages (login, signup, etc)
    pathname.startsWith('/debates') ||
    pathname.startsWith('/journal') ||
    pathname.startsWith('/discuss') ||
    pathname.startsWith('/leaderboard') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/settings')
  );

  if (shouldHideNavigation) {
    return null; // Don't render on these pages
  }

  // Format user for Header component
  const headerUser = user && profile ? {
    id: user.id,
    username: profile.username,
    influenceScore: profile.influence_score || 0
  } : null;

  return (
    <Header
      user={headerUser}
      onSignOut={signOut}
    />
  );
}
