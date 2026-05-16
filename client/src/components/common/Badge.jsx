const TONES = {
  default: 'border-white/10 bg-white/5 text-aion-muted',
  gold: 'border-aion-gold/25 bg-aion-gold/10 text-aion-gold',
  violet: 'border-aion-violet/30 bg-aion-violet/10 text-violet-200',
  cyan: 'border-aion-cyan/30 bg-aion-cyan/10 text-cyan-200',
  success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  danger: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
};

/**
 * Small pill label — used for section eyebrows and status tags.
 */
const Badge = ({ children, icon: Icon, tone = 'default', dot = false, className = '' }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
      TONES[tone] || TONES.default
    } ${className}`}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {Icon && <Icon className="h-3.5 w-3.5" />}
    {children}
  </span>
);

export default Badge;
