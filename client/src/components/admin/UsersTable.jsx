import { useState } from 'react';
import { Search, Plus, Minus, Ban, CheckCircle2, Coins } from 'lucide-react';
import Badge from '../common/Badge';
import { formatNumber } from '../../utils/formatNumber';
import { formatDate } from '../../utils/formatDate';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

/**
 * Admin users table with search + per-row credit / status actions.
 * Horizontally scrollable on small screens.
 *
 * Props:
 *   users          - array of users
 *   currentUserId  - id of the logged-in admin (self-row is protected)
 *   busyUserId     - id of the row currently performing an action
 *   onAdjustCredits(user, action) - open the credit modal
 *   onToggleStatus(user)          - activate / suspend a user
 */
const UsersTable = ({
  users = [],
  currentUserId,
  busyUserId,
  onAdjustCredits,
  onToggleStatus,
}) => {
  const [query, setQuery] = useState('');

  const term = query.trim().toLowerCase();
  const filtered = term
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
    : users;

  return (
    <div className="glow-card overflow-hidden rounded-3xl">
      {/* Header + search */}
      <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-base font-semibold text-white">Users</h2>
          <p className="mt-0.5 text-xs text-aion-muted">{users.length} total accounts</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name or email"
            aria-label="Search users"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-aion-violet/50 focus:ring-2 focus:ring-aion-violet/15 sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-aion-muted">
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Plan</th>
              <th className="px-5 py-3 font-semibold">Credits</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Created</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => {
              const busy = busyUserId === user.id;
              const isSelf = currentUserId === user.id;
              const suspended = user.status === 'suspended';

              return (
                <tr
                  key={user.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.025]"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aion-violet to-aion-blue text-[11px] font-bold text-white">
                        {getInitials(user.name)}
                      </span>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-aion-muted">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={user.role === 'admin' ? 'violet' : 'default'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 capitalize text-aion-muted">{user.plan}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                      <Coins className="h-3.5 w-3.5 text-aion-gold" />
                      {formatNumber(user.credits)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={suspended ? 'danger' : 'success'} dot>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-aion-muted">{formatDate(user.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onAdjustCredits(user, 'add')}
                        disabled={busy}
                        title="Add credits"
                        aria-label={`Add credits to ${user.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 transition-colors hover:bg-emerald-400/20 disabled:opacity-40"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdjustCredits(user, 'remove')}
                        disabled={busy}
                        title="Remove credits"
                        aria-label={`Remove credits from ${user.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/25 bg-amber-400/10 text-amber-300 transition-colors hover:bg-amber-400/20 disabled:opacity-40"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleStatus(user)}
                        disabled={busy || isSelf}
                        title={
                          isSelf
                            ? 'You cannot change your own status'
                            : suspended
                              ? 'Activate user'
                              : 'Suspend user'
                        }
                        aria-label={
                          suspended
                            ? `Activate ${user.name}`
                            : `Suspend ${user.name}`
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors disabled:opacity-40 ${
                          suspended
                            ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20'
                            : 'border-rose-400/25 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20'
                        }`}
                      >
                        {suspended ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-14 text-center text-sm text-aion-muted">
          {users.length === 0
            ? 'No users yet.'
            : 'No users match your search.'}
        </div>
      )}
    </div>
  );
};

export default UsersTable;
