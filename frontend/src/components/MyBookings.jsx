import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      setBookings([]); // clear bookings if not logged in
      return;
    }

    // Fetch bookings from backend
    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error(err);
        setBookings([]);
      });
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!user?.token) {
      navigate("/login", { state: { from: "/bookings" } });
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      setBookings(bookings.filter((b) => b._id !== bookingId));
      alert("❌ Booking cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Error cancelling booking");
    }
  };

  return (
    <div className="my-bookings">
      <h2>📝 My Bookings</h2>

      {!user ? (
        <p>⚠️ Please login to view your bookings.</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <img src={b.image} alt={b.name} />
              <h4>{b.name}</h4>
              <p>Type: {b.type}</p>
              <p>Price: {b.price}</p>
              <button onClick={() => handleCancel(b._id)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
