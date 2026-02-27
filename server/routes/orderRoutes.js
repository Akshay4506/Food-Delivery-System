const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/orderController');

router.post('/', auth, createOrder);
router.get('/user/:userId', auth, getUserOrders);

module.exports = router;
