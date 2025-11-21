'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function SubmittedPage() {
  const [applicantName, setApplicantName] = useState<string>('');

  useEffect(() => {
    // Get stored application data
    const stored = sessionStorage.getItem('wonderApplication');
    if (stored) {
      const data = JSON.parse(stored);
      setApplicantName(data.name || '');

      // In production, submit the full application to the API here
      // fetch('/api/gate/submit', { method: 'POST', body: stored });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Logo */}
      <header className="p-6">
        <Logo size="sm" variant="white" />
      </header>

      {/* Confirmation */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="text-center max-w-md">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-teal-500 flex items-center justify-center"
          >
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-10 h-10 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-light text-white mb-4">
              We&apos;ve received your application
              {applicantName && (
                <span className="text-teal-400">, {applicantName}</span>
              )}
              .
            </h1>

            <p className="text-slate-400 mb-8 leading-relaxed">
              We&apos;ll be in touch soon.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-slate-500 text-sm italic"
            >
              In the meantime, sit with your questions.
            </motion.p>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div
              className="w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
