const CreditTransaction = require('../models/CreditTransaction');

/**
 * Apply a credit change to a user and record it in the ledger.
 *
 * This is the single source of truth for credit movements. Future AI
 * generation routes can call this to charge credits per generation.
 *
 * @param {Object}  params
 * @param {Object}  params.user      - Mongoose user document (mutated + saved)
 * @param {number}  params.delta     - signed amount (+ to add, - to remove)
 * @param {string}  params.type      - credit | debit | adjustment | refund
 * @param {string}  params.reason    - human-readable reason
 * @param {string} [params.createdBy]- id of the actor (e.g. an admin)
 * @returns {Promise<{ user: Object, transaction: Object }>}
 */
const applyCreditChange = async ({ user, delta, type, reason, createdBy = null }) => {
  if (!user) {
    const err = new Error('User is required to apply a credit change');
    err.statusCode = 400;
    throw err;
  }

  const newBalance = user.credits + delta;
  if (newBalance < 0) {
    const err = new Error('Credit balance cannot go below zero');
    err.statusCode = 400;
    throw err;
  }

  user.credits = newBalance;
  await user.save();

  const transaction = await CreditTransaction.create({
    user: user._id,
    type,
    amount: delta, // signed: + for added credits, - for removed
    reason: reason || '',
    balanceAfter: newBalance,
    createdBy: createdBy || null,
  });

  return { user, transaction };
};

module.exports = { applyCreditChange };
