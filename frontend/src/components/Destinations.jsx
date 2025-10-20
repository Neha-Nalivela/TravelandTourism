import React, { useEffect, useState } from "react";
import API from "./api";
import "./Destinations.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await API.get("/destinations");
        setDestinations(res.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="destinations-container">
      <h2 className="destinations-title">🌟 Featured Destinations</h2>
      <input
        type="text"
        placeholder="🔍 Search destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="destinations-list">
        {filtered.length > 0 ? filtered.map((dest) => (
          <div key={dest._id} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <h4>{dest.name}</h4>
          </div>
        )) : (
          <p className="no-results">No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default Destinations;
