/**
 * Admin guard. Must run AFTER `protect` so `req.user` is populated.
 * Only users with role "admin" may continue.
 */
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ success: false, message: 'Admin access is required for this resource.' });
  }
  next();
};

module.exports = { requireAdmin };
