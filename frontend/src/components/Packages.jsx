import React, { useEffect, useState, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Packages.css";

const Packages = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await API.get("/packages");  // backend API
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, []);

  const handleBook = async (pkg) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post("/bookings", { ...pkg, type: "package" });
      alert("Package booked successfully!");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="packages-container">
      <h1>🧳 Tour Packages</h1>
      <div className="package-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <img src={pkg.image} alt={pkg.name} />
            <div className="package-info">
              <h3>{pkg.name}</h3>
              <p className="price">₹{pkg.price}</p>
              <p>{pkg.description}</p>
              <button className="book-btn" onClick={() => handleBook(pkg)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
