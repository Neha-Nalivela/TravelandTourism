// frontend/src/components/MyBookings.jsx
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import API from "./api";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch bookings
  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings for user:", user._id);
        const res = await API.get("/bookings");
        console.log("Bookings fetched:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling booking:", err.response?.data || err.message);
      alert("Failed to cancel booking.");
    }
  };

  if (!user) return <p>⚠️ Please login to view your bookings.</p>;

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="my-bookings">
      <h2>📝 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              {b.image && <img src={b.image} alt={b.name} />}
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
