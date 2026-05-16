/**
 * BotAvatar — an original, designed avatar for each AI agent.
 *
 * Pure gradient + Lucide glyph — no vendor logos are used, so there is
 * no copyright/trademark concern.
 */

const ACCENT_GRADIENTS = {
  gold: 'from-aion-gold to-amber-600',
  mint: 'from-emerald-400 to-aion-cyan',
  ember: 'from-orange-400 to-rose-500',
  blue: 'from-aion-blue to-indigo-500',
  cyan: 'from-aion-cyan to-sky-500',
  aurora: 'from-aion-violet to-aion-cyan',
  violet: 'from-aion-violet to-fuchsia-500',
  royal: 'from-indigo-500 to-aion-violet',
};

const SIZES = {
  xs: { box: 'h-8 w-8 rounded-lg', icon: 'h-4 w-4' },
  sm: { box: 'h-11 w-11 rounded-xl', icon: 'h-5 w-5' },
  md: { box: 'h-14 w-14 rounded-2xl', icon: 'h-7 w-7' },
  lg: { box: 'h-20 w-20 rounded-2.5xl', icon: 'h-10 w-10' },
};

const BotAvatar = ({ bot, size = 'md', glow = false, className = '' }) => {
  const sz = SIZES[size] || SIZES.md;
  const gradient = ACCENT_GRADIENTS[bot?.accent] || ACCENT_GRADIENTS.aurora;
  const Icon = bot?.icon;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center bg-gradient-to-br ring-1 ring-white/20 ${gradient} ${
        sz.box
      } ${glow ? 'shadow-glow-gold' : ''} ${className}`}
      aria-hidden="true"
    >
      {Icon && <Icon className={`${sz.icon} text-white`} />}
      {/* Soft top-light for depth */}
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/30 to-white/10" />
    </span>
  );
};

export default BotAvatar;
