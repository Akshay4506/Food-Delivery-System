const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');

dotenv.config();

const appendData = async () => {
    try {
        await connectDB();

        const newRestaurants = [
            {
                name: 'Spice Symphony',
                location: 'Jayanagar',
                cuisine: 'North Indian',
                rating: 4.8,
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                menu: [
                    { name: 'Paneer Butter Masala', price: 290, description: 'Cottage cheese in a rich tomato gravy.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Garlic Naan', price: 60, description: 'Oven-baked flatbread with garlic.', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Dal Makhani', price: 220, description: 'Slow-cooked black lentils with butter.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Kadai Chicken', price: 340, description: 'Spicy chicken tossed with bell peppers.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
                ]
            },
            {
                name: 'Cafe Zen',
                location: 'HSR Layout',
                cuisine: 'Continental',
                rating: 4.5,
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                menu: [
                    { name: 'Avocado Toast', price: 250, description: 'Sourdough toast with sliced avocado and eggs.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Iced Latte', price: 180, description: 'Espresso poured over milk and ice.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Vegan Buddha Bowl', price: 320, description: 'Quinoa, roasted veggies, and tahini.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
                    { name: 'Blueberry Cheesecake', price: 280, description: 'Rich cheesecake with blueberry compote.', image: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
                ]
            }
        ];

        let allMenuItems = [];

        for (const rest of newRestaurants) {
            const restaurant = await Restaurant.create({
                name: rest.name,
                location: rest.location,
                cuisine: rest.cuisine,
                rating: rest.rating,
                image: rest.image
            });

            if (rest.menu) {
                allMenuItems.push(...rest.menu.map(item => ({
                    restaurantId: restaurant._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    image: item.image
                })));
            }
        }

        await MenuItem.insertMany(allMenuItems);

        console.log('Successfully appended new restaurants with INR prices!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

appendData();
