'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

type DoorChoice = 'know' | 'wonder' | null;

// Fog particle
interface FogParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  opacity: number;
  layer: number;
}

export default function DoorsGatePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const fogRef = useRef<FogParticle[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [selected, setSelected] = useState<DoorChoice>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredDoor, setHoveredDoor] = useState<DoorChoice>(null);

  // Atmospheric fog animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for light effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create fog particles
    const fog: FogParticle[] = [];
    const numFog = 80;

    for (let i = 0; i < numFog; i++) {
      fog.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 200 + 100,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.08 + 0.02,
        layer: Math.floor(Math.random() * 3),
      });
    }

    fogRef.current = fog;

    // Animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 0.016;

      // Clear
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Subtle central light
      const centralGradient = ctx.createRadialGradient(
        width / 2, height * 0.4, 0,
        width / 2, height * 0.4, height * 0.8
      );
      centralGradient.addColorStop(0, 'rgba(45, 212, 191, 0.04)');
      centralGradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.02)');
      centralGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = centralGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw fog layers
      fog.forEach((p) => {
        // Move
        p.x += p.speedX;

        // Wrap
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;

        // Wave motion
        const waveOffset = Math.sin(timeRef.current * 0.5 + p.x * 0.01) * 20;
        const drawY = p.y + waveOffset;

        // Draw fog blob
        const gradient = ctx.createRadialGradient(
          p.x, drawY, 0,
          p.x, drawY, p.size
        );
        const layerOpacity = p.opacity * (1 - p.layer * 0.2);
        gradient.addColorStop(0, `rgba(45, 212, 191, ${layerOpacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(30, 41, 59, ${layerOpacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse-following ethereal light
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseGradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      mouseGradient.addColorStop(0, 'rgba(45, 212, 191, 0.05)');
      mouseGradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.02)');
      mouseGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, width, height);

      // Ground fog effect
      const groundGradient = ctx.createLinearGradient(0, height * 0.7, 0, height);
      groundGradient.addColorStop(0, 'transparent');
      groundGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.3)');
      groundGradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, height * 0.7, width, height * 0.3);

      // Floating dust particles
      for (let i = 0; i < 30; i++) {
        const px = (i * 137.508 + timeRef.current * 20) % width;
        const py = (Math.sin(timeRef.current * 0.5 + i) * 0.5 + 0.5) * height;
        const dustOpacity = 0.2 + Math.sin(timeRef.current * 2 + i) * 0.1;

        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${dustOpacity})`;
        ctx.fill();
      }

      // Vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, height
      );
      vignetteGradient.addColorStop(0, 'transparent');
      vignetteGradient.addColorStop(1, 'rgba(15, 23, 42, 0.6)');
      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden relative">
      {/* Atmospheric Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#0f172a' }}
      />

      {/* Logo */}
      <header className="p-6 relative z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Doors */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 relative z-10">
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
              whileHover={!isTransitioning ? { scale: 1.03, y: -5 } : {}}
              onClick={() => handleSelect('know')}
              onMouseEnter={() => setHoveredDoor('know')}
              onMouseLeave={() => setHoveredDoor(null)}
              disabled={isTransitioning}
              className={`group relative w-64 h-80 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                selected === 'know'
                  ? 'border-teal-400 bg-teal-500/20'
                  : 'border-slate-600/50 hover:border-slate-500 bg-slate-900/30'
              }`}
            >
              {/* Door frame effect */}
              <div className="absolute inset-3 border border-slate-600/30 rounded-xl" />
              <div className="absolute inset-5 border border-slate-700/20 rounded-lg" />

              {/* Door handle */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="w-2 h-8 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full shadow-lg" />
                <div className="w-1 h-6 bg-slate-400/30 rounded-full absolute top-1 left-0.5" />
              </div>

              {/* Door light effect */}
              <motion.div
                animate={{
                  opacity: hoveredDoor === 'know' || selected === 'know' ? 0.8 : 0,
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
                }}
              />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p
                    className={`text-xl font-medium transition-colors duration-300 ${
                      selected === 'know' || hoveredDoor === 'know' ? 'text-teal-400' : 'text-white'
                    }`}
                  >
                    &ldquo;Know thyself&rdquo;
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredDoor === 'know' ? 0.6 : 0, y: hoveredDoor === 'know' ? 0 : 10 }}
                    className="text-slate-400 text-sm mt-2"
                  >
                    The Delphic maxim
                  </motion.p>
                </div>
              </div>

              {/* Glow effect on hover/select */}
              <motion.div
                animate={{
                  opacity: selected === 'know' ? 1 : hoveredDoor === 'know' ? 0.5 : 0,
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: '0 0 80px rgba(45, 212, 191, 0.4), inset 0 0 40px rgba(45, 212, 191, 0.1)',
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
              <div className="flex flex-col items-center gap-3">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
                <span>or</span>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
              </div>
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
              whileHover={!isTransitioning ? { scale: 1.03, y: -5 } : {}}
              onClick={() => handleSelect('wonder')}
              onMouseEnter={() => setHoveredDoor('wonder')}
              onMouseLeave={() => setHoveredDoor(null)}
              disabled={isTransitioning}
              className={`group relative w-64 h-80 rounded-2xl border-2 transition-all duration-500 backdrop-blur-sm ${
                selected === 'wonder'
                  ? 'border-teal-400 bg-teal-500/20'
                  : 'border-slate-600/50 hover:border-slate-500 bg-slate-900/30'
              }`}
            >
              {/* Door frame effect */}
              <div className="absolute inset-3 border border-slate-600/30 rounded-xl" />
              <div className="absolute inset-5 border border-slate-700/20 rounded-lg" />

              {/* Door handle */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <div className="w-2 h-8 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full shadow-lg" />
                <div className="w-1 h-6 bg-slate-400/30 rounded-full absolute top-1 left-0.5" />
              </div>

              {/* Door light effect */}
              <motion.div
                animate={{
                  opacity: hoveredDoor === 'wonder' || selected === 'wonder' ? 0.8 : 0,
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
                }}
              />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <p
                    className={`text-xl font-medium transition-colors duration-300 ${
                      selected === 'wonder' || hoveredDoor === 'wonder' ? 'text-teal-400' : 'text-white'
                    }`}
                  >
                    &ldquo;Wonder at all things&rdquo;
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredDoor === 'wonder' ? 0.6 : 0, y: hoveredDoor === 'wonder' ? 0 : 10 }}
                    className="text-slate-400 text-sm mt-2"
                  >
                    The Socratic spirit
                  </motion.p>
                </div>
              </div>

              {/* Glow effect on hover/select */}
              <motion.div
                animate={{
                  opacity: selected === 'wonder' ? 1 : hoveredDoor === 'wonder' ? 0.5 : 0,
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: '0 0 80px rgba(45, 212, 191, 0.4), inset 0 0 40px rgba(45, 212, 191, 0.1)',
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
