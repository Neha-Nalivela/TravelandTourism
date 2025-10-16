import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancel = (index) => {
    if (!user) {
      alert("⚠️ Please log in to cancel a booking!");
      return;
    }

    const updated = [...bookings];
    const cancelled = updated.splice(index, 1)[0];
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
    alert(`❌ Booking for "${cancelled.name}" cancelled.`);
  };

  const handlePayment = (booking) => {
    navigate("/payment", { state: { booking } });
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
          {bookings.map((b, index) => (
            <div key={index} className="booking-card">
              <img src={b.image} alt={b.name} />
              <div>
                <h4>{b.name}</h4>
                <p>Type: {b.type}</p>
                {b.location && <p>Location: {b.location}</p>}
                <p>Price: {b.price}</p>
                <p>Status: {b.status || "Confirmed"}</p>

                {b.status !== "Paid" && (
                  <button className="pay-btn" onClick={() => handlePayment(b)}>
                    💳 Pay Now
                  </button>
                )}

                <button className="cancel-btn" onClick={() => handleCancel(index)}>
                  Cancel
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
