const CreditTransaction = require('../models/CreditTransaction');

/**
 * GET /api/credits/me
 * Returns the logged-in user's current balance and recent transactions.
 */
const getMyCredits = async (req, res, next) => {
  try {
    const transactions = await CreditTransaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json({
      success: true,
      credits: req.user.credits,
      transactions,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMyCredits };
