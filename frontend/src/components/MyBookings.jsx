// src/components/MyBookings.js
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext); // Check if user is logged in
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancel = (index) => {
    if (!user) {
      alert("⚠️ You must be logged in to cancel a booking!");
      return;
    }

    // Remove the booking at the specified index
    const updatedBookings = [...bookings];
    const removedBooking = updatedBookings.splice(index, 1)[0];

    // Update localStorage and state
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    alert(`❌ Booking for "${removedBooking.name}" has been cancelled.`);
  };

  return (
    <div className="my-bookings">
      <h2>📝 My Bookings</h2>
      {!user ? (
        <p>⚠️ Please login to view your bookings.</p>
      ) : bookings.length === 0 ? (
        <p>You haven't booked anything yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b, index) => (
            <div key={index} className="booking-card">
              <img src={b.image} alt={b.name} />
              <div>
                <h4>{b.name}</h4>
                <p>Type: {b.type}</p>
                <p>Price: {b.price}</p>
                {b.location && <p>Location: {b.location}</p>}
                <p className="confirmed">✅ Booking Confirmed</p>
                <button className="cancel-btn" onClick={() => handleCancel(index)}>
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
