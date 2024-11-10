import React, { useEffect, useRef, useCallback, memo } from 'react';
import { useThrottledCallback } from '../hooks/useThrottledCallback';

// Performance optimizations based on device capabilities
const PERFORMANCE_MODE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;
const DPR = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 2 : 3);

// Optimized particle config based on device capabilities
const PARTICLE_CONFIG = {
  particleCount: PERFORMANCE_MODE ? 30 : (IS_MOBILE ? 50 : 150),
  connectionDistance: IS_MOBILE ? 80 : 120,
  mouseRadius: IS_MOBILE ? 140 : 200,
  mouseForce: IS_MOBILE ? 0.3 : 0.5,
  baseSpeed: IS_MOBILE ? 0.3 : 0.5,
  friction: 0.97,
  particleAlpha: IS_MOBILE ? 0.25 : 0.35,
  connectionAlpha: IS_MOBILE ? 0.15 : 0.2,
  maxSpeed: IS_MOBILE ? 4 : 6,
  naturalMovement: IS_MOBILE ? 0.03 : 0.05,
  bufferZone: 50,
  updateInterval: IS_MOBILE ? 1000 / 30 : 1000 / 60 // Limit FPS on mobile
} as const;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

// Optimized canvas creation with proper context settings
const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true,
    willReadFrequently: false,
    powerPreference: 'high-performance'
  });

  canvas.width = width * DPR;
  canvas.height = height * DPR;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  if (ctx) {
    ctx.scale(DPR, DPR);
    // Enable image smoothing optimization
    ctx.imageSmoothingEnabled = false;
  }

  return { canvas, ctx };
};

function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const lastUpdateRef = useRef(0);

  const setupCanvas = useCallback(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const { canvas, ctx } = createCanvas(width, height);

    if (canvasRef.current) {
      containerRef.current.removeChild(canvasRef.current);
    }

    containerRef.current.appendChild(canvas);
    canvasRef.current = canvas;
    contextRef.current = ctx;
  }, []);

  const createParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    particlesRef.current = Array.from({ length: PARTICLE_CONFIG.particleCount }, () => {
      const baseRadius = Math.random() * 1.5 + 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed,
        vy: (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed,
        radius: baseRadius,
        baseRadius
      };
    });
  }, []);

  const updateParticle = useCallback((particle: Particle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = mouseRef.current.x - particle.x;
    const dy = mouseRef.current.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PARTICLE_CONFIG.mouseRadius) {
      const force = (PARTICLE_CONFIG.mouseRadius - distance) / PARTICLE_CONFIG.mouseRadius;
      const angle = Math.atan2(dy, dx);
      const easing = force * force;
      
      particle.vx += Math.cos(angle) * easing * PARTICLE_CONFIG.mouseForce;
      particle.vy += Math.sin(angle) * easing * PARTICLE_CONFIG.mouseForce;
    }

    particle.vx += (Math.random() - 0.5) * PARTICLE_CONFIG.naturalMovement;
    particle.vy += (Math.random() - 0.5) * PARTICLE_CONFIG.naturalMovement;
    particle.vx *= PARTICLE_CONFIG.friction;
    particle.vy *= PARTICLE_CONFIG.friction;

    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
    if (speed > PARTICLE_CONFIG.maxSpeed) {
      const scale = PARTICLE_CONFIG.maxSpeed / speed;
      particle.vx *= scale;
      particle.vy *= scale;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;

    const { width, height } = canvas;
    if (particle.x < -PARTICLE_CONFIG.bufferZone) particle.x = width + PARTICLE_CONFIG.bufferZone;
    if (particle.x > width + PARTICLE_CONFIG.bufferZone) particle.x = -PARTICLE_CONFIG.bufferZone;
    if (particle.y < -PARTICLE_CONFIG.bufferZone) particle.y = height + PARTICLE_CONFIG.bufferZone;
    if (particle.y > height + PARTICLE_CONFIG.bufferZone) particle.y = -PARTICLE_CONFIG.bufferZone;
  }, []);

  const drawParticles = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 0.5;

    const particles = particlesRef.current;
    const len = particles.length;
    const halfDist = PARTICLE_CONFIG.connectionDistance / 2;

    // Batch similar drawing operations
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const particle = particles[i];
      
      for (let j = i + 1; j < len; j++) {
        const other = particles[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PARTICLE_CONFIG.connectionDistance) {
          const opacity = (1 - distance / PARTICLE_CONFIG.connectionDistance) * PARTICLE_CONFIG.connectionAlpha;
          ctx.strokeStyle = `rgba(250, 189, 0, ${opacity})`;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
        }
      }
    }
    ctx.stroke();

    // Batch particle drawing
    ctx.fillStyle = `rgba(250, 189, 0, ${PARTICLE_CONFIG.particleAlpha})`;
    for (let i = 0; i < len; i++) {
      const particle = particles[i];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (!isVisibleRef.current) return;
    
    // Limit update rate based on device capabilities
    if (timestamp - lastUpdateRef.current >= PARTICLE_CONFIG.updateInterval) {
      const particles = particlesRef.current;
      const len = particles.length;
      
      for (let i = 0; i < len; i++) {
        updateParticle(particles[i]);
      }
      
      drawParticles();
      lastUpdateRef.current = timestamp;
    }
    
    rafRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticles]);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) * DPR,
      y: (e.clientY - rect.top) * DPR
    };
  }, IS_MOBILE ? 32 : 16);

  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
    if (isVisibleRef.current && !rafRef.current) {
      lastUpdateRef.current = performance.now();
      animate(lastUpdateRef.current);
    }
  }, [animate]);

  const handleResize = useThrottledCallback(() => {
    setupCanvas();
    createParticles();
  }, 250);

  useEffect(() => {
    setupCanvas();
    createParticles();
    lastUpdateRef.current = performance.now();
    animate(lastUpdateRef.current);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [setupCanvas, createParticles, animate, handleResize, handleMouseMove, handleVisibilityChange]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{
        opacity: 0.6,
        touchAction: 'none',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      aria-hidden="true"
    />
  );
}

export default memo(ParticleBackground);