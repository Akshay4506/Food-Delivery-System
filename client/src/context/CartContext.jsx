import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [restaurantId, setRestaurantId] = useState(() => {
        const storedRestaurantId = localStorage.getItem('cartRestaurantId');
        return storedRestaurantId ? storedRestaurantId : null;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        if (restaurantId) localStorage.setItem('cartRestaurantId', restaurantId);
        else localStorage.removeItem('cartRestaurantId');
    }, [cart, restaurantId]);

    const addToCart = (item, currentRestaurantId) => {
        // Ensure IDs are strings
        const currentIdStr = String(currentRestaurantId);
        const stateIdStr = restaurantId ? String(restaurantId) : null;

        console.log('Adding to Cart:', item.name, 'Restaurant:', currentIdStr, 'Current Cart Rest:', stateIdStr);

        // If different restaurant, ask confirmation
        if (stateIdStr && stateIdStr !== currentIdStr) {
            if (!window.confirm("Start a new order? You have items from another restaurant.")) {
                return;
            }
            // Reset cart and add new item immediately
            setRestaurantId(currentIdStr);
            setCart([{ ...item, quantity: 1 }]);
        } else {
            // Same restaurant or empty cart
            setRestaurantId(currentIdStr);
            setCart((prevCart) => {
                const existingItem = prevCart.find((i) => i._id === item._id);
                if (existingItem) {
                    return prevCart.map((i) =>
                        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                }
                return [...prevCart, { ...item, quantity: 1 }];
            });
        }
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter((i) => i._id !== itemId);
            if (newCart.length === 0) setRestaurantId(null);
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        setRestaurantId(null);
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((i) => (i._id === itemId ? { ...i, quantity } : i))
        );
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, restaurantId, addToCart, removeFromCart, clearCart, updateQuantity, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
