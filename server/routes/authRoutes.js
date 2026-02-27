const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, updatePassword } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Verify path after list_dir

router.post('/signup', signup);
router.post('/login', login);
router.put('/profile', auth, updateProfile);
router.put('/profile/password', auth, updatePassword);

module.exports = router;
