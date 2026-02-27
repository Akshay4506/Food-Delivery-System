const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById, getMenuByRestaurantId, createRestaurant, addMenuItem } = require('../controllers/restaurantController');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getMenuByRestaurantId);
router.post('/', createRestaurant); // Ideally protected
router.post('/:id/menu', addMenuItem); // Ideally protected

module.exports = router;
