'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

// Floating particle for ambient background
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function ApplyPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
  });

  // Initialize ambient particles
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

    // Create floating particles
    const particles: Particle[] = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      timeRef.current += 0.016;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw gradient orbs (very subtle)
      const gradient1 = ctx.createRadialGradient(
        width * 0.2, height * 0.3, 0,
        width * 0.2, height * 0.3, width * 0.4
      );
      gradient1.addColorStop(0, 'rgba(45, 212, 191, 0.03)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.8, height * 0.7, 0,
        width * 0.8, height * 0.7, width * 0.3
      );
      gradient2.addColorStop(0, 'rgba(45, 212, 191, 0.02)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsing opacity
        const pulse = Math.sin(timeRef.current * p.pulseSpeed * 60 + p.pulseOffset);
        const currentOpacity = p.opacity * (0.5 + pulse * 0.5);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${currentOpacity})`;
        ctx.fill();

        // Subtle glow
        const glowGradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 4
        );
        glowGradient.addColorStop(0, `rgba(45, 212, 191, ${currentOpacity * 0.3})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
      });

      // Draw subtle connection lines between nearby particles
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.1;
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Store in sessionStorage for the gate flow
    sessionStorage.setItem('wonderApplication', JSON.stringify({
      ...formData,
      startedAt: new Date().toISOString(),
    }));

    // Brief delay for feel
    await new Promise(resolve => setTimeout(resolve, 300));

    router.push('/gate/visual');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Ambient Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#0f172a' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-1/2"
          style={{
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/3"
          style={{
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)',
          }}
        />
      </div>

      {/* Logo */}
      <header className="p-6 relative z-10">
        <Logo size="sm" variant="white" />
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism card */}
          <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Apply to WONDER
            </h1>
            <p className="text-slate-400 mb-8">
              A few questions await. Take your time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all backdrop-blur-sm"
                  placeholder="How should we address you?"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all backdrop-blur-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="source" className="block text-sm font-medium text-slate-300 mb-2">
                  How did you find us?
                  <span className="text-slate-500 font-normal ml-1">(optional)</span>
                </label>
                <input
                  type="text"
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all backdrop-blur-sm"
                  placeholder="A friend, Twitter, a dream..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Continue <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Subtle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center text-slate-500 text-sm mt-6"
          >
            The journey begins here.
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
