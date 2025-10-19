import React, { useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../App";

const packages = [
  { id: 1, name: "Adventure Trip", price: "$1200", image: "https://source.unsplash.com/300x200/?adventure" },
  { id: 2, name: "Beach Holiday", price: "$900", image: "https://source.unsplash.com/300x200/?beach" },
  { id: 3, name: "Cultural Tour", price: "$700", image: "https://source.unsplash.com/300x200/?culture" },
];

const BookingPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AppContext);
  const selectedPackage = packages.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!user && selectedPackage) {
      navigate("/login", { state: { from: location.pathname, booking: { ...selectedPackage, type: "Package" } } });
    }
  }, [user, selectedPackage, navigate, location.pathname]);

  const handleConfirmBooking = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname, booking: { ...selectedPackage, type: "Package" } } });
      return;
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, { ...selectedPackage, type: "Package", userEmail: user.email }]));
    window.dispatchEvent(new Event("storage"));
    alert(`✅ Booking Confirmed for ${selectedPackage.name}`);
    navigate("/");
  };

  if (!selectedPackage) return <p>Package not found</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Booking Confirmation</h2>
      <img src={selectedPackage.image} alt={selectedPackage.name} width="300" />
      <h3>{selectedPackage.name}</h3>
      <p>Price: {selectedPackage.price}</p>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookingPackage;
