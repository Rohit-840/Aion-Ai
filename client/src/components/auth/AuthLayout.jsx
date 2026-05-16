import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Coins, Layers } from 'lucide-react';

/** Aion AI aperture logo mark. */
const LogoMark = () => (
  <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
    <defs>
      <linearGradient id="authAionGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6b56d" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="#0b0f19" stroke="rgba(255,255,255,0.1)" />
    <circle cx="32" cy="32" r="15" fill="none" stroke="url(#authAionGrad)" strokeWidth="3.5" />
    <circle cx="32" cy="32" r="5.5" fill="url(#authAionGrad)" />
  </svg>
);

const HIGHLIGHTS = [
  { icon: Layers, text: 'Every leading AI model, plus the Aion Mind agent' },
  { icon: Coins, text: '25 free credits the moment you sign up' },
  { icon: ShieldCheck, text: 'Secure accounts with JWT & encrypted passwords' },
];

/**
 * Reusable labelled input for the auth forms.
 */
export const AuthField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  autoComplete,
  rightSlot,
}) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white/80">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-white/[0.04] py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 ${
          Icon ? 'pl-10' : 'pl-4'
        } ${rightSlot ? 'pr-11' : 'pr-4'} ${
          error
            ? 'border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-400/15'
            : 'border-white/10 focus:border-aion-violet/55 focus:ring-aion-violet/15'
        }`}
      />
      {rightSlot}
    </div>
    {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
  </div>
);

/**
 * Split-screen shell for the login + signup pages.
 */
const AuthLayout = ({ children }) => (
  <div className="relative min-h-screen lg:grid lg:grid-cols-2">
    {/* ── Brand panel (desktop) ─────────────────── */}
    <aside className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-aion-charcoal via-aion-black to-aion-black" />
      <div className="orb h-80 w-80 -left-20 -top-24 animate-pulseGlow bg-aion-violet/30" />
      <div className="orb h-72 w-72 -bottom-24 left-10 animate-float-slow bg-aion-gold/15" />
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-40" />

      <Link to="/" className="flex items-center gap-2.5">
        <LogoMark />
        <span className="font-display text-lg font-bold tracking-tight text-white">
          Aion AI
        </span>
      </Link>

      <div className="max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl"
        >
          Every AI, <span className="premium-gradient-text">one conversation.</span>
        </motion.h2>
        <p className="mt-4 text-sm leading-relaxed text-aion-muted">
          Chat with ChatGPT, Claude, Gemini and more — coordinated by Aion Mind, inside one
          premium platform.
        </p>

        <ul className="mt-8 space-y-3.5">
          {HIGHLIGHTS.map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                <item.icon className="h-4 w-4 text-aion-gold" />
              </span>
              <span className="text-sm text-white/75">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-white/40">&copy; 2026 Aion AI. All rights reserved.</p>
    </aside>

    {/* ── Form panel ────────────────────────────── */}
    <main className="flex min-h-screen flex-col px-5 py-8 sm:px-8 lg:px-14">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 lg:hidden">
          <LogoMark />
          <span className="font-display text-base font-bold tracking-tight text-white">
            Aion AI
          </span>
        </Link>
        <Link
          to="/"
          className="ml-auto inline-flex items-center gap-1.5 text-sm text-aion-muted transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center py-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </main>
  </div>
);

export default AuthLayout;
