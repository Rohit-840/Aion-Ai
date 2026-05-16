import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { adminService } from '../services/adminService';
import AdminLayout from '../components/admin/AdminLayout';
import StatsCards from '../components/admin/StatsCards';
import UsersTable from '../components/admin/UsersTable';
import TransactionsTable from '../components/admin/TransactionsTable';
import CreditModal from '../components/admin/CreditModal';

const TAB_TITLES = {
  overview: 'Overview',
  users: 'User Management',
  transactions: 'Credit Transactions',
};

/**
 * /admin — protected admin dashboard.
 * Fetches stats, users and transactions, and lets admins adjust
 * credits and account status.
 */
const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const [modalUser, setModalUser] = useState(null);
  const [modalAction, setModalAction] = useState('add');
  const [submitting, setSubmitting] = useState(false);
  const [busyUserId, setBusyUserId] = useState(null);

  // ── Data loading ────────────────────────────────
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const [statsRes, usersRes, txRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getTransactions(),
      ]);
      setStats(statsRes.stats);
      setUsers(usersRes.users);
      setTransactions(txRes.transactions);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  // ── Credit actions ──────────────────────────────
  const openCreditModal = (targetUser, action) => {
    setModalAction(action);
    setModalUser(targetUser);
  };

  const closeCreditModal = () => {
    if (!submitting) setModalUser(null);
  };

  const handleCreditSubmit = async ({ action, amount, reason }) => {
    if (!modalUser) return;
    setSubmitting(true);
    setBusyUserId(modalUser.id);
    try {
      await adminService.updateCredits(modalUser.id, { action, amount, reason });
      toast.success(
        `${action === 'add' ? 'Added' : 'Removed'} ${amount} credits for ${modalUser.name}.`
      );
      setModalUser(null);
      await loadData(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
      setBusyUserId(null);
    }
  };

  // ── Status actions ──────────────────────────────
  const handleToggleStatus = async (targetUser) => {
    const nextStatus = targetUser.status === 'active' ? 'suspended' : 'active';
    setBusyUserId(targetUser.id);
    try {
      await adminService.updateStatus(targetUser.id, { status: nextStatus });
      toast.success(`${targetUser.name} is now ${nextStatus}.`);
      await loadData(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyUserId(null);
    }
  };

  // ── Content ─────────────────────────────────────
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex min-h-[55vh] flex-col items-center justify-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-aion-violet" />
          <p className="text-sm text-aion-muted">Loading dashboard data…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="glow-card mx-auto mt-10 max-w-md rounded-3xl p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10 ring-1 ring-rose-400/20">
            <AlertTriangle className="h-6 w-6 text-rose-300" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold text-white">
            Could not load data
          </h2>
          <p className="mt-1.5 text-sm text-aion-muted">{error}</p>
          <button
            type="button"
            onClick={() => loadData(false)}
            className="mt-5 rounded-full bg-gradient-to-r from-aion-violet to-aion-blue px-6 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      );
    }

    if (activeTab === 'overview') {
      return (
        <div className="space-y-6">
          <div className="glow-card rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aion-violet/10 ring-1 ring-aion-violet/20">
                <ShieldCheck className="h-5 w-5 text-aion-violet" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Welcome back, {user?.name?.split(' ')[0]}.
                </h2>
                <p className="text-sm text-aion-muted">
                  Manage users, credits and transactions from the Aion AI control
                  center.
                </p>
              </div>
            </div>
          </div>

          <StatsCards stats={stats} />

          <TransactionsTable
            transactions={transactions.slice(0, 6)}
            title="Recent Activity"
            subtitle="The six most recent credit movements"
          />
        </div>
      );
    }

    if (activeTab === 'users') {
      return (
        <div className="space-y-6">
          <StatsCards stats={stats} />
          <UsersTable
            users={users}
            currentUserId={user?.id}
            busyUserId={busyUserId}
            onAdjustCredits={openCreditModal}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      );
    }

    return <TransactionsTable transactions={transactions} title="All Transactions" />;
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title={TAB_TITLES[activeTab]}
      onRefresh={() => loadData(true)}
      refreshing={refreshing}
    >
      <motion.div
        key={`${activeTab}-${loading}-${Boolean(error)}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {renderContent()}
      </motion.div>

      <CreditModal
        user={modalUser}
        defaultAction={modalAction}
        onClose={closeCreditModal}
        onSubmit={handleCreditSubmit}
        submitting={submitting}
      />
    </AdminLayout>
  );
};

export default Admin;
