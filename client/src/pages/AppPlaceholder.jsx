import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Home, Coins, BadgeCheck, CircleUser, Info } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import PremiumButton from '../components/common/PremiumButton';
import { formatNumber } from '../utils/formatNumber';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

/**
 * /app-placeholder — minimal post-login landing area.
 *
 * Intentionally blank-like: this is the slot reserved for the real AI
 * dashboard. To change where users land after auth, edit appConfig.js.
 */
const AppPlaceholder = () => {
  const { user, logout } = useAuth();

  const details = [
    { label: 'Plan', value: user?.plan, capitalize: true },
    { label: 'Status', value: user?.status, capitalize: true },
  ];

  return (
    <div className="relative flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl text-center"
        >
          <div className="flex justify-center">
            <Badge tone="violet" icon={BadgeCheck}>
              Workspace
            </Badge>
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Aion AI Workspace
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-aion-muted">
            Your AI chat workspace will open here.
          </p>

          {/* User card */}
          <div className="glow-card mt-10 rounded-3xl p-6 text-left sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-aion-gold via-aion-violet to-aion-blue text-lg font-bold text-white">
                {getInitials(user?.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-white">
                  {user?.name}
                </p>
                <p className="flex items-center gap-1.5 truncate text-sm text-aion-muted">
                  <CircleUser className="h-3.5 w-3.5" />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* Credits */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aion-muted">
                  Credits
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 font-display text-xl font-bold text-white">
                  <Coins className="h-4 w-4 text-aion-gold" />
                  {formatNumber(user?.credits || 0)}
                </p>
              </div>
              {/* Plan + Status */}
              {details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aion-muted">
                    {item.label}
                  </p>
                  <p
                    className={`mt-1.5 font-display text-xl font-bold text-white ${
                      item.capitalize ? 'capitalize' : ''
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <PremiumButton onClick={logout} icon={LogOut} variant="secondary">
              Logout
            </PremiumButton>
            <PremiumButton to="/" icon={Home}>
              Back to Home
            </PremiumButton>
          </div>

          {/* Config note */}
          <div className="mx-auto mt-10 flex max-w-md items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-aion-cyan" />
            <p className="text-xs leading-relaxed text-aion-muted">
              To change where users go after login/signup, update{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">
                client/src/config/appConfig.js
              </code>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AppPlaceholder;
