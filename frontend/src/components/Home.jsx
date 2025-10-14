import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Paris from "../assets/Paris1.jpg";
import Bali from "../images/Bali.jpg";
import NewYork from "../images/NewYork.jpg";

const Home = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const menuOptions = [
    { title: "🌍 Explore Destinations", path: "/destinations" },
    { title: "🧳 Tour Packages", path: "/packages" },
    { title: "🏨 Hotels", path: "/hotels" },
    { title: "✈️ Flights", path: "/flights" },
    { title: "📝 My Bookings", path: "/bookings" },
  ];

  const featuredDestinations = [
    { name: "Paris", image: Paris },
    { name: "Bali", image: Bali },
    { name: "New York", image: NewYork },
  ];

  const popularPackages = [
    { id: 1, name: "Adventure Trip", price: "$1200", image: "https://source.unsplash.com/300x200/?adventure" },
    { id: 2, name: "Beach Holiday", price: "$900", image: "https://source.unsplash.com/300x200/?beach" },
    { id: 3, name: "Cultural Tour", price: "$700", image: "https://source.unsplash.com/300x200/?culture" },
  ];

  const testimonials = [
    { name: "John Doe", comment: "Amazing experience! Highly recommended." },
    { name: "Jane Smith", comment: "Best travel portal ever, loved the packages." },
  ];

  return (
    <div className="home-container">
      <h1>🏠 Welcome to Travel & Tourism</h1>

      <h2>Quick Links</h2>
      <div className="menu-grid">
        {menuOptions.map((option, index) => (
          <Link key={index} to={option.path} className="menu-card">
            <h3>{option.title}</h3>
          </Link>
        ))}
      </div>

      <h2>🌟 Featured Destinations</h2>
      <div className="scroll-container">
        {featuredDestinations.map((dest, index) => (
          <div key={index} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <h4>{dest.name}</h4>
          </div>
        ))}
      </div>
      <div className="view-more">
        <Link to="/destinations">View all destinations →</Link>
      </div>

      <h2>🧳 Popular Packages</h2>
      <div className="scroll-container">
        {popularPackages.map((pkg) => (
          <div key={pkg.id} className="package-item">
            <img src={pkg.image} alt={pkg.name} />
            <div>
              <h4>{pkg.name}</h4>
              <p>{pkg.price}</p>
              <Link to={`/book/${pkg.id}`} className="book-btn">Book Now</Link>
            </div>
          </div>
        ))}
      </div>

      <h2>🔥 Special Deals</h2>
      <div className="deals-banner">
        <h3>Summer Sale: Up to 30% off on selected destinations!</h3>
      </div>

      <h2>💬 What Our Travelers Say</h2>
      <div className="scroll-container">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p>"{t.comment}"</p>
            <h5>- {t.name}</h5>
          </div>
        ))}
      </div>

      <h2>📝 My Bookings</h2>
      {bookings.length > 0 ? (
        <div className="scroll-container">
          {bookings.map((b, index) => (
            <div key={index} className="booking-card">
              <img src={b.image} alt={b.name} />
              <div>
                <h4>{b.name}</h4>
                <p>{b.price}</p>
                <p className="confirmed">✅ Seat Confirmed</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings yet. Book your next adventure!</p>
      )}
    </div>
  );
};

export default Home;
