// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

// images
import Paris from "../assets/Paris1.jpg";
import Bali from "../images/Bali.jpg";
import NewYork from "../images/NewYork.jpg";
import Summersale from "../images/Summersale.jpg";
import Wintersale from "../images/wintersale.jpg";
import Cityexplorer from "../images/cityexplorer.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // safe parsing with defaults
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setBookings(storedBookings);
    setUser(storedUser);

    const handleStorageUpdate = () => {
      setBookings(JSON.parse(localStorage.getItem("bookings") || "[]"));
    };
    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

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
    const newBooking = { name: pkg.name, image: pkg.image, price: pkg.price, type: "Package" };
    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    alert(`✅ Package booked: ${pkg.name}`);
  };

  const handleCancel = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <div className="home-container">
      <h1>🏠 Welcome to Travel & Tourism</h1>

      {/* Featured Destinations */}
      <section className="section-destinations">
        <h2>🌟 Featured Destinations</h2>
        <div className="scroll-container">
          {featuredDestinations.map((dest, i) => (
            <div key={i} className="destination-card">
              <img src={dest.image} alt={dest.name} />
              <h4>{dest.name}</h4>
            </div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/destinations">View all destinations →</Link>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="section-packages">
        <h2>🧳 Popular Packages</h2>
        <div className="scroll-container">
          {popularPackages.map((pkg) => (
            <div key={pkg.id} className="package-item">
              <img src={pkg.image} alt={pkg.name} />
              <div className="package-details">
                <h4>{pkg.name}</h4>
                <p>{pkg.price}</p>
                <button className="book-btn" onClick={() => handleBook(pkg)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Deals (format preserved) */}
      <section className="special-deals section">
        <h2>🔥 Special Deals</h2>
        <div className="special-deals-container">
          <div className="left-deals">
            {specialDeals.slice(0, 2).map((deal) => (
              <div className="deal-card" key={deal.id}>
                <img src={deal.image} alt={deal.title} />
                <div className="deal-content">
                  <h4>{deal.title}</h4>
                  <p>{deal.description}</p>
                  <Link to="/packages" className="book-btn">Book Now</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="right-deal">
            <div className="deal-card full-height">
              <img src={specialDeals[2].image} alt={specialDeals[2].title} />
              <div className="deal-content">
                <h4>{specialDeals[2].title}</h4>
                <p>{specialDeals[2].description}</p>
                <Link to="/packages" className="book-btn">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-testimonials">
        <h2>💬 What Our Travelers Say</h2>
        <div className="scroll-container">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.comment}"</p>
              <h5>- {t.name}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* My Bookings */}
      <section className="section-bookings">
        <h2>📝 My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="scroll-container">
            {bookings.map((b, i) => (
              <div key={i} className="booking-card">
                <img src={b.image} alt={b.name} />
                <div className="booking-details">
                  <h4>{b.name}</h4>
                  <p>{b.price}</p>
                  <p className="confirmed">✅ Booking Confirmed</p>
                  <button className="cancel-btn" onClick={() => handleCancel(i)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings yet. Book your next adventure!</p>
        )}
      </section>
    </div>
  );
};

export default Home;
