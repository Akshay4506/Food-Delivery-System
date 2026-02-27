import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cart, restaurantId, updateQuantity, removeFromCart, totalAmount, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const orderData = {
            restaurantId,
            items: cart.map(item => ({
                menuItemId: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/orders', orderData, {
                headers: {
                    'x-auth-token': token
                }
            });
            alert('Order Placed Successfully!');
            clearCart();
            navigate('/orders');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                alert('Your session has expired. Please log out and log back in to place your order.');
            } else {
                const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
                alert(`Failed to place order: ${errorMsg}`);
            }
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-empty-state">
                <ShoppingBag size={64} className="empty-icon" />
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <Link to="/" className="btn-primary" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
                    Browse Restaurants
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header-title">
                <h2>Review Your Order</h2>
            </div>

            <div className="cart-content-wrapper">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price-unit">₹{item.price} each</span>
                            </div>

                            <div className="qty-controls">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                            </div>

                            <span className="item-price-total">₹{(item.price * item.quantity).toFixed(2)}</span>

                            <button onClick={() => removeFromCart(item._id)} className="btn-remove" aria-label="Remove item">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-sidebar">
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Taxes & Fees</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <button onClick={handlePlaceOrder} className="btn-checkout">
                            Place Order <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
