import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './Reviews.css';

const Reviews = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/reviews/${restaurantId}`);
                setReviews(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReviews();
    }, [restaurantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/reviews', {
                restaurantId,
                ...newReview
            });
            setReviews([...reviews, { ...res.data, userId: { username: user.username } }]); // Optimistic update approximation
            setNewReview({ rating: 5, reviewText: '' });
        } catch (err) {
            alert('Error submitting review');
        }
    };

    return (
        <div className="reviews-component">
            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review._id} className="review-card">
                        <div className="review-header">
                            <span className="reviewer">{review.userId?.username || 'User'}</span>
                            <span className="rating">⭐ {review.rating}</span>
                        </div>
                        <p className="review-text">{review.reviewText}</p>
                    </div>
                ))}
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Write a Review</h3>
                    <div className="form-group">
                        <label>Rating:</label>
                        <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            placeholder="Share your experience..."
                            required
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            ) : (
                <p>Please <a href="/login">login</a> to leave a review.</p>
            )}
        </div>
    );
};

export default Reviews;
