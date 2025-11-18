'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate username
      if (username.length < 3 || username.length > 30) {
        throw new Error('Username must be 3-30 characters');
      }

      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase().trim(),
            display_name: displayName || username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities?.length === 0) {
          setError('This email is already registered. Please log in.');
          setLoading(false);
        } else if (data.session) {
          // Wait for session to fully sync
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Force a hard navigation to ensure clean state
          window.location.href = '/debates';
        } else {
          // No session yet, might need email confirmation
          setError('Account created! Please check your email to confirm.');
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <Logo variant="white" size="lg" clickable={false} />
          </Link>
          <h2 className="text-2xl font-black text-white mb-2">Welcome to Ponder</h2>
          <p className="text-slate-300 mt-1 text-lg font-medium text-center">
            You don't need credentials—just curiosity.<br/>Join 500+ thinkers exploring ideas together.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-bold text-slate-200 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={30}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="socrates"
              />
              <p className="text-xs text-slate-400 mt-1 font-medium">3-30 characters</p>
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-bold text-slate-200 mb-2">
                Display Name (Optional)
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="The Philosopher"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-400 mt-1 font-medium">At least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-teal-500 text-white text-base font-black rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-300 font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-teal-400 hover:text-teal-300 transition font-bold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
