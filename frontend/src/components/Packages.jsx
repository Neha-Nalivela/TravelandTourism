import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./Packages.css";

const Packages = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")) || null);
  }, [user]);

  const tourPackages = [
    {
      id: 1,
      name: "European Explorer",
      image: "https://source.unsplash.com/400x250/?europe,travel",
      price: "₹2500",
      details: ["🏨 Hotels: Paris, Rome, Amsterdam", "📍 Places: Eiffel Tower, Colosseum, Venice Canals"],
    },
    {
      id: 2,
      name: "Tropical Adventure",
      image: "https://source.unsplash.com/400x250/?tropical,beach",
      price: "₹1800",
      details: ["🚗 Transport: Jeep Safari, Boat Ride", "📍 Places: Bali Beaches, Coral Islands", "🍽️ Food: Local seafood restaurants"],
    },
    {
      id: 3,
      name: "Cultural Escape",
      image: "https://source.unsplash.com/400x250/?temple,culture",
      price: "₹1400",
      details: ["📍 Places: Kyoto Shrines, Tokyo Towers", "🍴 Restaurants: Authentic Japanese dining"],
    },
  ];

  const handleBook = (pkg) => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/packages", booking: { ...pkg, type: "Package" } } });
      return;
    }

    const newBooking = { ...pkg, type: "Package", userEmail: currentUser.email };
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
    window.dispatchEvent(new Event("storage"));
    alert(`✅ Package booked successfully: ${pkg.name}`);
  };

  return (
    <div className="packages-container">
      <h1>🧳 Tour Packages</h1>
      <p>Choose from our hand-picked combinations of destinations, hotels, and experiences!</p>

      <div className="package-grid">
        {tourPackages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.name} />
            <div className="package-info">
              <h3>{pkg.name}</h3>
              <p className="price">{pkg.price}</p>
              <ul>
                {pkg.details.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <button className="book-btn" onClick={() => handleBook(pkg)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
