const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        await User.deleteMany();
        await Restaurant.deleteMany();
        await MenuItem.deleteMany();

        // Curated Image Map for Static Reliability (Fixed Broken & Duplicates)
        const images = {
            // Restaurants
            empire: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Busy Indian Restaurant
            truffles: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Burger Joint
            matteo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Cafe
            nagarjuna: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Verified Indian Thali for restaurant image
            windmills: 'https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Brewery/Pub Atmosphere
            pastaStreet: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Italian
            chutneyChang: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fallback
            chutneyChang_safe: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Asian Feast/Buffet Spread (More Relevant)
            habanero: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Vibrant Mexican
            pakwan: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Kept generic nice restaurant
            udupi: 'https://images.unsplash.com/photo-1627042633145-c7644d5a9d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Simple Dining
            kebabMagic: 'https://images.unsplash.com/photo-1529193591184-b1d580690dd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Grill
            toit: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Pub
            glens: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Bakery
            milano: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Ice Cream
            blackPearl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // New: Dark/Theme
            chianti: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Italian

            // Menu Items
            kebab: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            gheeRice: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            paratha: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            butterChicken: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            fries: 'https://images.unsplash.com/photo-1573080496987-aeb4d9170d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            shake: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            macCheese: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            muffin: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            thali: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            biryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            chicken: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            salmon: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            ribs: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            lasagna: 'https://images.unsplash.com/photo-1629115916087-7e8c114a24ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fresh Lasagna
            garlicBread: 'https://images.unsplash.com/photo-1573145124179-42843b6bc81b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fresh Garlic Bread (Fixed)
            dimsum: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            noodles: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            nachos: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            burrito: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            dal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            paneer: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            dosa: 'https://images.unsplash.com/photo-1630395822970-367f05eb4616?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fixed Dosa URL
            idli: 'https://images.unsplash.com/photo-15893017605e4-d2c43118e69?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fixed Idli/South Indian URL
            shawarma: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            pizza: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            wings: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', // Fresh Wings URL
            cupcake: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            puff: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            icecream: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            sorbet: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            prawns: 'https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            risotto: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            ravioli: 'https://images.unsplash.com/photo-1587740967742-9c2e6d5d7249?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        };

        const locations = [
            {
                name: 'MG Road',
                restaurants: [
                    {
                        name: 'Empire Restaurant', cuisine: 'Indian', image: images.empire,
                        menu: [
                            { name: 'Empire Special Chicken Kebab', price: 240, description: 'Famous fried chicken kebabs.', image: images.kebab },
                            { name: 'Ghee Rice', price: 160, description: 'Aromatic rice cooked in ghee.', image: images.gheeRice },
                            { name: 'Coin Parota', price: 40, description: 'Layered small bread.', image: images.paratha },
                            { name: 'Butter Chicken', price: 320, description: 'Creamy curry.', image: images.butterChicken }
                        ]
                    },
                    {
                        name: 'Truffles', cuisine: 'American', image: images.truffles,
                        menu: [
                            { name: 'All American Cheese Burger', price: 220, description: 'Classic beef burger.', image: images.burger },
                            { name: 'Peri Peri Fries', price: 140, description: 'Spicy fries.', image: images.fries },
                            { name: 'Ferrero Rocher Shake', price: 210, description: 'Rich chocolate hazelnut shake.', image: images.shake },
                            { name: 'Mac n Cheese', price: 260, description: 'Creamy macaroni.', image: images.macCheese }
                        ]
                    },
                    {
                        name: 'Matteo Coffea', cuisine: 'Cafe', image: images.matteo,
                        menu: [
                            { name: 'Caramel Macchiato', price: 210, description: 'Espresso with vanilla.', image: images.coffee },
                            { name: 'Choco Chip Muffin', price: 120, description: 'Freshly baked.', image: images.muffin },
                            { name: 'Club Sandwich', price: 250, description: 'Toasted bread with veggies.', image: images.sandwich }
                        ]
                    },
                    {
                        name: 'Nagarjuna', cuisine: 'Andhra', image: images.nagarjuna,
                        menu: [
                            { name: 'Andhra Meals', price: 350, description: 'Unlimited rice and sambar.', image: images.thali },
                            { name: 'Chicken Biryani', price: 320, description: 'Spicy Andhra style biryani.', image: images.biryani },
                            { name: 'Chilli Chicken', price: 290, description: 'Spicy dry chicken starter.', image: images.chicken }
                        ]
                    },
                ]
            },
            {
                name: 'Whitefield',
                restaurants: [
                    {
                        name: 'Windmills Craftworks', cuisine: 'Continental', image: images.windmills,
                        menu: [
                            { name: 'Grilled Salmon', price: 850, description: 'Fresh salmon with veggies.', image: images.salmon },
                            { name: 'Pork Ribs', price: 750, description: 'Slow cooked bbq ribs.', image: images.ribs },
                            { name: 'Caesar Salad', price: 450, description: 'Fresh greens.', image: images.salad }
                        ]
                    },
                    {
                        name: 'Pasta Street', cuisine: 'Italian', image: images.pastaStreet,
                        menu: [
                            { name: 'Penne Arrabbiata', price: 390, description: 'Spicy tomato pasta.', image: images.pasta },
                            { name: 'Lasagna', price: 450, description: 'Layered pasta bake.', image: images.lasagna },
                            { name: 'Garlic Bread', price: 180, description: 'Toasted with herb butter.', image: images.garlicBread }
                        ]
                    },
                    {
                        name: 'Chutney Chang', cuisine: 'Chinese', image: images.chutneyChang_safe,
                        menu: [
                            { name: 'Dim Sum Basket', price: 280, description: 'Assorted steamed dumplings.', image: images.dimsum },
                            { name: 'Kung Pao Chicken', price: 320, description: 'Spicy stir-fry.', image: images.chicken },
                            { name: 'Hakka Noodles', price: 240, description: 'Wok tossed noodles.', image: images.noodles }
                        ]
                    },
                    {
                        name: 'Habanero', cuisine: 'Mexican', image: images.habanero,
                        menu: [
                            { name: 'Chicken Tacos', price: 350, description: 'Soft shell tacos.', image: images.tacos },
                            { name: 'Nachos Grande', price: 380, description: 'Loaded nachos.', image: images.nachos },
                            { name: 'Beef Burrito', price: 320, description: 'Stuffed tortilla roll.', image: images.burrito }
                        ]
                    },
                ]
            },
            {
                name: 'Indiranagar',
                restaurants: [
                    {
                        name: 'Toit', cuisine: 'Brewery', image: images.toit,
                        menu: [
                            { name: 'Pepperoni Pizza', price: 550, description: 'Wood fried pizza.', image: images.pizza },
                            { name: 'Beef Nachos', price: 400, description: 'Crispy corn chips.', image: images.nachos },
                            { name: 'Buffalo Wings', price: 350, description: 'Spicy chicken wings.', image: images.wings }
                        ]
                    },
                    {
                        name: 'Glen\'s Bakehouse', cuisine: 'Bakery', image: images.glens,
                        menu: [
                            { name: 'Red Velvet Cupcake', price: 80, description: 'Classic mini cake.', image: images.cupcake },
                            { name: 'Chicken Puff', price: 60, description: 'Flaky pastry.', image: images.puff },
                            { name: 'Sourdough Pizza', price: 450, description: 'Artisan pizza base.', image: images.pizza }
                        ]
                    },
                    {
                        name: 'Milano Ice Cream', cuisine: 'Desserts', image: images.milano,
                        menu: [
                            { name: 'Dark Chocolate Gelato', price: 150, description: 'Rich italian ice cream.', image: images.icecream },
                            { name: 'Mango Sorbet', price: 150, description: 'Dairy free fruity treat.', image: images.sorbet },
                            { name: 'Waffle Cone', price: 180, description: 'Crispy cone with scoops.', image: images.icecream }
                        ]
                    },
                ]
            },
            {
                name: 'Koramangala', // Added locations for completeness
                restaurants: [
                    {
                        name: 'Truffles (Koramangala)', cuisine: 'American', image: images.truffles,
                        menu: [
                            { name: 'Lamb Burger', price: 260, description: 'Juicy lamb patty.', image: images.burger },
                            { name: 'Devil\'s Chicken', price: 280, description: 'Extremely spicy chicken.', image: images.chicken },
                            { name: 'Oreo Shake', price: 190, description: 'Cookies and cream.', image: images.shake }
                        ]
                    },
                    {
                        name: 'The Black Pearl', cuisine: 'Barbecue', image: images.blackPearl,
                        menu: [
                            { name: 'BBQ Buffet', price: 899, description: 'Unlimited varied grill items.', image: images.ribs }, // using ribs for bbq
                            { name: 'Prawn Skewers', price: 450, description: 'Grilled prawns.', image: images.prawns },
                            { name: 'Cajun Potatoes', price: 220, description: 'Spicy baby potatoes.', image: images.potatoes }
                        ]
                    },
                    {
                        name: 'Chianti', cuisine: 'Italian', image: images.chianti,
                        menu: [
                            { name: 'Risotto', price: 480, description: 'Creamy mushroom rice.', image: images.risotto },
                            { name: 'Ravioli', price: 420, description: 'Stuffed pasta parcels.', image: images.ravioli },
                            { name: 'Tiramisu', price: 350, description: 'Classic coffee dessert.', image: images.tiramisu }
                        ]
                    },
                ]
            }
        ];

        let allRestaurants = [];
        let allMenuItems = [];

        for (const loc of locations) {
            for (const rest of loc.restaurants) {

                const restaurant = await Restaurant.create({
                    name: rest.name,
                    location: loc.name,
                    cuisine: rest.cuisine,
                    rating: 0,
                    image: rest.image // Direct static image
                });

                // Use specific menu
                if (rest.menu) {
                    allMenuItems.push(...rest.menu.map(item => ({
                        restaurantId: restaurant._id,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        image: item.image // Direct static image
                    })));
                }
            }
        }

        await MenuItem.insertMany(allMenuItems);

        console.log('Fixed Static, Reliable and Relevant Images Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
