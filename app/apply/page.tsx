'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

export default function ApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Store in sessionStorage for the gate flow
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...formData,
      startedAt: new Date().toISOString(),
    }));

    // Brief delay for feel
    await new Promise(resolve => setTimeout(resolve, 300));

    router.push('/gate/visual');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Logo */}
      <header className="p-6">
        <Logo size="sm" variant="white" />
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Apply to WONDER
          </h1>
          <p className="text-slate-400 mb-8">
            A few questions await. Take your time.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                placeholder="How should we address you?"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-slate-300 mb-2">
                How did you find us?
                <span className="text-slate-500 font-normal ml-1">(optional)</span>
              </label>
              <input
                type="text"
                id="source"
                value={formData.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                placeholder="A friend, Twitter, a dream..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email}
              className="w-full mt-8 px-6 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Continue <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
