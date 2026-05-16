import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LayoutDashboard, ShieldCheck, LogIn } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Container from './Container';
import PremiumButton from './PremiumButton';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Agents', to: '/agents' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
];

/** Aion AI aperture logo mark. */
const LogoMark = () => (
  <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
    <defs>
      <linearGradient id="navAionGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6b56d" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="#0b0f19" stroke="rgba(255,255,255,0.1)" />
    <circle cx="32" cy="32" r="15" fill="none" stroke="url(#navAionGrad)" strokeWidth="3.5" />
    <circle cx="32" cy="32" r="5.5" fill="url(#navAionGrad)" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    [
      'nav-underline text-sm font-medium transition-colors duration-300',
      isActive ? 'text-white is-active' : 'text-aion-muted hover:text-white',
    ].join(' ');

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? 'py-2.5' : 'py-4 sm:py-5'
      }`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ease-premium sm:px-5 ${
            scrolled ? 'glass-panel shadow-card' : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg"
            aria-label="Aion AI — home"
          >
            <LogoMark />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Aion AI
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-medium text-aion-muted transition-colors hover:text-white"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <MagneticButton>
                  <PremiumButton to="/app-placeholder" size="sm" icon={LayoutDashboard}>
                    Open App
                  </PremiumButton>
                </MagneticButton>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-aion-muted transition-colors hover:text-white"
                >
                  Login
                </Link>
                <MagneticButton>
                  <PremiumButton to="/signup" size="sm" icon={Sparkles}>
                    Start Chatting
                  </PremiumButton>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <Container>
              <div className="glow-card mt-2 flex flex-col gap-1 rounded-2xl p-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-aion-muted hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="my-2 h-px bg-white/10" />

                {isAuthenticated ? (
                  <div className="flex flex-col gap-2.5">
                    {isAdmin && (
                      <PremiumButton
                        to="/admin"
                        variant="secondary"
                        size="md"
                        icon={ShieldCheck}
                        fullWidth
                      >
                        Admin Panel
                      </PremiumButton>
                    )}
                    <PremiumButton
                      to="/app-placeholder"
                      size="md"
                      icon={LayoutDashboard}
                      fullWidth
                    >
                      Open App
                    </PremiumButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <PremiumButton
                      to="/login"
                      variant="secondary"
                      size="md"
                      icon={LogIn}
                      fullWidth
                    >
                      Login
                    </PremiumButton>
                    <PremiumButton to="/signup" size="md" icon={Sparkles} fullWidth>
                      Start Chatting
                    </PremiumButton>
                  </div>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
