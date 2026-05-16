import { getCardGradient } from '../../data/galleryData';

/**
 * ArtVisual — original, code-generated abstract artwork for placeholder
 * cards (gallery + showcase). No copyrighted media is used.
 *
 * Each card gets one of four layered compositions, themed by `tone` and
 * selected deterministically by `seed`, so the gallery feels varied.
 */

// Accent colours per tone, as "r,g,b" strings for use inside rgba().
const TONE_ACCENTS = {
  gold: ['214,181,109', '244,217,160'],
  violet: ['139,92,246', '196,181,253'],
  cyan: ['34,211,238', '165,243,252'],
  blue: ['59,130,246', '147,197,253'],
  aurora: ['139,92,246', '34,211,238'],
  ember: ['214,181,109', '244,114,182'],
  mint: ['34,211,238', '139,92,246'],
  royal: ['99,102,241', '214,181,109'],
};

const ArtVisual = ({ tone = 'aurora', seed = 0, className = '' }) => {
  const [c1, c2] = TONE_ACCENTS[tone] || TONE_ACCENTS.aurora;
  const variant = ((Math.round(seed) % 4) + 4) % 4;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundImage: getCardGradient(tone) }}
      aria-hidden="true"
    >
      {/* Fine grid texture */}
      <div className="bg-grid absolute inset-0 opacity-[0.18]" />

      {/* Soft accent glow blobs (shared by every variant) */}
      <div
        className="absolute -right-10 -top-12 h-40 w-40 rounded-full blur-2xl"
        style={{ background: `rgba(${c1},0.45)` }}
      />
      <div
        className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full blur-2xl"
        style={{ background: `rgba(${c2},0.26)` }}
      />

      {/* Variant 0 — concentric aperture rings */}
      {variant === 0 &&
        [0, 1, 2, 3].map((i) => {
          const size = 58 + i * 50;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: `rgba(${c1},${0.5 - i * 0.1})`,
              }}
            />
          );
        })}
      {variant === 0 && (
        <div
          className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]"
          style={{ background: `rgba(${c1},0.9)` }}
        />
      )}

      {/* Variant 1 — diagonal light streaks */}
      {variant === 1 &&
        [0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute top-[-30%] h-[160%] w-9 rotate-[26deg] blur-md"
            style={{
              left: `${10 + i * 27}%`,
              background: `linear-gradient(to bottom, transparent, rgba(${
                i % 2 ? c2 : c1
              },0.55), transparent)`,
            }}
          />
        ))}

      {/* Variant 2 — dot matrix + central bloom */}
      {variant === 2 && (
        <>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(${c2},0.55) 1.4px, transparent 1.6px)`,
              backgroundSize: '20px 20px',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{ background: `rgba(${c1},0.6)` }}
          />
        </>
      )}

      {/* Variant 3 — large arc + framed accents */}
      {variant === 3 && (
        <>
          <div
            className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full border-2"
            style={{ borderColor: `rgba(${c1},0.4)` }}
          />
          <div
            className="absolute left-7 top-8 h-14 w-14 rotate-12 rounded-lg border"
            style={{ borderColor: `rgba(${c2},0.5)` }}
          />
          <div
            className="absolute left-9 top-1/2 h-px w-2/3"
            style={{ background: `linear-gradient(to right, rgba(${c1},0.6), transparent)` }}
          />
        </>
      )}

      {/* Depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
    </div>
  );
};

export default ArtVisual;
