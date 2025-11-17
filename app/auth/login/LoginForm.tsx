'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { signIn } from '../actions';

/**
 * Submit button with loading state
 * Uses useFormStatus to show loading indicator during form submission
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-8 py-3 bg-teal-500 text-white text-base font-black rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      {pending ? 'Logging in...' : 'Log In'}
    </button>
  );
}

/**
 * Login Form Component - Client Component for interactivity
 * 
 * Uses Server Actions for authentication:
 * - useFormState for error handling
 * - useFormStatus for loading states
 * - Progressive enhancement (works without JS)
 * - No client-side navigation needed
 */
export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <Logo variant="white" size="lg" clickable={false} />
          </Link>
          <p className="text-slate-300 mt-2 text-lg font-medium">Welcome back to ARGUED</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg font-medium">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-200 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="philosopher@argued.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium"
                placeholder="••••••••"
              />
            </div>

            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-300 font-medium">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-teal-400 hover:text-teal-300 transition font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
