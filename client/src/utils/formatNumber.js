/**
 * Number formatting helpers.
 */

/** 1234567 -> "1,234,567" */
export const formatNumber = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return '0';
  return n.toLocaleString('en-US');
};

/** 1234567 -> "1.2M" */
export const formatCompact = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
};

/** 25 -> "25 credits", 1 -> "1 credit" */
export const formatCredits = (value) => {
  const n = Number(value) || 0;
  return `${formatNumber(n)} ${n === 1 ? 'credit' : 'credits'}`;
};

export default formatNumber;
