import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * GSAP ScrollTrigger staggered reveal.
 *
 * Animates every element marked with `data-animate` inside `scopeRef`
 * as it scrolls into view. Respects reduced-motion preferences.
 *
 * @param {React.RefObject} scopeRef - container ref
 * @param {object}          options  - { y, stagger, start, duration }
 */
export const useScrollAnimation = (scopeRef, options = {}) => {
  const { y = 48, stagger = 0.1, start = 'top 82%', duration = 0.9 } = options;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const targets = scope.querySelectorAll('[data-animate]');
      if (!targets.length) return;

      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope,
          start,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, y, stagger, start, duration]);
};

/**
 * GSAP ScrollTrigger parallax.
 *
 * Moves `targetRef` vertically as the page scrolls for a layered,
 * cinematic depth effect.
 *
 * @param {React.RefObject} targetRef - element to move
 * @param {number}          strength  - 0–1, how far it drifts
 */
export const useParallax = (targetRef, strength = 0.18) => {
  useEffect(() => {
    const target = targetRef.current;
    if (!target || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(target, {
        yPercent: -strength * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [targetRef, strength]);
};

export default useScrollAnimation;
