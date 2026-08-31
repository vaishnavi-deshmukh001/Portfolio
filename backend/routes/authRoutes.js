const express = require('express');
const router = express.Router();
const { loginAdmin, changePassword, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.put('/change-password', protect, changePassword);
router.get('/verify', protect, verifyToken);

module.exports = router;
