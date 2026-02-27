import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const RestaurantDetails = lazy(() => import('./pages/RestaurantDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const Profile = lazy(() => import('./pages/Profile')); // New Page

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
