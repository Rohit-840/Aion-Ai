import { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Exposes the active Lenis instance (consumed via the useLenis hook). */
export const LenisContext = createContext(null);

/**
 * Initialises global smooth scrolling with Lenis and wires it into the
 * GSAP ticker so ScrollTrigger animations stay perfectly in sync.
 *
 * - Disables smooth wheel when the user prefers reduced motion
 * - Cleans up the instance + ticker callback on unmount
 * - Scrolls to top on every route change
 */
const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new Lenis({
      duration: 1.2,
      // easeOutExpo — a smooth, premium "glide and settle" feel.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      autoRaf: false, // we drive raf manually via the GSAP ticker
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Keep ScrollTrigger updated as Lenis scrolls.
    instance.on('scroll', ScrollTrigger.update);

    // Drive Lenis from the GSAP ticker (requestAnimationFrame under the hood).
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Reset scroll position when navigating between pages.
  useEffect(() => {
    const instance = lenisRef.current;
    if (instance) {
      instance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export default SmoothScrollProvider;
