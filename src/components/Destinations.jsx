// src/components/Destinations.js
import React from "react";

const Destinations = () => {
  const featuredDestinations = [
    { name: "Paris", image: "https://source.unsplash.com/300x200/?paris" },
    { name: "Bali", image: "https://source.unsplash.com/300x200/?bali" },
    { name: "New York", image: "https://source.unsplash.com/300x200/?newyork" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginTop: "50px" }}>🌟 Featured Destinations</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          padding: "10px 0",
        }}
      >
        {featuredDestinations.map((dest, index) => (
          <div
            key={index}
            style={{
              minWidth: "250px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h4 style={{ padding: "10px" }}>{dest.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
