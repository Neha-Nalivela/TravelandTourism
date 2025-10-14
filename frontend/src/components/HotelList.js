import React from "react";
import "./HotelList.css";

const HotelList = () => {
  const hotels = [
    {
      _id: 1,
      name: "The Grand Palace Hotel",
      location: "Goa",
      pricePerNight: 4500,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description: "A luxury beachfront hotel with premium suites and sea views.",
    },
    {
      _id: 2,
      name: "Mountain View Resort",
      location: "Manali",
      pricePerNight: 3200,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      description: "A peaceful stay surrounded by snow-capped mountains.",
    },
    {
      _id: 3,
      name: "City Lights Inn",
      location: "Mumbai",
      pricePerNight: 2800,
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      description: "Modern hotel in the heart of the city with rooftop dining.",
    },
  ];

  // ✅ Handle booking and store in localStorage
  const handleBook = (hotel) => {
    const newBooking = {
      name: hotel.name,
      image: hotel.image,
      price: `₹${hotel.pricePerNight} / night`,
      location: hotel.location,
      type: "Hotel",
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    alert(`🏨 Booking confirmed for ${hotel.name}!`);
  };

  return (
    <div className="hotel-list">
      <h2>🏨 Popular Hotels</h2>
      <div className="hotels">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Price/Night:</strong> ₹{hotel.pricePerNight}</p>
              <p><strong>Rating:</strong> {hotel.rating} ⭐</p>
              <p className="description">{hotel.description}</p>
              <button className="book-btn" onClick={() => handleBook(hotel)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
