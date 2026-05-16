/**
 * Fixed, non-interactive ambient background.
 * Layered blur orbs + decorative grid + film grain.
 * Sits behind all content and never blocks pointer events.
 */
const AnimatedBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Base wash */}
    <div className="absolute inset-0 bg-aion-black" />

    {/* Animated blur orbs */}
    <div className="orb h-[44vw] w-[44vw] -left-[14vw] -top-[12vw] animate-pulseGlow bg-aion-violet/25" />
    <div className="orb h-[40vw] w-[40vw] -right-[16vw] top-[16vh] animate-float-slow bg-aion-blue/20" />
    <div
      className="orb h-[32vw] w-[32vw] bottom-[-14vw] left-[22vw] animate-pulseGlow bg-aion-cyan/12"
      style={{ animationDelay: '2.4s' }}
    />
    <div
      className="orb h-[26vw] w-[26vw] bottom-[6vh] right-[14vw] animate-float bg-aion-gold/12"
      style={{ animationDelay: '1.2s' }}
    />

    {/* Decorative grid + grain */}
    <div className="bg-grid bg-grid-fade absolute inset-0 opacity-50" />
    <div className="noise-overlay absolute inset-0" />
  </div>
);

export default AnimatedBackground;
