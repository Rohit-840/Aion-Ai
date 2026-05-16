const ACCENTS = {
  violet: 'text-aion-violet bg-aion-violet/10 ring-aion-violet/20',
  gold: 'text-aion-gold bg-aion-gold/10 ring-aion-gold/20',
  cyan: 'text-aion-cyan bg-aion-cyan/10 ring-aion-cyan/20',
  blue: 'text-aion-blue bg-aion-blue/10 ring-aion-blue/20',
  emerald: 'text-emerald-300 bg-emerald-400/10 ring-emerald-400/20',
  rose: 'text-rose-300 bg-rose-400/10 ring-rose-400/20',
};

/**
 * Compact metric card — used in the admin dashboard stat grid.
 */
const StatCard = ({ label, value, icon: Icon, accent = 'violet', hint }) => (
  <div className="glow-card rounded-2.5xl p-5 sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-aion-muted">
          {label}
        </p>
        <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">{value}</p>
        {hint && <p className="mt-1.5 text-xs text-aion-muted">{hint}</p>}
      </div>
      {Icon && (
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
            ACCENTS[accent] || ACCENTS.violet
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
    </div>
  </div>
);

export default StatCard;
