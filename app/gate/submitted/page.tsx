'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

// Rising particle for celebration effect
interface RisingParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
}

export default function SubmittedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<RisingParticle[]>([]);
  const timeRef = useRef(0);

  const [applicantName, setApplicantName] = useState<string>('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Get stored application data
    const stored = sessionStorage.getItem('wonderApplication');
    if (stored) {
      const data = JSON.parse(stored);
      setApplicantName(data.name || '');

      // In production, submit the full application to the API here
      // fetch('/api/gate/submit', { method: 'POST', body: stored });
    }

    // Delay content appearance for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Celebration animation
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

    // Create rising particles
    const particles: RisingParticle[] = [];
    const createParticle = () => {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.02 + 0.01,
      });
    };

    // Initial particles
    for (let i = 0; i < 40; i++) {
      const p: RisingParticle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.02 + 0.01,
      };
      particles.push(p);
    }

    particlesRef.current = particles;

    // Add new particles periodically
    const particleInterval = setInterval(createParticle, 200);

    // Animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 0.016;

      // Clear
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Central glow
      const centralGlow = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.min(width, height) * 0.5
      );
      centralGlow.addColorStop(0, 'rgba(45, 212, 191, 0.08)');
      centralGlow.addColorStop(0.5, 'rgba(45, 212, 191, 0.03)');
      centralGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centralGlow;
      ctx.fillRect(0, 0, width, height);

      // Pulsing rings
      for (let ring = 0; ring < 4; ring++) {
        const ringPhase = timeRef.current * 0.5 - ring * 0.5;
        const ringExpansion = (ringPhase % 3) / 3;
        const ringRadius = ringExpansion * Math.min(width, height) * 0.6;
        const ringOpacity = 0.1 * (1 - ringExpansion);

        if (ringRadius > 0) {
          ctx.strokeStyle = `rgba(45, 212, 191, ${ringOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw and update particles
      particlesRef.current = particles.filter(p => {
        // Move up
        p.y -= p.speed;

        // Drift side to side
        p.drift += p.driftSpeed;
        const driftX = Math.sin(p.drift) * 30;

        // Remove if off screen
        if (p.y < -20) return false;

        // Fade based on position
        const fadeProgress = p.y / height;
        const currentOpacity = p.opacity * (0.3 + fadeProgress * 0.7);

        // Draw particle with glow
        const drawX = p.x + driftX;

        // Glow
        const glowGradient = ctx.createRadialGradient(
          drawX, p.y, 0,
          drawX, p.y, p.size * 5
        );
        glowGradient.addColorStop(0, `rgba(45, 212, 191, ${currentOpacity * 0.3})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(drawX - p.size * 5, p.y - p.size * 5, p.size * 10, p.size * 10);

        // Core
        ctx.beginPath();
        ctx.arc(drawX, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${currentOpacity})`;
        ctx.fill();

        return true;
      });

      // Ambient corner glows
      const cornerGlow1 = ctx.createRadialGradient(0, height, 0, 0, height, width * 0.4);
      cornerGlow1.addColorStop(0, 'rgba(45, 212, 191, 0.03)');
      cornerGlow1.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGlow1;
      ctx.fillRect(0, 0, width, height);

      const cornerGlow2 = ctx.createRadialGradient(width, 0, 0, width, 0, width * 0.4);
      cornerGlow2.addColorStop(0, 'rgba(45, 212, 191, 0.02)');
      cornerGlow2.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGlow2;
      ctx.fillRect(0, 0, width, height);

      // Subtle vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(particleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Celebration Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#0f172a' }}
      />

      {/* Logo */}
      <header className="p-6 relative z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Confirmation */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 relative z-10">
        <div className="text-center max-w-md">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: showContent ? 1 : 0, opacity: showContent ? 1 : 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            {/* Outer ring glow */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 40px rgba(45, 212, 191, 0.4)',
              }}
            />

            {/* Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-500" />

            {/* Inner glow */}
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)',
              }}
            />

            {/* Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: showContent ? 1 : 0, opacity: showContent ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-12 h-12 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: showContent ? 1 : 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h1 className="text-2xl md:text-3xl font-light text-white mb-4">
              We&apos;ve received your application
              {applicantName && (
                <span className="text-teal-400">, {applicantName}</span>
              )}
              .
            </h1>

            <p className="text-slate-400 mb-8 leading-relaxed">
              We&apos;ll be in touch soon.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 0.5 : 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-slate-500 text-sm italic"
            >
              In the meantime, sit with your questions.
            </motion.p>
          </motion.div>

          {/* Decorative orbital ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: showContent ? 0.1 : 0, scale: showContent ? 1 : 0.8, rotate: 360 }}
            transition={{
              opacity: { delay: 0.8, duration: 1 },
              scale: { delay: 0.8, duration: 1 },
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div
              className="w-80 h-80 rounded-full border border-teal-500/20"
              style={{
                borderWidth: '1px',
                borderStyle: 'dashed',
              }}
            />
          </motion.div>

          {/* Second orbital */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: showContent ? 0.05 : 0, scale: showContent ? 1 : 0.8, rotate: -360 }}
            transition={{
              opacity: { delay: 1, duration: 1 },
              scale: { delay: 1, duration: 1 },
              rotate: { duration: 90, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-96 h-96 rounded-full border border-teal-500/10" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
