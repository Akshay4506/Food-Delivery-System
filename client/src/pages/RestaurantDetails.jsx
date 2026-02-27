import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, MapPin, Clock } from 'lucide-react';
import CartContext from '../context/CartContext';
import Reviews from '../components/Reviews';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const { addToCart, updateQuantity, cart } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resRest = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
                setRestaurant(resRest.data);
                const resMenu = await axios.get(`http://localhost:5000/api/restaurants/${id}/menu`);
                setMenu(resMenu.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    if (!restaurant) return <div className="loader">Loading...</div>;

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="restaurant-details-container">
            <div className="restaurant-hero">
                <img src={restaurant.image} alt={restaurant.name} className="hero-img" loading="lazy" />
                <div className="hero-overlay">
                    <div className="hero-info">
                        <h1>{restaurant.name}</h1>
                        <div className="hero-meta">
                            <span className="meta-tag">{restaurant.cuisine}</span>
                            <span className="dot">•</span>
                            <span className="meta-tag location">
                                <MapPin size={16} /> {restaurant.location}
                            </span>
                            <span className="dot">•</span>
                            <span className="meta-tag rating">
                                <Star size={16} fill="currentColor" /> {restaurant.rating > 0 ? restaurant.rating.toFixed(1) : 'New'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu-section">
                <h2>Recommended</h2>
                <div className="menu-list">
                    {menu.map(item => (
                        <div key={item._id} className="menu-item-card">
                            <div className="menu-info">
                                <div>
                                    <h3>{item.name}</h3>
                                    <p className="menu-desc">{item.description}</p>
                                </div>
                                <div className="menu-footer">
                                    <span className="price">₹{item.price}</span>
                                    {cart.find(cItem => cItem._id === item._id) ? (
                                        <div className="menu-qty-controls">
                                            <button onClick={() => updateQuantity(item._id, cart.find(cItem => cItem._id === item._id).quantity - 1)}>-</button>
                                            <span>{cart.find(cItem => cItem._id === item._id).quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, cart.find(cItem => cItem._id === item._id).quantity + 1)}>+</button>
                                        </div>
                                    ) : (
                                        <button className="btn-add" onClick={() => addToCart(item, restaurant._id)}>
                                            ADD +
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="menu-img-wrapper">
                                <img src={item.image} alt={item.name} className="menu-img" loading="lazy" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="reviews-section">
                <h2>Reviews</h2>
                <Reviews restaurantId={id} />
            </div>

            {cartItemCount > 0 && (
                <div className="cart-float">
                    <div className="cart-summary">
                        <span className="cart-items">{cartItemCount} item{cartItemCount > 1 ? 's' : ''}</span>
                        <span className="cart-total">₹{cartTotal}</span>
                    </div>
                    <Link to="/cart" className="view-cart-link">View Cart</Link>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;
