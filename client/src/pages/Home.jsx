import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
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
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Craving something <span className="text-gradient">delicious?</span>
                    </h1>
                    <p className="hero-subtitle">Discover the best food & drinks in your city</p>

                    <div className="search-bar glass">
                        <div className="location-filter">
                            <MapPin size={20} className="filter-icon" />
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
                </div>
            </section>

            <section className="restaurants-section">
                <div className="section-header">
                    <h2>Top Restaurants</h2>
                    <p>Explore curated spots picked just for you.</p>
                </div>

                <div className="restaurant-grid">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
                                <div className="img-wrapper">
                                    <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" loading="lazy" />
                                </div>
                                <div className="restaurant-info">
                                    <h3 className="restaurant-name">{restaurant.name}</h3>
                                    <p className="cuisine">{restaurant.cuisine} • {restaurant.location}</p>
                                    <div className="rating">
                                        {restaurant.rating > 0 ? `★ ${restaurant.rating.toFixed(1)}` : 'New'}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No restaurants found for this location.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
