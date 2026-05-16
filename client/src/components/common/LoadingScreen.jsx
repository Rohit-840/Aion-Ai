/**
 * Full-screen loading state — shown while auth status is being resolved.
 */
const LoadingScreen = ({ message = 'Loading' }) => (
  <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-6 bg-aion-black">
    <div className="relative h-16 w-16">
      <span className="absolute inset-0 rounded-full border-2 border-white/10" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-aion-violet border-r-aion-gold" />
      <span className="absolute inset-[34%] rounded-full bg-gradient-to-br from-aion-gold to-aion-violet" />
    </div>
    <p className="text-[11px] uppercase tracking-[0.32em] text-aion-muted">{message}</p>
  </div>
);

export default LoadingScreen;
