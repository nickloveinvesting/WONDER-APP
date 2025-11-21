'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

const WAIT_TIME = 60; // seconds

export default function WonderGatePage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev >= WAIT_TIME) {
          clearInterval(interval);
          setIsReady(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Focus textarea when ready
  useEffect(() => {
    if (isReady && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isReady]);

  const handleSubmit = async () => {
    if (!response.trim() || !isReady) return;

    setIsSubmitting(true);

    // Store response
    const existing = sessionStorage.getItem('wonderApplication');
    const data = existing ? JSON.parse(existing) : {};
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...data,
      wonderResponse: response,
      wonderCompletedAt: new Date().toISOString(),
    }));

    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/gate/doors');
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = Math.min(seconds / WAIT_TIME, 1);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Logo */}
      <header className="p-6">
        <Logo size="sm" variant="white" />
      </header>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-xl text-center">
          {/* Question */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-white mb-12 leading-relaxed"
          >
            What do you <span className="italic text-teal-400">not</span> know?
          </motion.h1>

          {/* Timer / Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            {!isReady ? (
              <div className="space-y-4">
                {/* Timer display */}
                <div className="text-slate-500 font-mono text-lg">
                  {formatTime(seconds)}
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xs mx-auto h-0.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Waiting message */}
                <p className="text-slate-600 text-sm">
                  Take a moment to wonder.
                </p>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-400 text-sm"
              >
                You may respond.
              </motion.p>
            )}
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative"
          >
            <div
              className={`relative transition-all duration-500 ${
                isReady
                  ? 'opacity-100'
                  : 'opacity-30 pointer-events-none'
              }`}
            >
              <textarea
                ref={textareaRef}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={!isReady}
                placeholder={isReady ? "Speak your uncertainty..." : ""}
                rows={4}
                className={`w-full px-5 py-4 bg-transparent border rounded-xl text-white placeholder-slate-600 outline-none transition-all resize-none ${
                  isFocused
                    ? 'border-teal-500'
                    : 'border-slate-700'
                }`}
              />

              {/* Glow effect when ready */}
              <AnimatePresence>
                {isReady && !response && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      boxShadow: '0 0 30px rgba(45, 212, 191, 0.15)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <AnimatePresence>
              {isReady && response.trim() && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-6 px-8 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-400 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
