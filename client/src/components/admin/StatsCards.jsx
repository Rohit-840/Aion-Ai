import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Coins } from 'lucide-react';
import StatCard from '../common/StatCard';
import { formatNumber } from '../../utils/formatNumber';

/**
 * Four-up admin metric grid.
 */
const StatsCards = ({ stats }) => {
  const data = stats || {};
  const cards = [
    {
      label: 'Total Users',
      value: formatNumber(data.totalUsers || 0),
      icon: Users,
      accent: 'violet',
    },
    {
      label: 'Active Users',
      value: formatNumber(data.activeUsers || 0),
      icon: UserCheck,
      accent: 'emerald',
    },
    {
      label: 'Suspended Users',
      value: formatNumber(data.suspendedUsers || 0),
      icon: UserX,
      accent: 'rose',
    },
    {
      label: 'Total Credits in System',
      value: formatNumber(data.totalCredits || 0),
      icon: Coins,
      accent: 'gold',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <StatCard
            label={card.label}
            value={card.value}
            icon={card.icon}
            accent={card.accent}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
