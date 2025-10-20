//frontend/src/components/Destinations.jsx
import React, { useState } from "react";
import "./Destinations.css";
import Paris from "../images/Paris.webp";
import Bali from "../images/Bali.jpg";
import NewYork from "../images/NewYork.jpg";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredDestinations = [
    { name: "Paris", image: Paris },
    { name: "Bali", image: Bali },
    { name: "New York", image: NewYork },
    { name: "Tokyo", image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a" },
  ];

  // ✅ Filter destinations based on search
  const filteredDestinations = featuredDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="destinations-container">
      <h2 className="destinations-title">🌟 Featured Destinations</h2>

      {/* ✅ Search bar */}
      <input
        type="text"
        placeholder="🔍 Search destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="destinations-list">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <div className="destination-card" key={index}>
              <img src={dest.image} alt={dest.name} />
              <h4>{dest.name}</h4>
            </div>
          ))
        ) : (
          <p className="no-results">No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default Destinations;
