import { getCardGradient } from '../../data/galleryData';

/**
 * UseCaseVisual — original, code-generated topical artwork for the
 * Use Cases cards. Each variant renders a small "UI snippet" that
 * visually matches the use case (code editor, chart, document, etc.).
 * No photos / copyrighted media.
 */

/** Reusable rounded line bar. */
const Bar = ({ className = '' }) => (
  <span className={`block h-1.5 rounded-full ${className}`} />
);

const Dots = () => (
  <div className="flex gap-1">
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
  </div>
);

const Scene = ({ variant }) => {
  switch (variant) {
    // Code editor with syntax-coloured, indented lines.
    case 'coding':
      return (
        <>
          <Dots />
          <div className="mt-3 space-y-1.5">
            <Bar className="w-3/4 bg-aion-violet/70" />
            <Bar className="ml-3 w-1/2 bg-aion-cyan/70" />
            <Bar className="ml-3 w-2/3 bg-aion-gold/70" />
            <Bar className="ml-6 w-2/5 bg-emerald-400/70" />
            <Bar className="w-1/2 bg-aion-violet/70" />
          </div>
        </>
      );

    // Document with a heading + text lines.
    case 'writing':
      return (
        <>
          <span className="block h-2 w-2/3 rounded bg-aion-gold/80" />
          <div className="mt-3 space-y-1.5">
            <Bar className="w-full bg-white/25" />
            <Bar className="w-full bg-white/25" />
            <Bar className="w-5/6 bg-white/25" />
            <Bar className="w-full bg-white/25" />
            <Bar className="w-1/3 bg-white/40" />
          </div>
        </>
      );

    // Bar chart.
    case 'research':
      return (
        <>
          <span className="block h-1.5 w-1/2 rounded-full bg-white/30" />
          <div className="mt-3 flex h-14 items-end gap-1.5">
            {[48, 72, 56, 88, 64].map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className="flex-1 rounded-t bg-gradient-to-t from-aion-violet/50 to-aion-cyan"
              />
            ))}
          </div>
        </>
      );

    // Open book — two angled pages.
    case 'learning':
      return (
        <div className="flex items-center justify-center gap-1 py-1.5">
          <div className="w-1/2 -rotate-6 space-y-1.5 rounded-l-md rounded-r-sm border border-white/15 bg-white/[0.07] p-2">
            <Bar className="w-full bg-white/30" />
            <Bar className="w-3/4 bg-white/20" />
            <Bar className="w-full bg-white/20" />
          </div>
          <div className="w-1/2 rotate-6 space-y-1.5 rounded-r-md rounded-l-sm border border-white/15 bg-white/[0.07] p-2">
            <Bar className="w-3/4 bg-aion-gold/70" />
            <Bar className="w-full bg-white/20" />
            <Bar className="w-2/3 bg-white/20" />
          </div>
        </div>
      );

    // Upward trend line chart.
    case 'business':
      return (
        <>
          <span className="block h-1.5 w-2/5 rounded-full bg-white/30" />
          <svg viewBox="0 0 100 44" className="mt-3 h-14 w-full">
            <polyline
              points="4,38 22,30 40,33 58,18 76,22 96,6"
              fill="none"
              stroke="#d6b56d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [4, 38],
              [22, 30],
              [40, 33],
              [58, 18],
              [76, 22],
              [96, 6],
            ].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="2.4" fill="#ffffff" />
            ))}
          </svg>
        </>
      );

    // Checklist.
    case 'productivity':
      return (
        <div className="space-y-2">
          {[true, true, true, false].map((done, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-[5px] border ${
                  done ? 'border-emerald-400/60 bg-emerald-400/20' : 'border-white/20'
                }`}
              >
                {done && <span className="h-1.5 w-1.5 rounded-[2px] bg-emerald-400" />}
              </span>
              <Bar
                className={`${index % 2 ? 'w-2/3' : 'w-full'} ${
                  done ? 'bg-white/20' : 'bg-white/35'
                }`}
              />
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const UseCaseVisual = ({ variant = 'research', accent = 'aurora', className = '' }) => (
  <div
    className={`relative h-full w-full overflow-hidden ${className}`}
    style={{ backgroundImage: getCardGradient(accent) }}
    aria-hidden="true"
  >
    <div className="bg-grid absolute inset-0 opacity-20" />

    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="glass-panel w-full max-w-[210px] rounded-xl p-3.5 shadow-card">
        <Scene variant={variant} />
      </div>
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-aion-charcoal/55 via-transparent to-transparent" />
  </div>
);

export default UseCaseVisual;
