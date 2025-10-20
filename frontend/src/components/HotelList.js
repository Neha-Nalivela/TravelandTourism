import React, { useEffect, useState, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./HotelList.css";

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

    const hotel = hotels.find((h) => h._id === hotelId);
    if (!hotel) return;

    if (hotel.bookedRooms >= hotel.totalRooms) {
      alert("No rooms available!");
      return;
    }

    try {
      await API.post("/bookings", { itemId: hotelId, type: "hotel" });
      // Update local state after booking
      setHotels((prev) =>
        prev.map((h) =>
          h._id === hotelId ? { ...h, bookedRooms: h.bookedRooms + 1 } : h
        )
      );
      alert("Hotel booked successfully!");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="hotels">
      <h2>🏨 Hotels</h2>
      <div className="list">
        {hotels.map((h) => (
          <div key={h._id} className="hotel-card">
            <img src={h.image} alt={h.name} />
            <div className="hotel-info">
              <h3>{h.name}</h3>
              <p>{h.location}</p>
              <p>₹{h.pricePerNight}</p>
              <p>
                Rooms: {h.bookedRooms} booked / {h.totalRooms} total
              </p>
              <button
                className="book-btn"
                onClick={() => handleBook(h._id)}
                disabled={h.bookedRooms >= h.totalRooms}
              >
                {h.bookedRooms >= h.totalRooms ? "Sold Out" : "Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
