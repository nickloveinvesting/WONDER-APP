'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGateStore } from '../store';

export function DevTools() {
  const { devMode, skipPuzzle, autoComplete, setPuzzle, currentPuzzle, metrics, puzzleStates } = useGateStore();
  const [showPanel, setShowPanel] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  
  useEffect(() => {
    if (!devMode) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 's':
            e.preventDefault();
            skipPuzzle();
            break;
          case 'a':
            e.preventDefault();
            autoComplete();
            break;
          case 'd':
            e.preventDefault();
            setShowPanel(prev => !prev);
            break;
          case '1':
          case '2':
          case '3':
            e.preventDefault();
            setPuzzle(parseInt(e.key) as 1 | 2 | 3);
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [devMode, skipPuzzle, autoComplete, setPuzzle]);
  
  if (!devMode) return null;
  
  return (
    <AnimatePresence>
      {showPanel && (
        <motion.div
          className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg z-50 min-w-[250px]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Dev Tools</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="text-white/60 hover:text-white text-xs"
            >
              [Ctrl+D]
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="text-white/60 mb-2">
              Current Puzzle: {currentPuzzle}
            </div>
            
            <button
              onClick={skipPuzzle}
              className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-colors"
            >
              [Ctrl+S] Skip Puzzle →
            </button>
            
            <button
              onClick={autoComplete}
              className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-colors"
            >
              [Ctrl+A] Auto-Complete
            </button>
            
            <div className="border-t border-white/20 pt-2 mt-2">
              <p className="mb-2 text-white/80">Jump to puzzle:</p>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setPuzzle(n as 1 | 2 | 3)}
                    className={`
                      flex-1 px-3 py-2 rounded transition-colors
                      ${currentPuzzle === n ? 'bg-[#8b6f47] text-white' : 'bg-white/10 hover:bg-white/20'}
                    `}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-2 mt-2">
              <button
                onClick={() => setShowMetrics(!showMetrics)}
                className="w-full text-left text-white/80 hover:text-white"
              >
                {showMetrics ? '▼' : '▶'} Metrics
              </button>
              
              {showMetrics && (
                <div className="mt-2 space-y-1 text-xs text-white/60">
                  <div>Rotations: {metrics.totalRotations}</div>
                  <div>Hesitations: {metrics.totalHesitations}</div>
                  <div>Puzzle 1: {puzzleStates.puzzle1.completed ? '✓' : '○'}</div>
                  <div>Puzzle 2: {puzzleStates.puzzle2.completed ? '✓' : '○'}</div>
                  <div>Puzzle 3: {puzzleStates.puzzle3.completed ? '✓' : '○'}</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
