import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
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
            await axios.post('http://localhost:5000/api/orders', orderData);
            alert('Order Placed Successfully!');
            clearCart();
            navigate('/orders');
        } catch (err) {
            console.error(err);
            alert('Failed to place order.');
        }
    };

    if (cart.length === 0) return <div className="cart-container"><h2>Cart is Empty</h2></div>;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-header">
                <span>Item</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Actions</span>
            </div>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item._id} className="cart-item">
                        <span className="item-name">{item.name}</span>
                        <div className="qty-controls">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                        </div>
                        <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item._id)} className="btn-remove">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
                <button onClick={handlePlaceOrder} className="btn-checkout">Place Order</button>
            </div>
        </div>
    );
};

export default Cart;
