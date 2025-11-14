'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { signIn } from './actions';

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
      className="w-full px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {pending ? 'Logging in...' : 'Log In'}
    </button>
  );
}

/**
 * Login Page - Uses Server Actions for authentication
 * 
 * Key features:
 * - All auth happens server-side (no race conditions)
 * - useFormState for error handling
 * - useFormStatus for loading states
 * - Progressive enhancement (works without JS)
 * - No client-side navigation needed
 * 
 * The Server Action (signIn) handles:
 * 1. Authentication with Supabase
 * 2. Setting cookies server-side
 * 3. Server-side redirect to /debates
 * 
 * This eliminates the race condition where client-side router.push()
 * would navigate before cookies propagated to the server.
 */
export default function LoginPage() {
  // useFormState manages form submission and errors
  // initialState is null, signIn is the server action
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-white">
            PhiloDuel
          </Link>
          <p className="text-gray-300 mt-2">Welcome back, philosopher</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          {/* Form using Server Action - no onSubmit handler needed */}
          <form action={formAction} className="space-y-6">
            {/* Error message from server action */}
            {state?.error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition"
                placeholder="philosopher@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Submit button with loading state */}
            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-accent-500 hover:text-accent-400 transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
