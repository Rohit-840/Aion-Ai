import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Coins } from 'lucide-react';
import PremiumButton from '../common/PremiumButton';
import { formatCredits } from '../../utils/formatNumber';

/**
 * Modal for adding or removing a user's credits.
 *
 * Props:
 *   user          - the target user (null = modal closed)
 *   defaultAction - "add" | "remove" (preselected action)
 *   onClose       - close handler
 *   onSubmit      - ({ action, amount, reason }) => void
 *   submitting    - boolean loading flag
 */
const CreditModal = ({ user, defaultAction = 'add', onClose, onSubmit, submitting = false }) => {
  const [action, setAction] = useState(defaultAction);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // Reset the form whenever a new user/action is opened.
  useEffect(() => {
    if (user) {
      setAction(defaultAction);
      setAmount('');
      setReason('');
      setError('');
    }
  }, [user, defaultAction]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!user) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [user, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }
    if (action === 'remove' && numericAmount > user.credits) {
      setError(`This user only has ${user.credits} credits available.`);
      return;
    }
    onSubmit({ action, amount: numericAmount, reason: reason.trim() });
  };

  return (
    <AnimatePresence>
      {user && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glow-card relative z-10 w-full max-w-md rounded-3xl p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Adjust user credits"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Adjust Credits
                </h2>
                <p className="mt-0.5 text-sm text-aion-muted">
                  {user.name} &middot; {user.email}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Current balance */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Coins className="h-4 w-4 text-aion-gold" />
              <span className="text-sm text-aion-muted">Current balance:</span>
              <span className="text-sm font-semibold text-white">
                {formatCredits(user.credits)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Action toggle */}
              <div>
                <span className="mb-1.5 block text-sm font-medium text-white/80">Action</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'add', label: 'Add', icon: Plus },
                    { id: 'remove', label: 'Remove', icon: Minus },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setAction(option.id);
                        setError('');
                      }}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                        action === option.id
                          ? option.id === 'add'
                            ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
                            : 'border-rose-400/40 bg-rose-400/15 text-rose-200'
                          : 'border-white/10 bg-white/[0.03] text-aion-muted hover:text-white'
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label
                  htmlFor="credit-amount"
                  className="mb-1.5 block text-sm font-medium text-white/80"
                >
                  Amount
                </label>
                <input
                  id="credit-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setError('');
                  }}
                  placeholder="e.g. 100"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-aion-violet/55 focus:ring-2 focus:ring-aion-violet/15"
                />
              </div>

              {/* Reason */}
              <div>
                <label
                  htmlFor="credit-reason"
                  className="mb-1.5 block text-sm font-medium text-white/80"
                >
                  Reason <span className="text-white/35">(optional)</span>
                </label>
                <input
                  id="credit-reason"
                  type="text"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="e.g. Promotional bonus"
                  maxLength={200}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-aion-violet/55 focus:ring-2 focus:ring-aion-violet/15"
                />
              </div>

              {error && <p className="text-xs text-rose-400">{error}</p>}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  Cancel
                </button>
                <PremiumButton type="submit" loading={submitting} className="flex-1">
                  {submitting ? 'Saving…' : 'Confirm'}
                </PremiumButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreditModal;
