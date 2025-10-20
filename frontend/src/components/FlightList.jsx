import React, { useEffect, useState, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./FlightList.css";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getFlights = async () => {
      try {
        const res = await API.get("/flights");
        setFlights(res.data);
      } catch (err) {
        console.error("Error loading flights:", err);
      }
    };
    getFlights();
  }, []);

  const handleBook = async (flightId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const flight = flights.find((f) => f._id === flightId);
    if (!flight) return;

    if (flight.bookedSeats >= flight.totalSeats) {
      alert("No seats available!");
      return;
    }

    try {
      await API.post("/bookings", { itemId: flightId, type: "flight" });
      setFlights((prev) =>
        prev.map((f) =>
          f._id === flightId ? { ...f, bookedSeats: f.bookedSeats + 1 } : f
        )
      );
      alert("Flight booked successfully!");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="flight-list">
      <h2>✈️ Flights</h2>
      <div className="flights">
        {flights.map((f) => (
          <div key={f._id} className="flight-card">
            <div className="flight-header">
              {f.image && <img src={f.image} alt={f.airline} className="flight-logo" />}
              <h3>{f.airline}</h3>
            </div>
            <div className="flight-info">
              <p>{f.from} ➡️ {f.to}</p>
              <p>₹{f.price}</p>
              <p>Departure: {new Date(f.departure).toLocaleString()}</p>
              <p>Arrival: {new Date(f.arrival).toLocaleString()}</p>
              <p>
                Seats: {f.bookedSeats} booked / {f.totalSeats} total
              </p>
              <button
                className="book-btn"
                onClick={() => handleBook(f._id)}
                disabled={f.bookedSeats >= f.totalSeats}
              >
                {f.bookedSeats >= f.totalSeats ? "Sold Out" : "Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
