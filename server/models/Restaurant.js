const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: 'https://placehold.co/600x400',
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
