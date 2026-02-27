const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMenuByRestaurantId = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ restaurantId: req.params.id });
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRestaurant = async (req, res) => {
    const { name, location, cuisine, image } = req.body;
    const restaurant = new Restaurant({
        name,
        location,
        cuisine,
        image
    });

    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.addMenuItem = async (req, res) => {
    const { name, price, description, image } = req.body;
    const menuItem = new MenuItem({
        restaurantId: req.params.id,
        name,
        price,
        description,
        image
    });

    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
