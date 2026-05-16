const bcrypt = require('bcryptjs');
const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');
const { sendTokenCookie, clearTokenCookie } = require('../utils/generateToken');

const STARTER_CREDITS = 25;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/auth/register
 * Creates a user, grants 25 starter credits, records the transaction
 * and signs the user in via an httpOnly cookie.
 */
const register = async (req, res, next) => {
  try {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const { password } = req.body;

    // ── Validation ───────────────────────────────
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Name, email and password are all required.' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 8 characters long.' });
    }

    // ── Duplicate check ──────────────────────────
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: 'An account with this email already exists.' });
    }

    // ── Create user with starter credits ─────────
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      passwordHash,
      credits: STARTER_CREDITS,
      lastLoginAt: new Date(),
    });

    // ── Record the initial credit transaction ────
    await CreditTransaction.create({
      user: user._id,
      type: 'credit',
      amount: STARTER_CREDITS,
      reason: 'Starter credits',
      balanceAfter: STARTER_CREDITS,
    });

    sendTokenCookie(res, user._id);
    return res.status(201).json({ success: true, user: user.toSafeObject() });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/login
 * Validates credentials, blocks suspended accounts, refreshes the
 * session cookie and records the login time.
 */
const login = async (req, res, next) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' });
    }

    // passwordHash is select:false on the schema — request it explicitly.
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    sendTokenCookie(res, user._id);
    return res.json({ success: true, user: user.toSafeObject() });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/logout
 * Clears the session cookie.
 */
const logout = async (req, res) => {
  clearTokenCookie(res);
  return res.json({ success: true, message: 'Logged out successfully.' });
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (requires `protect`).
 */
const me = async (req, res) => {
  return res.json({ success: true, user: req.user.toSafeObject() });
};

module.exports = { register, login, logout, me };
