'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, PenLine, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';
import SocraticDialogue from '@/components/gate/SocraticDialogue';
import EssaySubmission from '@/components/gate/EssaySubmission';
import GateSuccess from '@/components/gate/GateSuccess';

type GatePath = 'choice' | 'dialogue' | 'essay';
type GateStatus = 'pending' | 'in_progress' | 'admitted' | 'declined' | 'retry_allowed';

export default function GatePage() {
  const [path, setPath] = useState<GatePath>('choice');
  const [status, setStatus] = useState<GateStatus>('pending');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsValidating(true);
    // In production, validate email and check for existing attempts
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsValidating(false);
    setShowEmailInput(false);
  };

  const handleComplete = (result: { status: GateStatus; score?: number }) => {
    setStatus(result.status);
  };

  if (status === 'admitted') {
    return <GateSuccess email={email} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <span className="text-sm text-slate-500">Entry Gate</span>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Email Collection */}
            {showEmailInput && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <Sparkles className="w-16 h-16 mx-auto text-teal-500 mb-6" />
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                    Welcome to WONDER
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
                    Before we begin, I should be honest with you: This isn&apos;t a test
                    of what you know about philosophy. There are no right answers here.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed mt-4">
                    I&apos;m curious about <span className="font-semibold text-teal-600">how you think</span>.
                  </p>
                </motion.div>

                <motion.form
                  onSubmit={handleEmailSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-md mx-auto"
                >
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2 text-left">
                    Your email address
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isValidating}
                      className="px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isValidating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Begin <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 text-left">
                    We&apos;ll use this to save your progress and notify you of your entry status.
                  </p>
                </motion.form>
              </motion.div>
            )}

            {/* Path Choice */}
            {!showEmailInput && path === 'choice' && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                  Choose Your Path
                </h2>
                <p className="text-lg text-slate-600 mb-10">
                  To enter, we&apos;d like to think with you for a few minutes.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Dialogue Option */}
                  <motion.button
                    onClick={() => setPath('dialogue')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-8 bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-500 shadow-lg hover:shadow-xl transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                      <MessageCircle className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Conversation
                    </h3>
                    <p className="text-slate-600 mb-4">
                      A 5-minute dialogue with our Philosopher. No preparation needed.
                    </p>
                    <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Start dialogue <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </motion.button>

                  {/* Essay Option */}
                  <motion.button
                    onClick={() => setPath('essay')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-8 bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-500 shadow-lg hover:shadow-xl transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors">
                      <PenLine className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Reflection
                    </h3>
                    <p className="text-slate-600 mb-4">
                      A thoughtful written response. Take your time, 200-400 words.
                    </p>
                    <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Write response <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </motion.button>
                </div>

                <p className="text-sm text-slate-500 mt-8">
                  Both paths lead to WONDER for those who truly seek it.
                </p>
              </motion.div>
            )}

            {/* Socratic Dialogue */}
            {path === 'dialogue' && (
              <SocraticDialogue
                email={email}
                onComplete={handleComplete}
                onBack={() => setPath('choice')}
              />
            )}

            {/* Essay Submission */}
            {path === 'essay' && (
              <EssaySubmission
                email={email}
                onComplete={handleComplete}
                onBack={() => setPath('choice')}
              />
            )}
          </AnimatePresence>

          {/* Declined State */}
          {status === 'declined' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 p-6 bg-slate-50 rounded-xl"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Thank you for your time
              </h3>
              <p className="text-slate-600 mb-4">
                WONDER might not be the right place right now, but the door remains open.
                Return tomorrow with fresh thoughts, and we&apos;ll speak again.
              </p>
              <p className="text-sm text-slate-500">
                In the meantime: What question will you be sitting with?
              </p>
            </motion.div>
          )}

          {status === 'retry_allowed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                One more chance
              </h3>
              <p className="text-slate-600 mb-4">
                We noticed something interesting in your response, but we&apos;d like
                to understand you better. Would you like to try again?
              </p>
              <button
                onClick={() => {
                  setStatus('pending');
                  setPath('choice');
                }}
                className="px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-all"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500">
          Philosophy for the curious, not the credentialed.
        </div>
      </footer>
    </div>
  );
}
