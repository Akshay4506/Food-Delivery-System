const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://placehold.co/400x300',
    },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
