import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/debates');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Where Philosophy Comes Alive
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Engage in fair, AI-judged philosophical debates. Build your reputation,
            find your community, and sharpen your mind.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-accent-500 text-white text-lg rounded-lg hover:bg-accent-600 transition transform hover:scale-105"
          >
            Start Your First Duel
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Fair AI Judgment</h3>
            <p className="text-gray-300">
              Gemini AI analyzes arguments objectively based on logic, evidence, and rhetoric.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-white mb-3">Build Reputation</h3>
            <p className="text-gray-300">
              Win debates to earn reputation points and climb the philosopher leaderboard.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">💭</div>
            <h3 className="text-2xl font-bold text-white mb-3">Real Community</h3>
            <p className="text-gray-300">
              Connect with fellow thinkers in a space designed for intellectual discourse.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-4">
            Join 500+ philosophers in the arena of ideas
          </p>
        </div>
      </div>
    </div>
  );
}
