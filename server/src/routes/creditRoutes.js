const express = require('express');
const { getMyCredits } = require('../controllers/creditController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All credit routes require an authenticated user.
router.get('/me', protect, getMyCredits);

module.exports = router;
