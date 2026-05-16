import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Send, Coins } from 'lucide-react';
import Container from '../common/Container';
import Badge from '../common/Badge';
import PremiumButton from '../common/PremiumButton';
import MagneticButton from '../common/MagneticButton';
import BotAvatar from '../common/BotAvatar';
import { allAgents, aionMind } from '../../data/botsData';
import { heroStats } from '../../data/landingData';

const HEADLINE = [
  { text: 'Every', gradient: false },
  { text: 'AI', gradient: false },
  { text: 'model,', gradient: false },
  { text: 'one', gradient: true },
  { text: 'intelligent', gradient: true },
  { text: 'conversation.', gradient: true },
];

const fadeContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const wordContainer = { hidden: {}, show: { transition: { staggerChildren: 0.085 } } };
const wordUp = {
  hidden: { opacity: 0, y: '0.55em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Small aperture logo mark for the chat window header. */
const PanelLogo = () => (
  <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
    <defs>
      <linearGradient id="heroPanelGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6b56d" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="none" stroke="url(#heroPanelGrad)" strokeWidth="4" />
    <circle cx="32" cy="32" r="6" fill="url(#heroPanelGrad)" />
  </svg>
);

const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
    <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-aion-violet/20 blur-3xl" />

    <Container>
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ── Left: copy ────────────────────────── */}
        <motion.div variants={fadeContainer} initial="hidden" animate="show" className="max-w-xl">
          <motion.div variants={fadeUp}>
            <Badge tone="gold" icon={Sparkles}>
              One platform · Every AI
            </Badge>
          </motion.div>

          <motion.h1
            variants={wordContainer}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {HEADLINE.map((word) => (
              <motion.span
                key={word.text}
                variants={wordUp}
                className={`mr-[0.28em] inline-block ${word.gradient ? 'premium-gradient-text' : ''}`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-aion-muted sm:text-lg"
          >
            Aion AI brings ChatGPT, Claude, Gemini, Grok and more into a single workspace —
            with <span className="text-white">Aion Mind</span>, a master agent that
            coordinates them all to give you the best answer, every time.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <PremiumButton to="/signup" size="lg" icon={Sparkles}>
                Start Chatting Free
              </PremiumButton>
            </MagneticButton>
            <PremiumButton to="/agents" size="lg" variant="secondary" icon={ArrowRight} iconRight>
              Explore Agents
            </PremiumButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-aion-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: chat interface mockup ──────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-40" />
          <div className="pointer-events-none absolute -right-6 -top-8 h-40 w-40 rounded-full bg-aion-cyan/20 blur-3xl" />

          {/* Floating agent badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-2 -top-5 z-20 sm:-right-4"
          >
            <div className="glow-card flex items-center gap-2 rounded-full px-3.5 py-2">
              <Coins className="h-4 w-4 text-aion-gold" />
              <span className="text-xs font-semibold text-white">25 free credits</span>
            </div>
          </motion.div>

          {/* Chat window */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="glow-card relative z-10 rounded-3xl p-4 sm:p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PanelLogo />
                <span className="font-display text-sm font-bold text-white">Aion AI</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                <Coins className="h-3 w-3 text-aion-gold" />
                <span className="text-[11px] font-semibold text-white">25</span>
              </div>
            </div>

            {/* Agent switcher */}
            <div className="mt-3 flex items-center gap-1.5">
              {allAgents.map((agent) => (
                <span
                  key={agent.id}
                  className={`rounded-xl p-0.5 ${
                    agent.featured ? 'ring-2 ring-aion-gold/70' : 'ring-1 ring-white/5'
                  }`}
                >
                  <BotAvatar bot={agent} size="xs" />
                </span>
              ))}
            </div>

            {/* Messages */}
            <div className="mt-4 space-y-3">
              {/* User */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-aion-violet to-aion-blue px-3.5 py-2.5">
                  <p className="text-sm text-white">
                    Summarise this report and draft a short intro.
                  </p>
                </div>
              </div>

              {/* Aion Mind */}
              <div className="flex gap-2">
                <BotAvatar bot={aionMind} size="xs" />
                <div className="max-w-[85%]">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-aion-gold">
                    Aion Mind
                  </p>
                  <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-aion-muted">Coordinated</span>
                      <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80">
                        ChatGPT
                      </span>
                      <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80">
                        Claude
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      Here&apos;s a tight summary, plus a 3-line intro you can drop straight
                      into the document.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 pl-4">
              <span className="flex-1 text-sm text-white/35">Message any AI…</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aion-violet to-aion-blue">
                <Send className="h-4 w-4 text-white" />
              </span>
            </div>
          </motion.div>

          {/* Floating model-count card */}
          <motion.div
            animate={{ y: [0, 13, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-7 -left-3 z-20 sm:-left-6"
          >
            <div className="glow-card flex items-center gap-2.5 rounded-2xl p-3">
              <div className="flex -space-x-2">
                {allAgents.slice(1, 5).map((agent) => (
                  <BotAvatar key={agent.id} bot={agent} size="xs" className="ring-2 ring-aion-charcoal" />
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">7 models connected</p>
                <p className="text-[11px] text-aion-muted">+ Aion Mind</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Container>
  </section>
);

export default Hero;
