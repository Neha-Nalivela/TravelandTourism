// src/components/Destinations.jsx
import React from "react";
import Paris from "../images/Paris.webp";
import Bali from "../images/Bali.jpg";
import NewYork from "../images/NewYork.jpg"; // ✅ Make sure file name has no space

const Destinations = () => {
  const featuredDestinations = [
    { name: "Paris", image: Paris },
    { name: "Bali", image: Bali },
    { name: "New York", image: NewYork },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginTop: "50px", textAlign: "center" }}>
        🌟 Featured Destinations
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          padding: "20px 0",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {featuredDestinations.map((dest, index) => (
          <div
            key={index}
            style={{
              width: "250px",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
            }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <h4 style={{ padding: "10px", textAlign: "center" }}>{dest.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
