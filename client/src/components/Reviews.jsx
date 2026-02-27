import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Star, MessageSquareQuote, Send } from 'lucide-react';
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
                {reviews.length === 0 ? (
                    <div className="no-reviews">
                        <MessageSquareQuote size={40} className="icon-empty" />
                        <p>No reviews yet. Be the first to share your experience!</p>
                    </div>
                ) : (
                    reviews.map(review => (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <span className="reviewer">{review.userId?.username || 'User'}</span>
                                <span className="rating-badge">
                                    <Star size={14} fill="currentColor" /> {review.rating}
                                </span>
                            </div>
                            <p className="review-text">{review.reviewText}</p>
                        </div>
                    ))
                )}
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Write a Review</h3>
                    <div className="form-group">
                        <label>Your Rating</label>
                        <div className="rating-selector">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                >
                                    <Star fill={newReview.rating >= star ? 'currentColor' : 'none'} size={24} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Your Experience</label>
                        <textarea
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            placeholder="Tell us what you loved..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        <Send size={16} /> Submit Review
                    </button>
                </form>
            ) : (
                <div className="login-prompt">
                    <MessageSquareQuote size={32} />
                    <p>Please <a href="/login">log in</a> to leave a review.</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;
