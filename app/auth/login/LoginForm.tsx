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
      className="w-full px-8 py-3 bg-teal-600 text-white text-base font-black rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}

/**
 * Login Form Component - Client Component for interactivity
 * Updated with ARGUED branding (cream background, navy/teal colors)
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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-6">
            <Logo variant="black" size="lg" clickable={false} />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-600 text-base font-medium">Sign in to continue arguing and building your DeLO rating</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
          <form action={formAction} className="space-y-6">
            {/* Error Message */}
            {state?.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-semibold text-sm">
                {state.error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
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
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition font-medium"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <SubmitButton />
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-teal-600 hover:text-teal-700 transition font-bold">
                Create one free
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
