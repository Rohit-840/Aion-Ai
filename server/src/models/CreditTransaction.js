const mongoose = require('mongoose');

/**
 * CreditTransaction model.
 * Every credit movement (starter credits, admin adjustments, future
 * generation charges, refunds) is recorded as an immutable ledger entry.
 */
const creditTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['credit', 'debit', 'adjustment', 'refund'],
      required: true,
    },
    amount: {
      // Signed value: positive = credits added, negative = credits removed.
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      default: '',
      trim: true,
      maxlength: 200,
    },
    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    // The actor that triggered the change (e.g. an admin). Optional —
    // system-generated transactions (like starter credits) have none.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

creditTransactionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CreditTransaction', creditTransactionSchema);
