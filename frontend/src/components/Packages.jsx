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
        const res = await API.get("/packages"); // backend API if exists
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  const handleBook = pkg => {
    if (!user) {
      navigate("/login");
      return;
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, { ...pkg, type: "Package", userEmail: user.email }]));
    alert(`✅ Booking Confirmed for ${pkg.name}`);
  };

  return (
    <div className="packages-container">
      <h1>🧳 Tour Packages</h1>
      <div className="package-grid">
        {packages.map(pkg => (
          <div className="package-card" key={pkg._id}>
            <img src={pkg.image} alt={pkg.name} />
            <h3>{pkg.name}</h3>
            <p>₹{pkg.price}</p>
            <button onClick={() => handleBook(pkg)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
