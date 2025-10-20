import React, { useState } from "react";
import API from "./api";

const FlightBooking = ({ flight, onBooked }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 4 rows: A-D, number of seats per row
  const seatRows = ["A", "B", "C", "D"];
  const seatNumbers = Array.from({ length: flight.totalSeats / 4 }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = async () => {
    if (selectedSeats.length === 0) return alert("Select at least one seat");

    try {
      await API.post("/bookings", { itemId: flight._id, type: "flight", selectedSeats });
      alert("Flight booked successfully!");
      onBooked();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  // ⚡ Ensure bookedSeats is an array
  const bookedSeats = Array.isArray(flight.bookedSeats) ? flight.bookedSeats : [];

  return (
    <div>
      <h3>{flight.airline}</h3>
      <div className="seats-grid">
        {seatRows.map((row) =>
          seatNumbers.map((num) => {
            const seat = `${row}${num}`;
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            return (
              <button
                key={seat}
                disabled={isBooked}
                style={{ backgroundColor: isSelected ? "green" : isBooked ? "gray" : "white" }}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </button>
            );
          })
        )}
      </div>
      <button onClick={handleBook}>Book Selected Seats</button>
    </div>
  );
};

export default FlightBooking;
