import React, { useEffect, useState, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import FlightBooking from "./FlightBooking";
import "./FlightList.css";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
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

  if (selectedFlight)
    return <FlightBooking flight={selectedFlight} onBooked={() => {
      setSelectedFlight(null);
      // refresh flights
      setFlights(prev => [...prev]);
    }} />;

  return (
    <div className="flight-list">
      <h2>✈️ Flights</h2>
      <div className="flights">
        {flights.map(f => (
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
              <p>Seats booked: {f.bookedSeats.length} / {f.totalSeats}</p>
              <button
                onClick={() => {
                  if (!user) navigate("/login");
                  else setSelectedFlight(f);
                }}
                disabled={f.bookedSeats.length >= f.totalSeats}
              >
                {f.bookedSeats.length >= f.totalSeats ? "Sold Out" : "Select Seats"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
