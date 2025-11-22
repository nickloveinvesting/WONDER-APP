'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGateStore } from '../../store';
import { ShadowShape } from '../../types';
import PenroseTriangle from './PenroseTriangle';

const TARGET_SHAPES: ShadowShape[] = ['circle', 'square', 'triangle'];

export default function PuzzleTwo() {
  const { completePuzzleTwo, recordRotation, addShadowMatch, puzzleStates } = useGateStore();
  const [currentMatch, setCurrentMatch] = useState<ShadowShape | null>(null);
  const [foundShapes, setFoundShapes] = useState<Set<ShadowShape>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Check if all shapes found
    if (foundShapes.size === 3 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        completePuzzleTwo();
      }, 1500);
    }
  }, [foundShapes, isComplete, completePuzzleTwo]);
  
  const handleShapeMatch = (shape: ShadowShape) => {
    if (!foundShapes.has(shape)) {
      setFoundShapes(prev => new Set([...prev, shape]));
      addShadowMatch(shape);
    }
    setCurrentMatch(shape);
  };
  
  const handleRotate = () => {
    recordRotation();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-serif text-[#1a2942] mb-4">The Perspective</h2>
        <p className="text-[#1a2942]/70 max-w-md">
          Rotate the impossible triangle. Find all three shadow shapes.
        </p>
      </motion.div>
      
      {/* 3D Canvas */}
      <div className="w-full max-w-lg h-96 bg-gradient-to-br from-[#faf6f0] to-[#faf6f0]/50 rounded-xl relative overflow-hidden border-2 border-[#1a2942]/10">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full text-[#1a2942]/50">
            Loading 3D view...
          </div>
        }>
          <Canvas
            shadows
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            
            <PenroseTriangle
              onShapeMatch={handleShapeMatch}
              onRotate={handleRotate}
            />
            
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              rotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Target Shapes */}
      <div className="flex gap-4 justify-center mt-8">
        {TARGET_SHAPES.map(shape => {
          const isFound = foundShapes.has(shape);
          const isCurrent = currentMatch === shape;
          
          return (
            <motion.div
              key={shape}
              className={`
                w-20 h-20 border-2 rounded-lg flex items-center justify-center
                transition-all duration-300
                ${isFound ? 'border-[#8b6f47] bg-[#8b6f47]/10' : 'border-[#1a2942]/20 bg-[#faf6f0]'}
                ${isCurrent && !isFound ? 'border-[#8b6f47]/50' : ''}
              `}
              animate={{
                scale: isCurrent ? [1, 1.05, 1] : 1,
                boxShadow: isCurrent && !isFound ? '0 0 30px rgba(139, 111, 71, 0.3)' : 'none'
              }}
            >
              {isFound && <span className="text-2xl text-[#8b6f47]">✓</span>}
              {!isFound && (
                <div className="text-[#1a2942]/40 text-sm font-medium uppercase">
                  {shape}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-2xl text-[#8b6f47] mb-2">✓</div>
          <p className="text-[#1a2942]/70">
            Multiple perspectives, one truth.
          </p>
        </motion.div>
      )}
    </div>
  );
}
