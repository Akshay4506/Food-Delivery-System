const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { restaurantId, items, totalAmount } = req.body;
    console.log('Received Order Payload:', JSON.stringify(req.body, null, 2));

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
        console.error('Order Creation Error:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
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
