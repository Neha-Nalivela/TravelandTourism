// src/components/Home.js
import React from "react";
import Paris1 from "../assets/Paris1.jpg"
import { Link } from "react-router-dom";

const Home = () => {
  const menuOptions = [
    { title: "🌍 Explore Destinations", path: "/destinations" },
    { title: "🧳 Tour Packages", path: "/packages" },
    { title: "🏨 Hotels", path: "/hotels" },
    { title: "✈️ Flights", path: "/flights" },
    { title: "📝 My Bookings", path: "/bookings" },
  ];

  const featuredDestinations = [
    { name: "Paris", image: "Paris1.jpg" },
    { name: "Bali", image: "https://source.unsplash.com/300x200/?bali" },
    { name: "New York", image: "https://source.unsplash.com/300x200/?newyork" },
  ];

  const popularPackages = [
    { name: "Adventure Trip", price: "$1200", image: "https://source.unsplash.com/300x200/?adventure" },
    { name: "Beach Holiday", price: "$900", image: "https://source.unsplash.com/300x200/?beach" },
    { name: "Cultural Tour", price: "$700", image: "https://source.unsplash.com/300x200/?culture" },
  ];

  const testimonials = [
    { name: "John Doe", comment: "Amazing experience! Highly recommended." },
    { name: "Jane Smith", comment: "Best travel portal ever, loved the packages." },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Welcome to Travel & Tourism</h1>

      {/* Menu Cards */}
      <h2 style={{ marginTop: "30px" }}>Quick Links</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {menuOptions.map((option, index) => (
          <Link key={index} to={option.path} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", textAlign: "center", transition: "0.3s" }}>
              <h3>{option.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Destinations */}
      <h2 style={{ marginTop: "50px" }}>🌟 Featured Destinations</h2>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "10px 0" }}>
        {featuredDestinations.map((dest, index) => (
          <div key={index} style={{ minWidth: "250px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h4 style={{ padding: "10px" }}>{dest.name}</h4>
          </div>
        ))}
      </div>

      {/* Popular Packages */}
      <h2 style={{ marginTop: "50px" }}>🧳 Popular Packages</h2>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "10px 0" }}>
        {popularPackages.map((pkg, index) => (
          <div key={index} style={{ minWidth: "250px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <img src={pkg.image} alt={pkg.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <div style={{ padding: "10px" }}>
              <h4>{pkg.name}</h4>
              <p>{pkg.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Promotions / Deals Banner */}
      <h2 style={{ marginTop: "50px" }}>🔥 Special Deals</h2>
      <div style={{ padding: "20px", background: "#ffd700", borderRadius: "10px", marginTop: "10px" }}>
        <h3>Summer Sale: Up to 30% off on selected destinations!</h3>
      </div>

      {/* Testimonials */}
      <h2 style={{ marginTop: "50px" }}>💬 What Our Travelers Say</h2>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "10px 0" }}>
        {testimonials.map((t, index) => (
          <div key={index} style={{ minWidth: "250px", padding: "20px", background: "#f5f5f5", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <p>"{t.comment}"</p>
            <h5 style={{ marginTop: "10px", fontWeight: "bold" }}>- {t.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
