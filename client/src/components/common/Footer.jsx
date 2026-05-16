import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Container from './Container';

/** Aion AI aperture logo mark (footer variant). */
const LogoMark = () => (
  <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
    <defs>
      <linearGradient id="footAionGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6b56d" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="#0b0f19" stroke="rgba(255,255,255,0.1)" />
    <circle cx="32" cy="32" r="15" fill="none" stroke="url(#footAionGrad)" strokeWidth="3.5" />
    <circle cx="32" cy="32" r="5.5" fill="url(#footAionGrad)" />
  </svg>
);

const LINK_GROUPS = [
  {
    title: 'About',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Agents', to: '/agents' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', to: '/login' },
      { label: 'Signup', to: '/signup' },
    ],
  },
];

/**
 * Social media links.
 * TODO: replace each "#" with the real profile URL when available.
 */
const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
];

const Footer = () => (
  <footer className="relative mt-10 border-t border-white/10 bg-aion-charcoal/75 backdrop-blur-xl">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aion-violet/50 to-transparent" />

    <Container>
      <div className="grid gap-12 py-14 sm:py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        {/* Brand */}
        <div className="max-w-sm">
          {/* Social media */}
          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-aion-muted transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <Link
            to="/"
            className="mt-6 flex items-center gap-2.5"
            aria-label="Aion AI — home"
          >
            <LogoMark />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Aion AI
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-aion-muted">
            One platform for chatting with every leading AI model — coordinated by Aion
            Mind, the master agent.
          </p>
        </div>

        {/* Link groups */}
        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-aion-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trademark disclaimer */}
      <p className="border-t border-white/10 py-6 text-xs leading-relaxed text-white/40">
        ChatGPT, Claude, Gemini, Grok, Perplexity, DeepSeek, Copilot and other model names
        are trademarks of their respective owners. Aion AI is an independent platform and
        is not affiliated with, sponsored by, or endorsed by these companies.
      </p>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 sm:flex-row">
        <p className="text-xs text-aion-muted">
          &copy; 2026 Aion AI. All rights reserved.
        </p>
        <p className="text-xs text-white/40">Every AI, one intelligent conversation.</p>
      </div>
    </Container>
  </footer>
);

export default Footer;
