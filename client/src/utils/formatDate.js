/**
 * Date formatting helpers used across the dashboard and admin panel.
 */

/** "May 16, 2026" */
export const formatDate = (input) => {
  if (!input) return '—';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/** "May 16, 2026, 14:30" */
export const formatDateTime = (input) => {
  if (!input) return '—';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** Relative time, e.g. "3h ago", "2d ago". */
export const timeAgo = (input) => {
  if (!input) return '—';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '—';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';

  const units = [
    { limit: 3600, div: 60, label: 'm' },
    { limit: 86400, div: 3600, label: 'h' },
    { limit: 604800, div: 86400, label: 'd' },
    { limit: 2629800, div: 604800, label: 'w' },
    { limit: Infinity, div: 2629800, label: 'mo' },
  ];

  for (const unit of units) {
    if (seconds < unit.limit) {
      return `${Math.floor(seconds / unit.div)}${unit.label} ago`;
    }
  }
  return formatDate(input);
};

export default formatDate;
