import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/restaurants');
                setRestaurants(res.data);

                // Extract unique locations
                const uniqueLocations = ['All', ...new Set(res.data.map(r => r.location))];
                setLocations(uniqueLocations);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const filteredRestaurants = selectedLocation === 'All'
        ? restaurants
        : restaurants.filter(r => r.location === selectedLocation);

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Restaurants</h1>
                <div className="location-filter">
                    <label>Location: </label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="location-select"
                    >
                        {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="restaurant-grid">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
                            <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" loading="lazy" />
                            <div className="restaurant-info">
                                <h3>{restaurant.name}</h3>
                                <p className="cuisine">{restaurant.cuisine} • {restaurant.location}</p>
                                <div className="rating">
                                    {restaurant.rating > 0 ? `⭐ ${restaurant.rating.toFixed(1)}` : 'No ratings yet'}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No restaurants found in this location.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
