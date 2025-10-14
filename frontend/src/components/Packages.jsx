// src/components/Packages.js
import React from "react";
import "./Packages.css";

const Packages = () => {
  const tourPackages = [
    {
      id: 1,
      name: "European Explorer",
      image: "https://source.unsplash.com/400x250/?europe,travel",
      price: "₹2500",
      details: [
        "🏨 Hotels: Paris, Rome, Amsterdam",
        "📍 Places: Eiffel Tower, Colosseum, Venice Canals",
      ],
    },
    {
      id: 2,
      name: "Tropical Adventure",
      image: "https://source.unsplash.com/400x250/?tropical,beach",
      price: "₹1800",
      details: [
        "🚗 Transport: Jeep Safari, Boat Ride",
        "📍 Places: Bali Beaches, Coral Islands",
        "🍽️ Food: Local seafood restaurants",
      ],
    },
    {
      id: 3,
      name: "Cultural Escape",
      image: "https://source.unsplash.com/400x250/?temple,culture",
      price: "₹1400",
      details: [
        "📍 Places: Kyoto Shrines, Tokyo Towers",
        "🍴 Restaurants: Authentic Japanese dining",
      ],
    },
  ];

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
                {pkg.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
