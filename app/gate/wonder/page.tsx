'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

const WAIT_TIME = 60; // seconds

// Ripple effect
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function WonderGatePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const timeRef = useRef(0);

  const [seconds, setSeconds] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev >= WAIT_TIME) {
          clearInterval(interval);
          setIsReady(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Focus textarea when ready
  useEffect(() => {
    if (isReady && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isReady]);

  // Meditative animation
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

    // Create automatic ripples periodically
    const createRipple = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ripplesRef.current.push({
        x: width * 0.5 + (Math.random() - 0.5) * width * 0.3,
        y: height * 0.5 + (Math.random() - 0.5) * height * 0.3,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.4,
        opacity: 0.3,
      });
    };

    // Initial ripples
    createRipple();
    const rippleInterval = setInterval(createRipple, 3000);

    // Animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 0.016;

      // Clear
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Central breathing circle
      const breathCycle = Math.sin(timeRef.current * 0.5) * 0.5 + 0.5;
      const breathRadius = 80 + breathCycle * 40;

      // Outer glow layers
      for (let i = 5; i >= 0; i--) {
        const layerRadius = breathRadius + i * 30;
        const layerOpacity = 0.02 * (1 - i / 6);

        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, layerRadius
        );
        gradient.addColorStop(0, `rgba(45, 212, 191, ${layerOpacity})`);
        gradient.addColorStop(0.5, `rgba(45, 212, 191, ${layerOpacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, layerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main breathing circle
      const mainGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, breathRadius
      );
      mainGradient.addColorStop(0, 'rgba(45, 212, 191, 0.15)');
      mainGradient.addColorStop(0.7, 'rgba(45, 212, 191, 0.05)');
      mainGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, breathRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner pulsing rings
      for (let ring = 0; ring < 3; ring++) {
        const ringPhase = timeRef.current * 0.8 + ring * (Math.PI / 1.5);
        const ringExpansion = (Math.sin(ringPhase) * 0.5 + 0.5);
        const ringRadius = 30 + ring * 25 + ringExpansion * 20;
        const ringOpacity = 0.1 * (1 - ring * 0.25) * (0.5 + Math.sin(ringPhase) * 0.5);

        ctx.strokeStyle = `rgba(45, 212, 191, ${ringOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw expanding ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += 1.5;
        ripple.opacity = 0.3 * (1 - ripple.radius / ripple.maxRadius);

        if (ripple.radius >= ripple.maxRadius) return false;

        ctx.strokeStyle = `rgba(45, 212, 191, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      // Floating particles that drift slowly
      const numParticles = 20;
      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2 + timeRef.current * 0.1;
        const distance = 150 + Math.sin(timeRef.current * 0.3 + i) * 50;
        const px = width / 2 + Math.cos(angle) * distance;
        const py = height / 2 + Math.sin(angle) * distance;
        const particleOpacity = 0.3 + Math.sin(timeRef.current + i) * 0.2;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${particleOpacity})`;
        ctx.fill();
      }

      // Ambient corner gradients
      const cornerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.4);
      cornerGradient.addColorStop(0, 'rgba(45, 212, 191, 0.02)');
      cornerGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGradient;
      ctx.fillRect(0, 0, width, height);

      const cornerGradient2 = ctx.createRadialGradient(width, height, 0, width, height, width * 0.4);
      cornerGradient2.addColorStop(0, 'rgba(45, 212, 191, 0.02)');
      cornerGradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = cornerGradient2;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (!response.trim() || !isReady) return;

    setIsSubmitting(true);

    // Store response
    const existing = sessionStorage.getItem('wonderApplication');
    const data = existing ? JSON.parse(existing) : {};
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...data,
      wonderResponse: response,
      wonderCompletedAt: new Date().toISOString(),
    }));

    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/gate/doors');
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = Math.min(seconds / WAIT_TIME, 1);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Meditative Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#0f172a' }}
      />

      {/* Logo */}
      <header className="p-6 relative z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Question */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 relative z-10">
        <div className="w-full max-w-xl text-center">
          {/* Question */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-white mb-12 leading-relaxed"
          >
            What do you <span className="italic text-teal-400">not</span> know?
          </motion.h1>

          {/* Timer / Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            {!isReady ? (
              <div className="space-y-4">
                {/* Timer display */}
                <div className="text-slate-500 font-mono text-lg">
                  {formatTime(seconds)}
                </div>

                {/* Progress bar with glow */}
                <div className="w-full max-w-xs mx-auto h-1 bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  <div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                      boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
                    }}
                  />
                </div>

                {/* Waiting message */}
                <motion.p
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-slate-500 text-sm"
                >
                  Take a moment to wonder.
                </motion.p>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-400 text-sm"
              >
                You may respond.
              </motion.p>
            )}
          </motion.div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative"
          >
            <div
              className={`relative transition-all duration-500 ${
                isReady
                  ? 'opacity-100'
                  : 'opacity-30 pointer-events-none'
              }`}
            >
              <textarea
                ref={textareaRef}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={!isReady}
                placeholder={isReady ? "Speak your uncertainty..." : ""}
                rows={4}
                className={`w-full px-5 py-4 bg-slate-900/60 backdrop-blur-sm border rounded-xl text-white placeholder-slate-600 outline-none transition-all resize-none ${
                  isFocused
                    ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                    : 'border-slate-700'
                }`}
              />

              {/* Glow effect when ready */}
              <AnimatePresence>
                {isReady && !response && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      boxShadow: '0 0 40px rgba(45, 212, 191, 0.2)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <AnimatePresence>
              {isReady && response.trim() && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-medium rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all disabled:opacity-50 shadow-lg shadow-teal-500/25"
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
