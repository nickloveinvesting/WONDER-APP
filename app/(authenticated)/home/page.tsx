/**
 * Authenticated Home Page - Main Dashboard
 * 
 * This is the main hub for authenticated users with:
 * - All Posts/Discussions feed
 * - Quadrant navigation (AI, Philosophy, Ethics, Economics)
 * - Quick access to create new posts
 * - Daily featured discussion
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DiscussionPreviewCard from '@/components/DiscussionPreviewCard';
import Link from 'next/link';

export default async function AuthenticatedHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch featured discussion
  const { data: discussions } = await supabase
    .from('discussions')
    .select('*')
    .eq('featured', true)
    .limit(1)
    .single();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            Welcome back, thinker
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Jump into today's most compelling philosophical discussions
          </p>
        </div>

        {/* Featured Discussion */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-teal-50 px-4 py-2 rounded-full border border-teal-200">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-bold text-slate-700">TODAY'S QUESTION</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-l-teal-500">
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full mb-4">
              FEATURED
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              What makes something beautiful?
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Is beauty in the eye of the beholder, or are there objective standards? Can anything be art?
            </p>
            <Link
              href="/debates/create"
              className="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-all"
            >
              Join the Conversation →
            </Link>
          </div>
        </div>

        {/* All Discussions Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              All Discussions
            </h2>
            <Link
              href="/debates/create"
              className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-all"
            >
              + Start New Discussion
            </Link>
          </div>

          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">
              Discussions loading...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
