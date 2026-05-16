const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');
const {
  getStats,
  getUsers,
  getUser,
  updateUserCredits,
  updateUserStatus,
  getTransactions,
} = require('../controllers/adminController');

const router = express.Router();

// Every admin route requires an authenticated admin user.
router.use(protect, requireAdmin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id/credits', updateUserCredits);
router.patch('/users/:id/status', updateUserStatus);
router.get('/transactions', getTransactions);

module.exports = router;
