const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { COOKIE_NAME } = require('../utils/generateToken');

/**
 * Protect a route: requires a valid JWT cookie.
 * - Verifies the token
 * - Loads the user
 * - Rejects missing / invalid sessions
 * - Rejects suspended accounts
 * - Attaches the user document to `req.user`
 */
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authenticated. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Session is no longer valid.' });
    }

    if (user.status === 'suspended') {
      return res
        .status(403)
        .json({ success: false, message: 'This account has been suspended.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid or expired session. Please log in again.' });
  }
};

module.exports = { protect };
