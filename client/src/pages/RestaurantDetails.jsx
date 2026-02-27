import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import Reviews from '../components/Reviews';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const { addToCart, cart } = useContext(CartContext);

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

    return (
        <div className="restaurant-details-container">
            <div className="restaurant-hero">
                <img src={restaurant.image} alt={restaurant.name} className="hero-img" loading="lazy" />
                <div className="hero-overlay">
                    <div className="hero-info">
                        <h1>{restaurant.name}</h1>
                        <div className="hero-meta">
                            <span>{restaurant.cuisine}</span>
                            <span>•</span>
                            <span>{restaurant.location}</span>
                            <span>•</span>
                            <span className="rating">
                                {restaurant.rating > 0 ? `⭐ ${restaurant.rating.toFixed(1)}` : 'New'}
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
                                    <button className="btn-add" onClick={() => addToCart(item, restaurant._id)}>
                                        ADD
                                    </button>
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

            {cart.length > 0 && (
                <div className="cart-float">
                    <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} items | ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
                    <Link to="/cart" className="view-cart-link">View Cart</Link>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;
