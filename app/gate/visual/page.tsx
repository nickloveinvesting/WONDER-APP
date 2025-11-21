'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

interface Star {
  id: number;
  x: number;
  y: number;
  baseRadius: number;
  isKey: boolean;
  order: number;
  pulsePhase: number;
  pulseSpeed: number;
  hue: number;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  hue: number;
  alpha: number;
  pulsePhase: number;
}

export default function VisualGatePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nebulasRef = useRef<NebulaCloud[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const connectionsRef = useRef<{ from: number; to: number; progress: number }[]>([]);

  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; time: number }[]>([]);

  const KEY_SEQUENCE = [0, 1, 2, 3, 4, 5, 6];

  // Initialize the cosmic scene
  const initializeScene = useCallback((width: number, height: number) => {
    const stars: Star[] = [];

    // Key stars forming the constellation (subtle "W" for WONDER)
    const keyPositions = [
      { x: 0.12, y: 0.35 },
      { x: 0.22, y: 0.58 },
      { x: 0.35, y: 0.32 },
      { x: 0.5, y: 0.52 },
      { x: 0.65, y: 0.32 },
      { x: 0.78, y: 0.58 },
      { x: 0.88, y: 0.35 },
    ];

    // Add key stars with unique properties
    keyPositions.forEach((pos, i) => {
      stars.push({
        id: i,
        x: pos.x * width,
        y: pos.y * height,
        baseRadius: 3.5,
        isKey: true,
        order: i,
        pulsePhase: (i / keyPositions.length) * Math.PI * 2,
        pulseSpeed: 0.8 + Math.random() * 0.4,
        hue: 170 + Math.random() * 20, // Teal range
        twinkleOffset: Math.random() * 1000,
      });
    });

    // Add background stars with depth layers
    const layers = [
      { count: 40, minSize: 0.3, maxSize: 0.8, minBright: 0.1, maxBright: 0.25 }, // Far
      { count: 30, minSize: 0.8, maxSize: 1.5, minBright: 0.2, maxBright: 0.4 },  // Mid
      { count: 20, minSize: 1.5, maxSize: 2.5, minBright: 0.3, maxBright: 0.6 },  // Near
    ];

    let starId = keyPositions.length;
    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        let x: number = Math.random() * width;
        let y: number = Math.random() * height;
        let tooClose = true;
        let attempts = 0;

        while (tooClose && attempts < 100) {
          x = Math.random() * width;
          y = Math.random() * height;
          tooClose = stars.some(s => {
            const dist = Math.hypot(s.x - x, s.y - y);
            return s.isKey ? dist < 60 : dist < 20;
          });
          attempts++;
        }

        stars.push({
          id: starId++,
          x: x,
          y: y,
          baseRadius: layer.minSize + Math.random() * (layer.maxSize - layer.minSize),
          isKey: false,
          order: -1,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.5 + Math.random() * 1.5,
          hue: Math.random() > 0.7 ? 200 + Math.random() * 40 : 0, // Some blue-ish, most white
          twinkleOffset: Math.random() * 1000,
        });
      }
    });

    starsRef.current = stars;

    // Initialize nebula clouds
    const nebulas: NebulaCloud[] = [];
    for (let i = 0; i < 5; i++) {
      nebulas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 150 + Math.random() * 200,
        hue: 180 + Math.random() * 40, // Teal to cyan
        alpha: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    nebulasRef.current = nebulas;
  }, []);

  // Main animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#020617'); // slate-950
    gradient.addColorStop(0.5, '#0f172a'); // slate-900
    gradient.addColorStop(1, '#020617');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw nebula clouds
    nebulasRef.current.forEach(nebula => {
      const pulse = Math.sin(time / 3000 + nebula.pulsePhase) * 0.5 + 0.5;
      const grad = ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.radius * (0.8 + pulse * 0.4)
      );
      grad.addColorStop(0, `hsla(${nebula.hue}, 70%, 50%, ${nebula.alpha * (0.5 + pulse * 0.5)})`);
      grad.addColorStop(0.5, `hsla(${nebula.hue}, 60%, 30%, ${nebula.alpha * 0.3})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    });

    // Spawn occasional shooting stars
    if (Math.random() < 0.003 && shootingStarsRef.current.length < 3) {
      shootingStarsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.3,
        vx: 3 + Math.random() * 4,
        vy: 2 + Math.random() * 3,
        length: 50 + Math.random() * 100,
        life: 1,
      });
    }

    // Update and draw shooting stars
    shootingStarsRef.current = shootingStarsRef.current.filter(star => {
      star.x += star.vx;
      star.y += star.vy;
      star.life -= 0.02;

      if (star.life > 0) {
        const grad = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.vx * star.length / 5, star.y - star.vy * star.length / 5
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.life})`);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * star.length / 5, star.y - star.vy * star.length / 5);
        ctx.stroke();
      }

      return star.life > 0 && star.x < width && star.y < height;
    });

    // Draw connections with animated energy flow
    connectionsRef.current.forEach(conn => {
      const fromStar = starsRef.current.find(s => s.order === conn.from);
      const toStar = starsRef.current.find(s => s.order === conn.to);
      if (!fromStar || !toStar) return;

      // Animate progress
      if (conn.progress < 1) conn.progress += 0.05;

      const endX = fromStar.x + (toStar.x - fromStar.x) * conn.progress;
      const endY = fromStar.y + (toStar.y - fromStar.y) * conn.progress;

      // Glowing line
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(45, 212, 191, 0.8)';

      const lineGrad = ctx.createLinearGradient(fromStar.x, fromStar.y, endX, endY);
      lineGrad.addColorStop(0, 'rgba(45, 212, 191, 0.9)');
      lineGrad.addColorStop(1, 'rgba(45, 212, 191, 0.6)');

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(fromStar.x, fromStar.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Energy particles along the line
      const particleCount = Math.floor(conn.progress * 5);
      for (let i = 0; i < particleCount; i++) {
        const t = ((time / 500 + i * 0.2) % 1) * conn.progress;
        const px = fromStar.x + (toStar.x - fromStar.x) * t;
        const py = fromStar.y + (toStar.y - fromStar.y) * t;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }

      ctx.shadowBlur = 0;
    });

    // Draw stars
    starsRef.current.forEach(star => {
      const twinkle = Math.sin(time / (300 + star.twinkleOffset) + star.pulsePhase);
      const pulse = Math.sin(time / 1000 * star.pulseSpeed + star.pulsePhase);
      const isClicked = clickedStars.includes(star.order);
      const isNext = star.isKey && star.order === clickedStars.length;

      let radius = star.baseRadius;
      let alpha = 0.6;
      let glowRadius = 0;

      if (star.isKey) {
        radius = star.baseRadius * (1 + pulse * 0.15);
        alpha = 0.7 + pulse * 0.2;
        glowRadius = 8 + pulse * 4;

        if (isNext && (showHint || clickedStars.length > 0)) {
          radius = star.baseRadius * (1.3 + pulse * 0.2);
          alpha = 0.9 + pulse * 0.1;
          glowRadius = 15 + pulse * 8;
        }

        if (isClicked) {
          radius = star.baseRadius * 1.8;
          alpha = 1;
          glowRadius = 25 + pulse * 10;
        }

        // Draw glow halo
        const glowGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
        glowGrad.addColorStop(0, `hsla(${star.hue}, 80%, 60%, ${isClicked ? 0.6 : 0.2})`);
        glowGrad.addColorStop(0.5, `hsla(${star.hue}, 70%, 50%, ${isClicked ? 0.2 : 0.05})`);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw star core
        ctx.shadowBlur = isClicked ? 20 : 10;
        ctx.shadowColor = `hsla(${star.hue}, 80%, 70%, 0.8)`;
        ctx.fillStyle = isClicked
          ? `hsla(${star.hue}, 80%, 80%, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
      } else {
        // Background star with twinkle
        radius = star.baseRadius * (1 + twinkle * 0.3);
        alpha = 0.3 + twinkle * 0.2 + pulse * 0.1;

        if (star.hue > 0) {
          ctx.fillStyle = `hsla(${star.hue}, 60%, 80%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Add subtle cross-flare to brighter stars
      if (star.isKey || star.baseRadius > 1.8) {
        const flareAlpha = star.isKey ? (isClicked ? 0.4 : 0.15) : 0.1;
        const flareLength = star.isKey ? (isClicked ? 20 : 10) : 6;

        ctx.strokeStyle = `rgba(255, 255, 255, ${flareAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - flareLength, star.y);
        ctx.lineTo(star.x + flareLength, star.y);
        ctx.moveTo(star.x, star.y - flareLength);
        ctx.lineTo(star.x, star.y + flareLength);
        ctx.stroke();
      }
    });

    // Draw floating particles near mouse
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Spawn particles near mouse
    if (mx && my && Math.random() < 0.3) {
      particlesRef.current.push({
        x: mx + (Math.random() - 0.5) * 100,
        y: my + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.5 - 0.2,
        life: 1,
        maxLife: 1,
        size: Math.random() * 2 + 0.5,
        hue: 170 + Math.random() * 30,
      });
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.015;

      if (p.life > 0) {
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      return p.life > 0;
    });

    // Keep particles manageable
    if (particlesRef.current.length > 50) {
      particlesRef.current = particlesRef.current.slice(-50);
    }

    // Draw click ripples
    ripples.forEach((ripple, i) => {
      const age = (time - ripple.time) / 1000;
      if (age < 1) {
        const radius = age * 50;
        const alpha = 1 - age;
        ctx.strokeStyle = `rgba(45, 212, 191, ${alpha * 0.5})`;
        ctx.lineWidth = 2 - age * 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Completion effect - aurora overlay
    if (isComplete) {
      const completeGrad = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.6
      );
      const pulse = Math.sin(time / 500) * 0.5 + 0.5;
      completeGrad.addColorStop(0, `rgba(45, 212, 191, ${0.1 + pulse * 0.05})`);
      completeGrad.addColorStop(0.5, `rgba(56, 189, 248, ${0.05 + pulse * 0.03})`);
      completeGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = completeGrad;
      ctx.fillRect(0, 0, width, height);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [clickedStars, showHint, isComplete, ripples]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple effect
    setRipples(prev => [...prev.slice(-5), { x, y, time: performance.now() }]);

    // Find clicked star
    const clickedStar = starsRef.current.find(star => {
      if (!star.isKey) return false;
      const dist = Math.hypot(star.x - x, star.y - y);
      return dist < 25;
    });

    if (!clickedStar) return;

    const nextExpected = clickedStars.length;

    if (clickedStar.order === nextExpected) {
      const newClicked = [...clickedStars, clickedStar.order];
      setClickedStars(newClicked);

      if (newClicked.length > 1) {
        connectionsRef.current.push({
          from: newClicked[newClicked.length - 2],
          to: clickedStar.order,
          progress: 0,
        });
      }

      if (newClicked.length === KEY_SEQUENCE.length) {
        setIsComplete(true);
        sessionStorage.setItem('gateVisualComplete', 'true');
        setTimeout(() => router.push('/gate/wonder'), 2500);
      }
    }
  }, [clickedStars, isComplete, router, KEY_SEQUENCE.length]);

  // Setup
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initializeScene(dimensions.width, dimensions.height);
    }
  }, [dimensions, initializeScene]);

  useEffect(() => {
    if (dimensions.width) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, dimensions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickedStars.length === 0) setShowHint(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [clickedStars]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <header className="absolute top-0 left-0 p-6 z-10">
        <Logo size="sm" variant="white" />
      </header>

      <div ref={containerRef} className="flex-1 relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          className="absolute inset-0"
        />

        <AnimatePresence>
          {clickedStars.length === 0 && !isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-slate-500 text-sm tracking-wide">
                Find the pattern in the stars.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {clickedStars.length > 0 && !isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {KEY_SEQUENCE.map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: i < clickedStars.length ? 1 : 0.8,
                  backgroundColor: i < clickedStars.length ? '#2dd4bf' : '#334155',
                }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.p
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl font-light text-teal-400 text-center tracking-wide"
              >
                You see what others miss.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
