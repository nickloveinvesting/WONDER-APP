'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface Props {
  email: string;
}

export default function GateSuccess({ email }: Props) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center">
          <Logo size="sm" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="max-w-lg text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-8 bg-teal-500 rounded-full flex items-center justify-center shadow-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-teal-500" />
                <span className="text-teal-600 font-semibold">Welcome</span>
                <Sparkles className="w-6 h-6 text-teal-500" />
              </div>

              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                You&apos;re In
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                WONDER isn&apos;t a place for people who have all the answers.
                It&apos;s for people who find the questions worth living with.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg mb-8">
                <h3 className="font-bold text-slate-900 mb-2">What happens next?</h3>
                <ul className="text-left space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">1</span>
                    </div>
                    <span>Check your email ({email}) for account setup instructions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">2</span>
                    </div>
                    <span>Complete your profile and tell us about your philosophical interests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">3</span>
                    </div>
                    <span>Start exploring discussions and join conversations that intrigue you</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl w-full"
                >
                  Create Your Account <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-teal-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl"
        />
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-500">
        Philosophy for the curious, not the credentialed.
      </footer>
    </div>
  );
}
