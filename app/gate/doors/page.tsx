'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

type DoorChoice = 'know' | 'wonder' | null;

export default function DoorsGatePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<DoorChoice>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (choice: DoorChoice) => {
    if (isTransitioning) return;

    setSelected(choice);
    setIsTransitioning(true);

    // Store choice
    const existing = sessionStorage.getItem('wonderApplication');
    const data = existing ? JSON.parse(existing) : {};
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...data,
      doorChoice: choice,
      completedAt: new Date().toISOString(),
    }));

    // Navigate after animation
    setTimeout(() => {
      router.push('/gate/submitted');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Logo */}
      <header className="p-6">
        <Logo size="sm" variant="white" />
      </header>

      {/* Doors */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-4xl">
          {/* Question */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-white text-center mb-16"
          >
            Two paths lie before you.
          </motion.h1>

          {/* Doors */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center">
            {/* Door A - Know Thyself */}
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isTransitioning && selected !== 'know' ? 0 : 1,
                x: 0,
                scale: selected === 'know' ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={!isTransitioning ? { scale: 1.02 } : {}}
              onClick={() => handleSelect('know')}
              disabled={isTransitioning}
              className={`group relative w-64 h-80 rounded-2xl border-2 transition-all duration-500 ${
                selected === 'know'
                  ? 'border-teal-400 bg-teal-500/10'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
              }`}
            >
              {/* Door frame effect */}
              <div className="absolute inset-3 border border-slate-700/50 rounded-xl" />

              {/* Door handle */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-8 bg-slate-600 rounded-full" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p
                    className={`text-xl font-medium transition-colors duration-300 ${
                      selected === 'know' ? 'text-teal-400' : 'text-white'
                    }`}
                  >
                    &ldquo;Know thyself&rdquo;
                  </p>
                </div>
              </div>

              {/* Glow effect on hover/select */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                  selected === 'know' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
                style={{
                  boxShadow: '0 0 60px rgba(45, 212, 191, 0.3)',
                }}
              />
            </motion.button>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-600 text-sm hidden md:block"
            >
              or
            </motion.div>

            {/* Door B - Wonder at all things */}
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isTransitioning && selected !== 'wonder' ? 0 : 1,
                x: 0,
                scale: selected === 'wonder' ? 1.05 : 1,
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={!isTransitioning ? { scale: 1.02 } : {}}
              onClick={() => handleSelect('wonder')}
              disabled={isTransitioning}
              className={`group relative w-64 h-80 rounded-2xl border-2 transition-all duration-500 ${
                selected === 'wonder'
                  ? 'border-teal-400 bg-teal-500/10'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
              }`}
            >
              {/* Door frame effect */}
              <div className="absolute inset-3 border border-slate-700/50 rounded-xl" />

              {/* Door handle */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-8 bg-slate-600 rounded-full" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p
                    className={`text-xl font-medium transition-colors duration-300 ${
                      selected === 'wonder' ? 'text-teal-400' : 'text-white'
                    }`}
                  >
                    &ldquo;Wonder at all things&rdquo;
                  </p>
                </div>
              </div>

              {/* Glow effect on hover/select */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                  selected === 'wonder' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
                style={{
                  boxShadow: '0 0 60px rgba(45, 212, 191, 0.3)',
                }}
              />
            </motion.button>
          </div>

          {/* Subtle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-slate-600 text-sm text-center mt-12"
          >
            Choose.
          </motion.p>
        </div>
      </main>
    </div>
  );
}
