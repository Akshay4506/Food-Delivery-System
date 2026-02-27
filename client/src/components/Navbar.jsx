import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="layout-logo">
                    🍽️ FoodDelivery
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>

                    {user ? (
                        <>
                            <Link to="/orders" className="nav-link">Orders</Link>

                            <Link to="/cart" className="cart-link">
                                <ShoppingCart size={20} />
                                <span className="cart-count">{cartItemCount}</span>
                            </Link>

                            <div className="profile-dropdown-container" ref={dropdownRef}>
                                <button
                                    className="profile-btn"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="avatar-circle">
                                        <User size={20} />
                                    </div>
                                    <span className="username">{user.username}</span>
                                    <ChevronDown size={16} />
                                </button>

                                {dropdownOpen && (
                                    <div className="dropdown-menu">
                                        <Link
                                            to="/profile"
                                            className="dropdown-item"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <User size={18} /> My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-item logout-item"
                                        >
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-btn">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
