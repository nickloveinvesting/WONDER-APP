'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGateStore } from '../../store';
import { PhilosophicalSymbol } from '../../types';

const SYMBOLS: { symbol: PhilosophicalSymbol; display: string; name: string }[] = [
  { symbol: 'infinity', display: '∞', name: 'Infinity' },
  { symbol: 'phi', display: 'φ', name: 'Phi' },
  { symbol: 'delta', display: 'Δ', name: 'Delta' },
  { symbol: 'theta', display: 'θ', name: 'Theta' },
  { symbol: 'lambda', display: 'λ', name: 'Lambda' },
  { symbol: 'sigma', display: 'Σ', name: 'Sigma' },
  { symbol: 'omega', display: 'Ω', name: 'Omega' },
  { symbol: 'psi', display: 'ψ', name: 'Psi' }
];

export default function PuzzleOne() {
  const { completePuzzleOne, puzzleStates } = useGateStore();
  const [selectedSymbol, setSelectedSymbol] = useState<PhilosophicalSymbol | null>(null);
  const [hesitated, setHesitated] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [rotating, setRotating] = useState(false);
  
  // Track hesitation (waiting > 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHesitated(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSymbolSelect = async (symbol: PhilosophicalSymbol) => {
    if (isComplete) return;
    
    setSelectedSymbol(symbol);
    setRotating(true);
    
    // Success animation sequence
    setTimeout(() => {
      setRotating(false);
      setIsComplete(true);
    }, 500);
    
    // Complete puzzle
    setTimeout(() => {
      completePuzzleOne(symbol, hesitated);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-serif text-[#1a2942] mb-4">The Pattern</h2>
        <p className="text-[#1a2942]/70 max-w-md">
          Eight symbols surround an empty center. Which one completes the pattern?
        </p>
      </motion.div>
      
      <div className="relative w-96 h-96">
        {/* Symbol Grid - 3x3 with center empty */}
        <div className="grid grid-cols-3 gap-4 w-full h-full">
          {SYMBOLS.map((item, index) => {
            const isCenterPosition = index === 4; // Center of 3x3 grid
            
            if (isCenterPosition) {
              return (
                <motion.div
                  key="center"
                  className={`
                    flex items-center justify-center rounded-xl border-2 border-dashed
                    transition-all duration-300
                    ${isComplete ? 'bg-[#8b6f47] border-[#8b6f47]' : 'bg-[#faf6f0]/50 border-[#1a2942]/30'}
                  `}
                  data-empty="true"
                  initial={{ scale: 0.9 }}
                  animate={{
                    scale: isComplete ? [1, 1.2, 1] : 1,
                    backgroundColor: isComplete ? ['#faf6f0', '#8b6f47', '#8b6f47'] : '#faf6f0'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedSymbol && (
                    <motion.span
                      className="text-6xl text-white"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                    >
                      {SYMBOLS.find(s => s.symbol === selectedSymbol)?.display}
                    </motion.span>
                  )}
                </motion.div>
              );
            }
            
            return (
              <motion.button
                key={item.symbol}
                onClick={() => handleSymbolSelect(item.symbol)}
                disabled={isComplete}
                className={`
                  flex items-center justify-center rounded-xl border-2
                  transition-all duration-200
                  ${isComplete ? 'bg-[#faf6f0] border-[#1a2942]/10' : 'bg-[#faf6f0] border-[#1a2942]/20 hover:border-[#8b6f47] hover:bg-[#8b6f47]/10'}
                  ${selectedSymbol === item.symbol ? 'opacity-0' : 'opacity-100'}
                `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: selectedSymbol === item.symbol ? 0 : 1,
                  scale: 1,
                  rotate: rotating && !isComplete ? 360 : 0
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { delay: index * 0.05 },
                  rotate: { duration: 2, repeat: rotating ? Infinity : 0, ease: 'linear' }
                }}
                whileHover={{ scale: isComplete ? 1 : 1.05 }}
                whileTap={{ scale: isComplete ? 1 : 0.95 }}
              >
                <span className="text-5xl text-[#1a2942]">{item.display}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-2xl text-[#8b6f47] mb-2">✓</div>
          <p className="text-[#1a2942]/70">
            {hesitated ? 
              "Thoughtful. Sometimes the answer requires patience." :
              "Decisive. Trust in your instincts."}
          </p>
        </motion.div>
      )}
    </div>
  );
}
