const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addReview, getReviewsByRestaurant } = require('../controllers/reviewController');

router.post('/', auth, addReview);
router.get('/:restaurantId', getReviewsByRestaurant);

module.exports = router;
