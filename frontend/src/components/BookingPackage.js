import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const packages = [
  { id: 1, name: "Adventure Trip", price: "$1200", image: "https://source.unsplash.com/300x200/?adventure" },
  { id: 2, name: "Beach Holiday", price: "$900", image: "https://source.unsplash.com/300x200/?beach" },
  { id: 3, name: "Cultural Tour", price: "$700", image: "https://source.unsplash.com/300x200/?culture" },
];

const BookPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedPackage = packages.find((p) => p.id === parseInt(id));

  const handleConfirmBooking = () => {
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(selectedPackage);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));
    alert(`✅ Booking Confirmed for ${selectedPackage.name}`);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Booking Confirmation</h2>
      {selectedPackage ? (
        <div>
          <img src={selectedPackage.image} alt={selectedPackage.name} width="300" />
          <h3>{selectedPackage.name}</h3>
          <p>Price: {selectedPackage.price}</p>
          <button onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
      ) : (
        <p>Package not found.</p>
      )}
    </div>
  );
};

export default BookPackage;
