import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Package, Clock, CheckCircle } from 'lucide-react';
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

    if (!orders.length) return (
        <div className="history-container empty-state">
            <Package size={64} className="empty-icon" />
            <h2>No orders yet</h2>
            <p>When you place an order, it will appear here.</p>
        </div>
    );

    return (
        <div className="history-container">
            <div className="page-header">
                <h2>Order History</h2>
                <p>Track and view your past orders</p>
            </div>

            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <span className="order-id">
                                <Package size={16} /> Order #{order._id.substring(order._id.length - 6).toUpperCase()}
                            </span>
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status === 'Pending' ? <Clock size={14} /> : <CheckCircle size={14} />}
                                {order.status}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <span className="item-qty">{item.quantity}x</span>
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">₹{item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <span className="date">
                                {new Date(order.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric', month: 'short', day: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                            <span className="total">
                                Total: <span className="total-amount">₹{order.totalAmount.toFixed(2)}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
