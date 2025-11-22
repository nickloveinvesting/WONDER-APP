'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { QuadrantNav } from '@/components/QuadrantNav';
import { MobileDrawer } from '@/components/MobileDrawer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { signOut } from '@/lib/actions';

interface UserProfile {
  id: string;
  username: string;
  email?: string;
  influenceScore: number;
  dailyStreak?: number;
  longestStreak?: number;
  streakProtected?: boolean;
}

interface AuthenticatedShellProps {
  user: UserProfile | null;
  children: React.ReactNode;
}

/**
 * AuthenticatedShell - Client component wrapper for authenticated pages
 * Handles mobile drawer state and integrates all navigation components
 */
export function AuthenticatedShell({ user, children }: AuthenticatedShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <Header
        user={user}
        onSignOut={handleSignOut}
        onMenuClick={() => setMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer - Slide-in navigation */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main Layout with Quadrant Nav */}
      <div className="flex-1 flex">
        {/* Left-hand Quadrant Navigation (Desktop only) */}
        <QuadrantNav />

        {/* Main Content - with bottom padding for mobile nav */}
        <main className="flex-1 pb-16 lg:pb-0">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
