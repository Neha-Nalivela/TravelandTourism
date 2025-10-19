import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function MenuDropdown({ show, setShow, setShowProfile }) {
  return (
    <>
      <FaBars
        size={24}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setShow(!show);
          setShowProfile(false);
        }}
      />
      {show && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "80px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            padding: "10px 15px",
            zIndex: 1000,
          }}
        >
          <Link to="/" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            Home
          </Link>
          <Link to="/destinations" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            Destinations
          </Link>
          <Link to="/hotels" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            Book Hotels
          </Link>
          <Link to="/flights" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            Book Flights
          </Link>
          <Link to="/packages" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            Packages
          </Link>
          <Link to="/bookings" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
            My Bookings
          </Link>
        </div>
      )}
    </>
  );
}

export default MenuDropdown;
