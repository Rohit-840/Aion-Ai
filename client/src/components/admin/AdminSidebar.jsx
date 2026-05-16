import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, ReceiptText, X, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: ReceiptText },
];

/** Aion AI aperture logo mark. */
const LogoMark = () => (
  <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
    <defs>
      <linearGradient id="adminAionGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6b56d" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="#0b0f19" stroke="rgba(255,255,255,0.1)" />
    <circle cx="32" cy="32" r="15" fill="none" stroke="url(#adminAionGrad)" strokeWidth="3.5" />
    <circle cx="32" cy="32" r="5.5" fill="url(#adminAionGrad)" />
  </svg>
);

/**
 * Admin navigation sidebar.
 * Fixed on desktop, slide-in drawer on mobile.
 */
const AdminSidebar = ({ activeTab, onTabChange, open, onClose }) => (
  <>
    {/* Mobile overlay */}
    {open && (
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
      />
    )}

    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-aion-charcoal/95 backdrop-blur-xl transition-transform duration-300 ease-premium lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-base font-bold tracking-tight text-white">
            Aion AI
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-aion-violet/30 bg-aion-violet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-aion-violet/20 to-aion-blue/10 text-white ring-1 ring-white/10'
                  : 'text-aion-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-aion-gold' : ''}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-aion-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View public site
        </Link>
      </div>
    </aside>
  </>
);

export default AdminSidebar;
