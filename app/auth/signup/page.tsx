'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { sendWelcomeEmailToUser } from '@/lib/actions/email';

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

          // Send welcome email (fire and forget - don't block navigation)
          sendWelcomeEmailToUser().catch(err => {
            console.error('Failed to send welcome email:', err);
          });

          // Force a hard navigation to ensure clean state
          window.location.href = '/debates';
        } else {
          // No session yet, might need email confirmation
          setError('Account created! Please check your email to confirm.');
          setLoading(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-6">
            <Logo variant="black" size="lg" clickable={false} />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Join WONDER</h1>
          <p className="text-slate-600 text-base font-medium text-center">
            Start exploring ideas with curious minds—no credentials needed
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-slate-900 mb-2">
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
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition font-medium"
                placeholder="socrates"
              />
              <p className="text-xs text-slate-600 mt-1 font-medium">3-30 characters</p>
            </div>

            {/* Display Name Field */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-bold text-slate-900 mb-2">
                Display Name (Optional)
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition font-medium"
                placeholder="The Philosopher"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition font-medium"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition font-medium"
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-600 mt-1 font-medium">At least 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-teal-600 text-white text-base font-black rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-teal-600 hover:text-teal-700 transition font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-600 hover:text-slate-900 transition font-medium text-sm">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
