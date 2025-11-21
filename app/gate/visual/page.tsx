'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

interface Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  isKey: boolean;
  order: number; // -1 for non-key stars, 0-6 for key stars (WONDER pattern)
  pulsePhase: number;
  brightness: number;
}

interface Connection {
  from: number;
  to: number;
}

export default function VisualGatePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // The key star sequence (forms a constellation pattern)
  const KEY_SEQUENCE = [0, 1, 2, 3, 4, 5, 6]; // 7 stars for WONDER + 1

  // Initialize stars
  const initializeStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const keyStarCount = 7;
    const backgroundStarCount = 60;

    // Create key stars in a meaningful pattern (abstract constellation)
    // Positioned to form a subtle "W" or wonder-like shape
    const keyPositions = [
      { x: 0.15, y: 0.3 },  // 0
      { x: 0.25, y: 0.6 },  // 1
      { x: 0.35, y: 0.35 }, // 2
      { x: 0.5, y: 0.55 },  // 3
      { x: 0.65, y: 0.35 }, // 4
      { x: 0.75, y: 0.6 },  // 5
      { x: 0.85, y: 0.3 },  // 6
    ];

    // Add key stars
    keyPositions.forEach((pos, i) => {
      stars.push({
        id: i,
        x: pos.x * width,
        y: pos.y * height,
        radius: 4,
        isKey: true,
        order: i,
        pulsePhase: Math.random() * Math.PI * 2,
        brightness: 0.8,
      });
    });

    // Add background stars
    for (let i = 0; i < backgroundStarCount; i++) {
      let x, y;
      let tooClose = true;
      let attempts = 0;

      // Ensure background stars aren't too close to key stars
      while (tooClose && attempts < 50) {
        x = Math.random() * width;
        y = Math.random() * height;
        tooClose = stars.some(s => {
          const dist = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);
          return dist < 40;
        });
        attempts++;
      }

      stars.push({
        id: keyStarCount + i,
        x: x!,
        y: y!,
        radius: Math.random() * 1.5 + 0.5,
        isKey: false,
        order: -1,
        pulsePhase: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.3 + 0.1,
      });
    }

    starsRef.current = stars;
  }, []);

  // Animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw connections
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2dd4bf';

    connectionsRef.current.forEach(conn => {
      const fromStar = starsRef.current.find(s => s.order === conn.from);
      const toStar = starsRef.current.find(s => s.order === conn.to);
      if (fromStar && toStar) {
        ctx.beginPath();
        ctx.moveTo(fromStar.x, fromStar.y);
        ctx.lineTo(toStar.x, toStar.y);
        ctx.stroke();
      }
    });

    ctx.shadowBlur = 0;

    // Draw stars
    starsRef.current.forEach(star => {
      const pulse = Math.sin(time / 1000 + star.pulsePhase);
      const isClicked = clickedStars.includes(star.order);
      const isNextInSequence = star.isKey && star.order === clickedStars.length;

      let alpha = star.brightness;
      let radius = star.radius;

      if (star.isKey) {
        // Key stars pulse more noticeably
        alpha = 0.6 + pulse * 0.2;
        radius = star.radius + pulse * 0.5;

        // Hint: next star in sequence pulses stronger
        if (isNextInSequence && showHint) {
          alpha = 0.8 + pulse * 0.2;
          radius = star.radius + 1 + pulse;
        }

        // Clicked stars glow
        if (isClicked) {
          alpha = 1;
          radius = star.radius + 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#2dd4bf';
        }
      } else {
        // Background stars twinkle subtly
        alpha = star.brightness + pulse * 0.05;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);

      if (star.isKey) {
        ctx.fillStyle = isClicked
          ? `rgba(45, 212, 191, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }

      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw completion glow
    if (isComplete) {
      ctx.fillStyle = 'rgba(45, 212, 191, 0.1)';
      ctx.fillRect(0, 0, width, height);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [clickedStars, showHint, isComplete]);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked star
    const clickedStar = starsRef.current.find(star => {
      if (!star.isKey) return false;
      const dist = Math.sqrt((star.x - x) ** 2 + (star.y - y) ** 2);
      return dist < 20; // Click radius
    });

    if (!clickedStar) return;

    // Check if this is the next star in sequence
    const nextExpected = clickedStars.length;

    if (clickedStar.order === nextExpected) {
      const newClicked = [...clickedStars, clickedStar.order];
      setClickedStars(newClicked);

      // Add connection
      if (newClicked.length > 1) {
        connectionsRef.current.push({
          from: newClicked[newClicked.length - 2],
          to: clickedStar.order,
        });
      }

      // Check for completion
      if (newClicked.length === KEY_SEQUENCE.length) {
        setIsComplete(true);
        // Store progress and navigate after delay
        sessionStorage.setItem('gateVisualComplete', 'true');
        setTimeout(() => {
          router.push('/gate/wonder');
        }, 2000);
      }
    } else if (clickedStar.order < nextExpected) {
      // Already clicked - do nothing
    } else {
      // Wrong order - subtle feedback (could reset or just ignore)
      // For now, just ignore wrong clicks
    }
  }, [clickedStars, isComplete, router]);

  // Setup canvas and resize handler
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize stars when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeStars(dimensions.width, dimensions.height);
    }
  }, [dimensions, initializeStars]);

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  // Show hint after 10 seconds of no progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickedStars.length === 0) {
        setShowHint(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [clickedStars]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Logo */}
      <header className="absolute top-0 left-0 p-6 z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 relative cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onClick={handleCanvasClick}
          className="absolute inset-0"
        />

        {/* Subtle instruction */}
        <AnimatePresence>
          {clickedStars.length === 0 && !isComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-sm"
            >
              Look closely.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        {clickedStars.length > 0 && !isComplete && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {KEY_SEQUENCE.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < clickedStars.length
                    ? 'bg-teal-400'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        )}

        {/* Completion message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-teal-400 text-xl font-medium"
                >
                  You see what others miss.
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
