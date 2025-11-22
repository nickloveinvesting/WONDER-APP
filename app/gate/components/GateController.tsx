'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGateStore } from '../store';
import { ProgressIndicator } from './ProgressIndicator';
import { DevTools } from './DevTools';
import PuzzleOne from './PuzzleOne';
import PuzzleTwo from './PuzzleTwo';
import PuzzleThree from './PuzzleThree';

export function GateController() {
  const { currentPuzzle, devMode } = useGateStore();
  
  const renderPuzzle = () => {
    switch (currentPuzzle) {
      case 1:
        return <PuzzleOne />;
      case 2:
        return <PuzzleTwo />;
      case 3:
        return <PuzzleThree />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6f0] to-[#faf6f0]/80 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Indicator */}
        <ProgressIndicator />
        
        {/* Puzzle Content with Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPuzzle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {renderPuzzle()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dev Tools Overlay */}
      <DevTools />
    </div>
  );
}
