import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import PremiumButton from '../common/PremiumButton';
import MagneticButton from '../common/MagneticButton';
import BotAvatar from '../common/BotAvatar';
import { aionMind, bots } from '../../data/botsData';
import { aionMindCapabilities } from '../../data/landingData';

// Position each model evenly around a circle (top-anchored).
const RADIUS = 37;
const NODES = bots.map((bot, index) => {
  const angle = ((-90 + index * (360 / bots.length)) * Math.PI) / 180;
  return {
    ...bot,
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
});

/** Aion Mind at the centre, every model connected around it. */
const OrchestrationDiagram = () => (
  <div className="relative mx-auto aspect-square w-full max-w-sm">
    {/* Connection lines */}
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {/* userSpaceOnUse so the gradient renders on the vertical (top)
            line too — an objectBoundingBox gradient fails on a
            zero-width bounding box. */}
        <linearGradient
          id="aionMindLine"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
        >
          <stop offset="0" stopColor="#d6b56d" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {NODES.map((node, index) => (
        <motion.line
          key={node.id}
          x1="50"
          y1="50"
          x2={node.x}
          y2={node.y}
          stroke="url(#aionMindLine)"
          strokeWidth="0.5"
          strokeDasharray="1.5 2.5"
          initial={{ opacity: 0.25 }}
          animate={{ strokeDashoffset: [0, -8], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.2 }}
        />
      ))}
    </svg>

    {/* Orbit ring */}
    <div className="absolute inset-[13%] rounded-full border border-white/10" />

    {/* Surrounding models */}
    {NODES.map((node) => (
      <div
        key={node.id}
        className="absolute"
        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <BotAvatar bot={node} size="sm" />
      </div>
    ))}

    {/* Aion Mind core */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 -z-10 rounded-2.5xl bg-aion-gold/45 blur-xl"
      />
      <BotAvatar bot={aionMind} size="lg" glow />
    </div>
  </div>
);

/**
 * Aion Mind spotlight — the flagship master-agent section.
 */
const AionMind = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-72 w-72 rounded-full bg-aion-gold/10 blur-3xl" />

    <Container>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge tone="gold" dot>
            The master agent
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Aion Mind orchestrates{' '}
            <span className="premium-gradient-text">every model.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-aion-muted sm:text-lg">
            Most platforms make you pick a model and hope it&apos;s the right one. Aion Mind
            does the thinking first — it understands your request, calls on the strongest
            models for the job, and brings their answers together into one.
          </p>

          <ul className="mt-7 space-y-3">
            {aionMindCapabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aion-gold/15 ring-1 ring-aion-gold/30">
                  <Check className="h-3 w-3 text-aion-gold" />
                </span>
                <span className="text-sm text-white/80">{capability}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <MagneticButton>
              <PremiumButton to="/signup" icon={Sparkles}>
                Try Aion Mind Free
              </PremiumButton>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <OrchestrationDiagram />
        </motion.div>
      </div>
    </Container>
  </section>
);

export default AionMind;
