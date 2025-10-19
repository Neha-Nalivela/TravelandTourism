import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (user && user.email) {
      // Filter only the logged-in user's bookings
      const userBookings = storedBookings.filter(
        (b) => b.userEmail === user.email
      );
      setBookings(userBookings);
    } else {
      // If not logged in, clear bookings
      setBookings([]);
    }
  }, [user]);

  const handleCancel = (index) => {
    if (!user) {
      navigate("/login", { state: { from: "/bookings" } });
      return;
    }

    const updatedBookings = [...bookings];
    const cancelled = updatedBookings.splice(index, 1)[0];

    // Update localStorage (remove cancelled booking globally)
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newAllBookings = allBookings.filter(
      (b) => !(b.userEmail === user.email && b.name === cancelled.name)
    );
    localStorage.setItem("bookings", JSON.stringify(newAllBookings));

    setBookings(updatedBookings);
    alert(`❌ Booking for "${cancelled.name}" has been cancelled.`);
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
          {bookings.map((b, i) => (
            <div key={i} className="booking-card">
              <img src={b.image} alt={b.name} />
              <h4>{b.name}</h4>
              <p>Type: {b.type}</p>
              <p>Price: {b.price}</p>
              <button onClick={() => handleCancel(i)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
