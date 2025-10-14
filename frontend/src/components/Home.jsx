// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Paris from "../assets/Paris1.jpg";
import Bali from "../images/Bali.jpg";
import NewYork from "../images/NewYork.jpg";

// Make sure these files exist with correct extensions
import Summersale from "../images/Summersale.jpg";
import Wintersale from "../images/wintersale.jpg";
import Cityexplorer from "../images/cityexplorer.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(storedUser);
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

  const specialDeals = [
    { id: 1, title: "Summer Sale", description: "Up to 30% off on selected beach destinations!", image: Summersale },
    { id: 2, title: "Winter Wonderland", description: "25% off mountain resorts!", image: Wintersale },
    { id: 3, title: "City Explorer", description: "Book 2 nights, get 1 free in metropolitan cities!", image: Cityexplorer },
  ];

  const testimonials = [
    { name: "John Doe", comment: "Amazing experience! Highly recommended." },
    { name: "Jane Smith", comment: "Best travel portal ever, loved the packages." },
  ];

  const handleBook = (pkg) => {
    if (!user) {
      alert("⚠️ Please login to book a package!");
      navigate("/login");
      return;
    }

    const newBooking = {
      name: pkg.name,
      image: pkg.image,
      price: pkg.price,
      type: "Package",
    };
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
    setBookings([...existingBookings, newBooking]);
    alert(`✅ Package booked: ${pkg.name}`);
  };

  const handleCancel = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  return (
    <div className="home-container">
      <h1>🏠 Welcome to Travel & Tourism</h1>

      {/* Quick Links */}
      <h2>Quick Links</h2>
      <div className="menu-grid">
        {menuOptions.map((option, index) => (
          <Link key={index} to={option.path} className="menu-card">
            <h3>{option.title}</h3>
          </Link>
        ))}
      </div>

      {/* Featured Destinations */}
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

      {/* Popular Packages */}
      <h2>🧳 Popular Packages</h2>
      <div className="scroll-container">
        {popularPackages.map((pkg) => (
          <div key={pkg.id} className="package-item">
            <img src={pkg.image} alt={pkg.name} />
            <div>
              <h4>{pkg.name}</h4>
              <p>{pkg.price}</p>
              <button className="book-btn" onClick={() => handleBook(pkg)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Deals Full Page */}
      <h2>🔥 Special Deals</h2>
      <div className="special-deals-container">
        {/* Left Column */}
        <div className="left-deals">
          <div className="deal-card">
            <img src={specialDeals[0].image} alt={specialDeals[0].title} />
            <h4>{specialDeals[0].title}</h4>
            <p>{specialDeals[0].description}</p>
            <Link to="/packages" className="book-btn">Book Now</Link>
          </div>
          <div className="deal-card">
            <img src={specialDeals[1].image} alt={specialDeals[1].title} />
            <h4>{specialDeals[1].title}</h4>
            <p>{specialDeals[1].description}</p>
            <Link to="/packages" className="book-btn">Book Now</Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-deal">
          <div className="deal-card">
            <img src={specialDeals[2].image} alt={specialDeals[2].title} />
            <h4>{specialDeals[2].title}</h4>
            <p>{specialDeals[2].description}</p>
            <Link to="/packages" className="book-btn">Book Now</Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <h2>💬 What Our Travelers Say</h2>
      <div className="scroll-container">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p>"{t.comment}"</p>
            <h5>- {t.name}</h5>
          </div>
        ))}
      </div>

      {/* My Bookings */}
      <h2>📝 My Bookings</h2>
      {bookings.length > 0 ? (
        <div className="scroll-container">
          {bookings.map((b, index) => (
            <div key={index} className="booking-card">
              <img src={b.image} alt={b.name} />
              <div>
                <h4>{b.name}</h4>
                <p>{b.price}</p>
                {b.location && <p>Location: {b.location}</p>}
                <p className="confirmed">✅ Booking Confirmed</p>
                <button className="cancel-btn" onClick={() => handleCancel(index)}>Cancel</button>
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
