import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const location = useLocation();
  const { type, name } = location.state || {}; // get type and name passed via Link
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    // Simulated data (you can later connect backend)
    if (type === "flight") {
      setAvailability([
        { id: 1, seat: "A1", status: "Available" },
        { id: 2, seat: "A2", status: "Booked" },
        { id: 3, seat: "B1", status: "Available" },
        { id: 4, seat: "B2", status: "Available" },
      ]);
    } else if (type === "hotel") {
      setAvailability([
        { id: 1, room: "101", type: "Deluxe", status: "Available" },
        { id: 2, room: "102", type: "Suite", status: "Booked" },
        { id: 3, room: "103", type: "Standard", status: "Available" },
      ]);
    } else if (type === "restaurant") {
      setAvailability([
        { id: 1, table: "T1", capacity: 4, status: "Available" },
        { id: 2, table: "T2", capacity: 2, status: "Booked" },
        { id: 3, table: "T3", capacity: 6, status: "Available" },
      ]);
    }
  }, [type]);

  return (
    <div className="booking-page">
      <h2>Booking Details</h2>
      <h3>{name ? `You are booking: ${name}` : "Select an option"}</h3>
      <h4>Type: {type ? type.toUpperCase() : "N/A"}</h4>

      <div className="availability-list">
        {type === "flight" &&
          availability.map((seat) => (
            <div
              key={seat.id}
              className={`availability-card ${seat.status === "Booked" ? "booked" : "available"}`}
            >
              <p>Seat No: {seat.seat}</p>
              <p>Status: {seat.status}</p>
              {seat.status === "Available" && <button className="confirm-btn">Select Seat</button>}
            </div>
          ))}

        {type === "hotel" &&
          availability.map((room) => (
            <div
              key={room.id}
              className={`availability-card ${room.status === "Booked" ? "booked" : "available"}`}
            >
              <p>Room No: {room.room}</p>
              <p>Type: {room.type}</p>
              <p>Status: {room.status}</p>
              {room.status === "Available" && <button className="confirm-btn">Book Room</button>}
            </div>
          ))}

        {type === "restaurant" &&
          availability.map((table) => (
            <div
              key={table.id}
              className={`availability-card ${table.status === "Booked" ? "booked" : "available"}`}
            >
              <p>Table ID: {table.table}</p>
              <p>Seats: {table.capacity}</p>
              <p>Status: {table.status}</p>
              {table.status === "Available" && <button className="confirm-btn">Reserve</button>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingPage;
