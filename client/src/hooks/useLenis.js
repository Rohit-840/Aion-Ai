import { useContext } from 'react';
import { LenisContext } from '../components/common/SmoothScrollProvider';

/**
 * Access the active Lenis smooth-scroll instance.
 *
 * Returns `null` until Lenis has initialised, so always guard usage:
 *   const lenis = useLenis();
 *   lenis?.scrollTo(0);
 */
export const useLenis = () => useContext(LenisContext);

export default useLenis;
