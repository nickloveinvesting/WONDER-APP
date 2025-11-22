'use client';

import { motion } from 'framer-motion';
import { useGateStore } from '../store';

export function ProgressIndicator() {
  const { currentPuzzle, puzzleStates } = useGateStore();
  
  const puzzles = [
    { id: 1, name: 'The Pattern', completed: puzzleStates.puzzle1.completed },
    { id: 2, name: 'The Perspective', completed: puzzleStates.puzzle2.completed },
    { id: 3, name: 'The Paradox', completed: puzzleStates.puzzle3.completed }
  ];
  
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {puzzles.map((puzzle, index) => (
        <div key={puzzle.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center font-bold
                ${currentPuzzle === puzzle.id ? 'bg-[#8b6f47] text-white' : ''}
                ${puzzle.completed ? 'bg-[#8b6f47] text-white' : 'bg-[#faf6f0] border-2 border-[#1a2942] text-[#1a2942]'}
              `}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {puzzle.completed ? '✓' : puzzle.id}
            </motion.div>
            <span className="text-xs text-[#1a2942] mt-2">{puzzle.name}</span>
          </div>
          
          {index < puzzles.length - 1 && (
            <motion.div
              className={`w-16 h-0.5 mx-2 ${puzzle.completed ? 'bg-[#8b6f47]' : 'bg-[#1a2942]/20'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: puzzle.completed ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
