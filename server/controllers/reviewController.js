const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

exports.addReview = async (req, res) => {
    const { restaurantId, rating, reviewText } = req.body;

    try {
        const newReview = new Review({
            userId: req.user.id,
            restaurantId,
            rating,
            reviewText
        });

        await newReview.save();

        // Update restaurant rating
        const reviews = await Review.find({ restaurantId });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
            await Restaurant.findByIdAndUpdate(restaurantId, { rating: avgRating });
        } else {
            await Restaurant.findByIdAndUpdate(restaurantId, { rating: 0 }); // Fallback
        }

        res.status(201).json(newReview);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantId: req.params.restaurantId }).populate('userId', 'username');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
