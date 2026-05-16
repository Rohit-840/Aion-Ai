const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');
const { applyCreditChange } = require('../utils/creditService');

/**
 * GET /api/admin/stats
 * Aggregated overview metrics for the admin dashboard.
 */
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, activeUsers, suspendedUsers, creditAgg] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'suspended' }),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$credits' } } }]),
    ]);

    return res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        suspendedUsers,
        totalCredits: creditAgg[0]?.total || 0,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/admin/users
 * Returns every user (password hash excluded by schema default).
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json({ success: true, users: users.map((u) => u.toSafeObject()) });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/admin/users/:id
 * Returns a single user.
 */
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    return res.json({ success: true, user: user.toSafeObject() });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/admin/users/:id/credits
 * Body: { action: "add" | "remove", amount: number, reason: string }
 * Updates the balance and records a transaction.
 */
const updateUserCredits = async (req, res, next) => {
  try {
    const { action, reason } = req.body;
    const amount = Number(req.body.amount);

    if (!['add', 'remove'].includes(action)) {
      return res
        .status(400)
        .json({ success: false, message: 'Action must be either "add" or "remove".' });
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Amount must be a number greater than zero.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const delta = action === 'add' ? amount : -amount;
    if (user.credits + delta < 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot remove ${amount} credits — user only has ${user.credits}.`,
      });
    }

    const { transaction } = await applyCreditChange({
      user,
      delta,
      type: 'adjustment',
      reason:
        (reason || '').trim() ||
        (action === 'add' ? 'Admin credit addition' : 'Admin credit removal'),
      createdBy: req.user._id,
    });

    return res.json({
      success: true,
      user: user.toSafeObject(),
      transaction,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/admin/users/:id/status
 * Body: { status: "active" | "suspended" }
 */
const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: 'Status must be "active" or "suspended".' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Guard: an admin cannot suspend their own account.
    if (user._id.equals(req.user._id) && status === 'suspended') {
      return res
        .status(400)
        .json({ success: false, message: 'You cannot suspend your own admin account.' });
    }

    user.status = status;
    await user.save();

    return res.json({ success: true, user: user.toSafeObject() });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/admin/transactions
 * Latest credit transactions, populated with user + actor details.
 */
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await CreditTransaction.find()
      .populate('user', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.json({ success: true, transactions });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getStats,
  getUsers,
  getUser,
  updateUserCredits,
  updateUserStatus,
  getTransactions,
};
