import React from "react";
import "./FlightList.css";

const FlightList = () => {
  const flights = [
    {
      id: 1,
      airline: "IndiGo",
      from: "Hyderabad",
      to: "Delhi",
      departure: "08:30 AM",
      arrival: "10:45 AM",
      duration: "2h 15m",
      price: "₹4800",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/IndiGo_Logo.svg",
    },
    {
      id: 2,
      airline: "Air India",
      from: "Mumbai",
      to: "Chennai",
      departure: "11:00 AM",
      arrival: "01:10 PM",
      duration: "2h 10m",
      price: "₹5400",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/4b/Air_India_Logo.svg",
    },
    {
      id: 3,
      airline: "SpiceJet",
      from: "Bangalore",
      to: "Goa",
      departure: "03:15 PM",
      arrival: "04:30 PM",
      duration: "1h 15m",
      price: "₹3200",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/21/SpiceJet_Logo.svg",
    },
  ];

  const handleBook = (flight) => {
    const newBooking = {
      name: flight.airline,
      image: flight.logo,
      price: flight.price,
      type: "Flight",
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
    alert(`✈️ Flight booked successfully!`);
  };

  return (
    <div className="flight-list">
      <h2>Available Flights</h2>
      <div className="flights">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-header">
              <img src={flight.logo} alt={flight.airline} className="flight-logo" />
              <h3>{flight.airline}</h3>
            </div>
            <div className="flight-info">
              <p><strong>From:</strong> {flight.from}</p>
              <p><strong>To:</strong> {flight.to}</p>
              <p><strong>Departure:</strong> {flight.departure}</p>
              <p><strong>Arrival:</strong> {flight.arrival}</p>
              <p><strong>Duration:</strong> {flight.duration}</p>
              <p><strong>Price:</strong> {flight.price}</p>
              <button className="book-btn" onClick={() => handleBook(flight)}>
                Book Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
