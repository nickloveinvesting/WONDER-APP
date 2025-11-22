'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import { Check, Eye } from 'lucide-react';

// The Reflection Paradox - Find the differences between two philosophical scenes
// This tests attention to detail and rewards careful observation

interface Difference {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  found: boolean;
  hint: string;
}

const DIFFERENCES: Difference[] = [
  { id: '1', x: 25, y: 30, found: false, hint: 'The book title differs' },
  { id: '2', x: 75, y: 45, found: false, hint: 'The shadow direction' },
  { id: '3', x: 50, y: 70, found: false, hint: 'A missing symbol' },
  { id: '4', x: 15, y: 60, found: false, hint: 'The candle flame' },
  { id: '5', x: 85, y: 25, found: false, hint: 'The window reflection' },
];

const REQUIRED_DIFFERENCES = 3; // Find at least 3 to proceed

export default function WonderGatePage() {
  const router = useRouter();
  const [differences, setDifferences] = useState(DIFFERENCES);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [response, setResponse] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const foundCount = differences.filter(d => d.found).length;

  useEffect(() => {
    if (foundCount >= REQUIRED_DIFFERENCES) {
      setIsComplete(true);
      if (textareaRef.current) {
        setTimeout(() => textareaRef.current?.focus(), 500);
      }
    }
  }, [foundCount]);

  // Show hint after 5 wrong attempts
  useEffect(() => {
    if (attempts >= 5 && !showHint) {
      setShowHint(true);
    }
  }, [attempts, showHint]);

  const handleClick = (side: 'left' | 'right', x: number, y: number) => {
    if (isComplete) return;

    setSelectedSide(side);
    setAttempts(prev => prev + 1);

    // Check if click is near any unfound difference (within 12% radius)
    const clickRadius = 12;
    const found = differences.find(
      d => !d.found && Math.abs(d.x - x) < clickRadius && Math.abs(d.y - y) < clickRadius
    );

    if (found) {
      setDifferences(prev =>
        prev.map(d => (d.id === found.id ? { ...d, found: true } : d))
      );
    }
  };

  const handleSubmit = async () => {
    if (!response.trim() || !isComplete) return;

    // Store response
    const existing = sessionStorage.getItem('wonderApplication');
    const data = existing ? JSON.parse(existing) : {};
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...data,
      wonderResponse: response,
      differencesFound: foundCount,
      attempts: attempts,
      wonderCompletedAt: new Date().toISOString(),
    }));

    router.push('/gate/doors');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <header className="p-6 relative z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-10 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
              The <span className="text-teal-400 font-medium">Reflection</span> Paradox
            </h1>
            <p className="text-slate-400 text-lg">
              Two scenes. Same moment. What makes them different?
            </p>
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-slate-500" />
              <span className="text-slate-400">
                Found: <span className="text-teal-400 font-bold">{foundCount}</span>
                <span className="text-slate-600">/{REQUIRED_DIFFERENCES} needed</span>
              </span>
            </div>
            {showHint && !isComplete && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-amber-400 text-sm"
              >
                Hint: Look for subtle differences in objects and shadows
              </motion.span>
            )}
          </motion.div>

          {/* The two scenes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {/* Left scene */}
            <div
              className={`relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden cursor-crosshair border-2 transition-colors ${
                selectedSide === 'left' ? 'border-teal-500' : 'border-slate-700'
              }`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                handleClick('left', x, y);
              }}
            >
              {/* Scene: A philosopher's study */}
              <div className="absolute inset-0 p-4">
                {/* Desk */}
                <div className="absolute bottom-[20%] left-[10%] w-[80%] h-[15%] bg-gradient-to-b from-amber-900 to-amber-950 rounded" />

                {/* Book on desk */}
                <div className="absolute bottom-[35%] left-[20%] w-[20%] h-[12%] bg-red-900 rounded-sm transform -rotate-6">
                  <div className="absolute top-1 left-1 right-1 h-1 bg-amber-200 opacity-50" />
                  <span className="absolute top-3 left-2 text-[8px] text-amber-100 font-serif">TRUTH</span>
                </div>

                {/* Candle */}
                <div className="absolute bottom-[35%] right-[25%]">
                  <div className="w-3 h-10 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-amber-400 rounded-full blur-sm"
                  />
                </div>

                {/* Window */}
                <div className="absolute top-[10%] right-[10%] w-[25%] h-[35%] border-2 border-slate-600 rounded">
                  <div className="absolute inset-1 bg-gradient-to-br from-slate-700 to-slate-800">
                    {/* Moon reflection */}
                    <div className="absolute top-2 right-2 w-4 h-4 bg-slate-400 rounded-full opacity-60" />
                  </div>
                </div>

                {/* Owl symbol on wall */}
                <div className="absolute top-[15%] left-[12%] text-2xl opacity-40">🦉</div>

                {/* Shadow from candle - goes LEFT */}
                <div className="absolute bottom-[20%] right-[30%] w-[15%] h-[8%] bg-slate-950 opacity-30 blur-sm transform -skew-x-12" />
              </div>

              {/* Found indicators */}
              {differences.map(d => d.found && (
                <motion.div
                  key={d.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute w-8 h-8 -ml-4 -mt-4 border-2 border-teal-400 rounded-full flex items-center justify-center"
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                >
                  <Check size={16} className="text-teal-400" />
                </motion.div>
              ))}

              <div className="absolute bottom-2 left-2 text-xs text-slate-500 font-mono">SCENE A</div>
            </div>

            {/* Right scene (with differences) */}
            <div
              className={`relative aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden cursor-crosshair border-2 transition-colors ${
                selectedSide === 'right' ? 'border-teal-500' : 'border-slate-700'
              }`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                handleClick('right', x, y);
              }}
            >
              {/* Scene: Same study with differences */}
              <div className="absolute inset-0 p-4">
                {/* Desk */}
                <div className="absolute bottom-[20%] left-[10%] w-[80%] h-[15%] bg-gradient-to-b from-amber-900 to-amber-950 rounded" />

                {/* Book on desk - DIFFERENCE 1: Different title */}
                <div className="absolute bottom-[35%] left-[20%] w-[20%] h-[12%] bg-red-900 rounded-sm transform -rotate-6">
                  <div className="absolute top-1 left-1 right-1 h-1 bg-amber-200 opacity-50" />
                  <span className="absolute top-3 left-2 text-[8px] text-amber-100 font-serif">WISDOM</span>
                </div>

                {/* Candle - DIFFERENCE 4: Flame is smaller */}
                <div className="absolute bottom-[35%] right-[25%]">
                  <div className="w-3 h-10 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm" />
                  <motion.div
                    animate={{ scale: [0.6, 0.8, 0.6], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-amber-400 rounded-full blur-sm"
                  />
                </div>

                {/* Window - DIFFERENCE 5: Moon position */}
                <div className="absolute top-[10%] right-[10%] w-[25%] h-[35%] border-2 border-slate-600 rounded">
                  <div className="absolute inset-1 bg-gradient-to-br from-slate-700 to-slate-800">
                    {/* Moon reflection - different position */}
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-slate-400 rounded-full opacity-60" />
                  </div>
                </div>

                {/* DIFFERENCE 3: Missing owl symbol */}
                {/* Owl removed */}

                {/* Shadow - DIFFERENCE 2: Goes RIGHT instead */}
                <div className="absolute bottom-[20%] left-[45%] w-[15%] h-[8%] bg-slate-950 opacity-30 blur-sm transform skew-x-12" />
              </div>

              {/* Found indicators */}
              {differences.map(d => d.found && (
                <motion.div
                  key={d.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute w-8 h-8 -ml-4 -mt-4 border-2 border-teal-400 rounded-full flex items-center justify-center"
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                >
                  <Check size={16} className="text-teal-400" />
                </motion.div>
              ))}

              <div className="absolute bottom-2 left-2 text-xs text-slate-500 font-mono">SCENE B</div>
            </div>
          </motion.div>

          {/* Completion state */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-400"
                  >
                    <Check size={18} />
                    <span>Keen observation. You see what others miss.</span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-lg mx-auto"
                >
                  <p className="text-slate-400 mb-4 text-lg">
                    What do you <span className="italic text-teal-400">not</span> know?
                  </p>

                  <textarea
                    ref={textareaRef}
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Speak your uncertainty..."
                    rows={3}
                    className={`w-full px-5 py-4 bg-slate-900/60 backdrop-blur-sm border rounded-xl text-white placeholder-slate-600 outline-none transition-all resize-none ${
                      isFocused
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                        : 'border-slate-700'
                    }`}
                  />

                  <AnimatePresence>
                    {response.trim() && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-medium rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25"
                      >
                        Continue
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions when not complete */}
          {!isComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-slate-500 text-sm"
            >
              Click on the differences between the two scenes
            </motion.p>
          )}
        </div>
      </main>
    </div>
  );
}
