'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGateStore } from '../../store';
import { RingState } from '../../types';

const SOLUTION_ROTATIONS = [0, 120, 240]; // Solution alignment
const SOLUTION_TEXT = "Nothing Contains Everything";
const TOLERANCE = 15; // Degrees of tolerance for alignment

export default function PuzzleThree() {
  const { completePuzzleThree, updateAlignment, incrementAttempts, puzzleStates } = useGateStore();
  const [rings, setRings] = useState<RingState[]>(puzzleStates.puzzle3.rings);
  const [solution, setSolution] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const alignment = calculateAlignment(rings);
    updateAlignment(alignment);
    
    if (alignment > 0.95 && !isComplete) {
      triggerSolutionSequence();
    } else if (alignment > 0.8 && alignment <= 0.95) {
      // Close to solution - increment attempts
      if (rings.some(r => !r.locked)) {
        incrementAttempts();
      }
    }
  }, [rings, isComplete, updateAlignment, incrementAttempts]);
  
  const calculateAlignment = (currentRings: RingState[]): number => {
    let totalError = 0;
    
    currentRings.forEach((ring, index) => {
      const targetRotation = SOLUTION_ROTATIONS[index];
      const normalizedRotation = ((ring.rotation % 360) + 360) % 360;
      const error = Math.min(
        Math.abs(normalizedRotation - targetRotation),
        360 - Math.abs(normalizedRotation - targetRotation)
      );
      totalError += error;
    });
    
    const maxError = 360 * currentRings.length;
    return 1 - (totalError / maxError);
  };
  
  const triggerSolutionSequence = async () => {
    setIsComplete(true);
    
    // Lock all rings
    setRings(prev => prev.map(r => ({ ...r, locked: true })));
    
    // Show solution text after brief delay
    setTimeout(() => {
      setSolution(SOLUTION_TEXT);
    }, 500);
    
    // Complete puzzle
    setTimeout(() => {
      completePuzzleThree();
    }, 2500);
  };
  
  const handleRingRotate = (ringId: string, deltaRotation: number) => {
    setRings(prev => prev.map(ring =>
      ring.id === ringId
        ? { ...ring, rotation: ring.rotation + deltaRotation }
        : ring
    ));
  };
  
  const handleMouseDown = (ringId: string) => {
    if (!rings.find(r => r.id === ringId)?.locked) {
      setDragging(ringId);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    
    // Calculate rotation based on mouse movement
    const deltaRotation = e.movementX * 0.5;
    handleRingRotate(dragging, deltaRotation);
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[600px] px-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-serif text-[#1a2942] mb-4">The Paradox Locks</h2>
        <p className="text-[#1a2942]/70 max-w-md">
          Three interlocked rings. Align the symbols to unlock the truth.
        </p>
      </motion.div>
      
      {/* Borromean Rings */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        {rings.map((ring, index) => {
          const alignment = calculateAlignment(rings);
          const isGlowing = alignment > 0.8;
          
          return (
            <motion.div
              key={ring.id}
              className={`
                absolute w-64 h-64 rounded-full border-8
                ${ring.locked ? 'border-[#8b6f47]' : 'border-[#1a2942]'}
                cursor-pointer transition-all duration-200
              `}
              style={{
                transform: `rotate(${ring.rotation}deg)`,
                borderColor: isGlowing ? '#8b6f47' : '#1a2942',
                boxShadow: isGlowing ? '0 0 30px rgba(139, 111, 71, 0.4)' : 'none'
              }}
              onMouseDown={() => handleMouseDown(ring.id)}
              animate={{
                scale: dragging === ring.id ? 1.02 : 1,
              }}
              transition={{ duration: 0.1 }}
            >
              {/* Symbol at top of ring */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#faf6f0] rounded-full flex items-center justify-center border-2 border-[#1a2942] text-2xl"
                style={{
                  transform: `translateX(-50%) translateY(-50%) rotate(-${ring.rotation}deg)`
                }}
              >
                {ring.symbol}
              </div>
            </motion.div>
          );
        })}
        
        {/* Solution text in center */}
        {solution && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-serif text-[#8b6f47] text-center px-8">
              {solution}
            </p>
          </motion.div>
        )}
      </div>
      
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-2xl text-[#8b6f47] mb-2">✓</div>
          <p className="text-[#1a2942]/70">
            The paradox resolved. Welcome to WONDER.
          </p>
        </motion.div>
      )}
    </div>
  );
}
