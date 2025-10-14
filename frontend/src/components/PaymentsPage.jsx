import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking; // passed from MyBookings or BookingPage

  if (!booking) {
    return <p>No booking selected for payment.</p>;
  }

  const handlePayment = () => {
    const options = {
      key: "rzp_test_YourTestKey", // Replace with your Razorpay Test Key
      amount: parseInt(booking.price.replace(/[^\d]/g, "")) * 100, // convert ₹ to paise
      currency: "INR",
      name: "Travel & Tourism",
      description: `Booking: ${booking.name}`,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        // Update booking status in localStorage
        const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const updatedBookings = existingBookings.map((b) =>
          b.name === booking.name ? { ...b, status: "Paid" } : b
        );
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        // Redirect to MyBookings
        navigate("/bookings");
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Payment for {booking.name}</h2>
      <p>Amount: {booking.price}</p>
      <button
        onClick={handlePayment}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
