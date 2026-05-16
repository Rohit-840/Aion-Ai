import { Menu, RefreshCw, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

/**
 * Admin dashboard top bar — page title, refresh, account + logout.
 */
const AdminTopbar = ({ title, onMenuClick, onRefresh, refreshing = false }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-aion-black/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        {/* Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-aion-muted">
              Dashboard
            </p>
            <h1 className="font-display text-base font-semibold text-white sm:text-lg">
              {title}
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-aion-muted transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
              aria-label="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          )}

          {/* Account chip */}
          <div className="hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-aion-gold via-aion-violet to-aion-blue text-xs font-bold text-white">
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">{user?.name}</p>
              <p className="text-[10px] text-aion-muted">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-200"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
