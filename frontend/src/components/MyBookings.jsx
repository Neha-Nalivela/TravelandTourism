import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      alert("Booking cancelled");
    } catch (err) {
      alert("Error cancelling booking");
    }
  };

  if (!user) return <p>⚠️ Please login to view your bookings.</p>;

  return (
    <div className="my-bookings">
      <h2>📝 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <img src={b.image} alt={b.name} />
              <h4>{b.name}</h4>
              <p>Type: {b.type}</p>
              <p>Price: ₹{b.price}</p>
              <button onClick={() => handleCancel(b._id)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
