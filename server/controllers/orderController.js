const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { restaurantId, items, totalAmount } = req.body;

    try {
        const newOrder = new Order({
            userId: req.user.id,
            restaurantId,
            items,
            totalAmount
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
