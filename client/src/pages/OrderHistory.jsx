import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/orders/user/${user.id}`);
                    setOrders(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchOrders();
        }
    }, [user]);

    if (!orders.length) return <div className="history-container"><h2>No orders yet.</h2></div>;

    return (
        <div className="history-container">
            <h2>Order History</h2>
            {orders.map(order => (
                <div key={order._id} className="order-card">
                    <div className="order-header">
                        <span className="order-id">Order #{order._id.substring(order._id.length - 6)}</span>
                        {order.status !== 'Pending' && (
                            <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                        )}
                    </div>
                    <div className="order-items">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="order-item">
                                {item.quantity}x {item.name} (₹{item.price})
                            </div>
                        ))}
                    </div>
                    <div className="order-footer">
                        <span className="date">{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="total">Total: ₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
