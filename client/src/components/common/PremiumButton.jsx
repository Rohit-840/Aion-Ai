import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'text-white bg-gradient-to-r from-aion-violet via-indigo-500 to-aion-blue shadow-glow ' +
    'hover:shadow-[0_0_64px_-10px_rgba(139,92,246,0.85)] hover:-translate-y-0.5',
  secondary:
    'text-white bg-white/[0.06] border border-white/15 backdrop-blur-sm ' +
    'hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5',
  ghost: 'text-aion-muted hover:text-white hover:bg-white/5',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

/**
 * Premium call-to-action button.
 *
 * Renders a React Router <Link> when `to` is passed, an <a> when `href`
 * is passed, otherwise a native <button>.
 *
 * Props: variant (primary|secondary|ghost), size (sm|md|lg), to, href,
 *        onClick, type, loading, disabled, icon, iconRight, fullWidth.
 */
const PremiumButton = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight = false,
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold',
    'transition-all duration-300 ease-premium will-change-transform active:scale-[0.97]',
    'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  const inner = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && Icon && !iconRight && <Icon className="h-4 w-4" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && Icon && iconRight && (
        <Icon
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {inner}
    </button>
  );
};

export default PremiumButton;
