import { lazy, Suspense } from 'react';

// Lazy-loaded so the Three.js bundle never blocks first paint.
const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Fixed, non-interactive ambient background.
 *
 * Layers (back → front):
 *   1. solid base
 *   2. ambient blur orbs
 *   3. Scene3D — a real 3D torus-knot that revolves on scroll
 *   4. film grain
 *   5. twinkling, drifting particle field
 *
 * The CSS layers use transform / opacity only and the 3D scene + the
 * particles are disabled / frozen for users who prefer reduced motion.
 */

const PARTICLE_TONES = ['bg-white', 'bg-white', 'bg-aion-gold', 'bg-aion-violet', 'bg-aion-cyan'];

// Generated once at module load → stable for the session.
const PARTICLES = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1.5 + Math.random() * 2.4,
  tone: PARTICLE_TONES[index % PARTICLE_TONES.length],
  delay: Math.random() * 8,
  twinkleDuration: 3 + Math.random() * 5,
  driftDuration: 13 + Math.random() * 13,
}));

const AnimatedBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Base wash */}
    <div className="absolute inset-0 bg-aion-black" />

    {/* Ambient blur orbs (glow behind the 3D form) */}
    <div className="orb h-[38vw] w-[38vw] -left-[12vw] -top-[10vw] animate-pulseGlow bg-aion-violet/22" />
    <div className="orb h-[34vw] w-[34vw] -right-[14vw] top-[16vh] animate-float-slow bg-aion-blue/18" />
    <div
      className="orb h-[28vw] w-[28vw] bottom-[-12vw] left-[24vw] animate-pulseGlow bg-aion-cyan/12"
      style={{ animationDelay: '2.6s' }}
    />

    {/* Scroll-driven 3D centerpiece */}
    <Suspense fallback={null}>
      <Scene3D />
    </Suspense>

    {/* Film grain */}
    <div className="noise-overlay absolute inset-0" />

    {/* Twinkling, drifting particle field */}
    {PARTICLES.map((particle) => (
      <span
        key={particle.id}
        className="absolute animate-drift"
        style={{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.driftDuration}s`,
        }}
      >
        <span
          className={`block rounded-full ${particle.tone} animate-twinkle`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.twinkleDuration}s`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
          }}
        />
      </span>
    ))}
  </div>
);

export default AnimatedBackground;
