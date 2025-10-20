import React, { useEffect, useState, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getHotels = async () => {
      try {
        const res = await API.get("/hotels");
        setHotels(res.data);
      } catch (err) {
        console.error("Error loading hotels:", err);
      }
    };
    getHotels();
  }, []);

  const handleBook = async (hotelId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post("/bookings", { itemId: hotelId, type: "hotel" });
      alert("Hotel booked successfully!");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="hotels">
      <h2>🏨 Hotels</h2>
      <div className="list">
        {hotels.map((h) => (
          <div key={h._id} className="card">
            <img src={h.image} alt={h.name} />
            <h3>{h.name}</h3>
            <p>{h.location}</p>
            <p>₹{h.price}</p>
            <button onClick={() => handleBook(h._id)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
