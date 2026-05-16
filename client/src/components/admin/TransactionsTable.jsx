import Badge from '../common/Badge';
import { formatNumber } from '../../utils/formatNumber';
import { formatDateTime } from '../../utils/formatDate';

const TYPE_TONE = {
  credit: 'success',
  debit: 'danger',
  adjustment: 'violet',
  refund: 'cyan',
};

/**
 * Read-only credit transaction ledger.
 * Horizontally scrollable on small screens.
 *
 * Props:
 *   transactions - array of transactions (populated with user + createdBy)
 *   title        - section heading
 *   subtitle     - optional sub label
 */
const TransactionsTable = ({ transactions = [], title = 'Transactions', subtitle }) => (
  <div className="glow-card overflow-hidden rounded-3xl">
    <div className="border-b border-white/10 p-5">
      <h2 className="font-display text-base font-semibold text-white">{title}</h2>
      <p className="mt-0.5 text-xs text-aion-muted">
        {subtitle || `${transactions.length} recorded credit movements`}
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-aion-muted">
            <th className="px-5 py-3 font-semibold">User</th>
            <th className="px-5 py-3 font-semibold">Type</th>
            <th className="px-5 py-3 font-semibold">Amount</th>
            <th className="px-5 py-3 font-semibold">Reason</th>
            <th className="px-5 py-3 font-semibold">Balance After</th>
            <th className="px-5 py-3 font-semibold">Created By</th>
            <th className="px-5 py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const positive = tx.amount >= 0;
            return (
              <tr
                key={tx._id}
                className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.025]"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-white">{tx.user?.name || 'Unknown user'}</p>
                  <p className="text-xs text-aion-muted">{tx.user?.email || '—'}</p>
                </td>
                <td className="px-5 py-3.5">
                  <Badge tone={TYPE_TONE[tx.type] || 'default'}>{tx.type}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`font-semibold ${
                      positive ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {positive ? '+' : '−'}
                    {formatNumber(Math.abs(tx.amount))}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-aion-muted">{tx.reason || '—'}</td>
                <td className="px-5 py-3.5 font-medium text-white">
                  {formatNumber(tx.balanceAfter)}
                </td>
                <td className="px-5 py-3.5 text-aion-muted">
                  {tx.createdBy?.name || 'System'}
                </td>
                <td className="px-5 py-3.5 text-aion-muted">
                  {formatDateTime(tx.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {transactions.length === 0 && (
      <div className="py-14 text-center text-sm text-aion-muted">
        No transactions recorded yet.
      </div>
    )}
  </div>
);

export default TransactionsTable;
