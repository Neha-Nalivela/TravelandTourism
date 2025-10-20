//frontend/src/components/BookingPage.js
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, name } = location.state || {};
  const { user } = useContext(AppContext);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (type === "flight") {
      setAvailability([{ id: 1, seat: "A1", status: "Available" }, { id: 2, seat: "A2", status: "Booked" }]);
    } else if (type === "hotel") {
      setAvailability([{ id: 1, room: "101", type: "Deluxe", status: "Available" }, { id: 2, room: "102", type: "Suite", status: "Booked" }]);
    }
  }, [type]);

  const handleBook = (item) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname, booking: { ...item, type } } });
      return;
    }
    alert(`✅ You booked ${name || item.room || item.seat}!`);
  };

  return (
    <div>
      <h2>Booking Details</h2>
      <h3>{name ? `Booking: ${name}` : "Select an option"}</h3>
      {availability.map((item) => (
        <div key={item.id}>
          {type === "flight" && <p>Seat: {item.seat}</p>}
          {type === "hotel" && <p>Room: {item.room} ({item.type})</p>}
          <p>Status: {item.status}</p>
          {item.status === "Available" && <button onClick={() => handleBook(item)}>Book</button>}
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
