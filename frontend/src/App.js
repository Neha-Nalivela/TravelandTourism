import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import Packages from "./components/Packages";
import HotelList from "./components/HotelList";
import FlightList from "./components/FlightList";
import BookingPage from "./components/BookingPage";
import BookPackage from "./components/BookingPackage";
import MyBookings from "./components/MyBookings";
import PaymentPage from "./components/PaymentsPage";
import AdminDashboard from "./components/AdminDashboard";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Sync user with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("bookings"); // optional: clear bookings too
    window.location.href = "/";
  };

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 25px",
            background: "#eee",
            position: "relative",
          }}
        >
          <h2>Travel & Tourism</h2>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {/* Menu Icon */}
            <FaBars
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowMenu(!showMenu);
                setShowProfile(false);
              }}
            />

            {/* Profile Icon */}
            <FaUserCircle
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowMenu(false);
              }}
            />
          </div>

          {/* Menu Dropdown */}
          {showMenu && (
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
              <Link
      to="/"
      style={{ display: "block", margin: "8px 0" }}
      onClick={() => setShowMenu(false)}
    >
      Home
    </Link>
    <Link
      to="/destinations"
      style={{ display: "block", margin: "8px 0" }}
      onClick={() => setShowMenu(false)}
    ></Link>
              <Link
                to="/destinations"
                style={{ display: "block", margin: "8px 0" }}
                onClick={() => setShowMenu(false)}
              >
                Destinations
              </Link>
              <Link
                to="/hotels"
                style={{ display: "block", margin: "8px 0" }}
                onClick={() => setShowMenu(false)}
              >
                Book Hotels
              </Link>
              <Link
                to="/flights"
                style={{ display: "block", margin: "8px 0" }}
                onClick={() => setShowMenu(false)}
              >
                Book Flights
              </Link>
              <Link
                to="/packages"
                style={{ display: "block", margin: "8px 0" }}
                onClick={() => setShowMenu(false)}
              >
                Packages
              </Link>
              <Link
                to="/bookings"
                style={{ display: "block", margin: "8px 0" }}
                onClick={() => setShowMenu(false)}
              >
                My Bookings
              </Link>
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "25px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "8px",
                padding: "10px 15px",
                zIndex: 1000,
              }}
            >
              {!user ? (
                <>
                  <Link
                    to="/login"
                    style={{ display: "block", margin: "8px 0" }}
                    onClick={() => setShowProfile(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    style={{ display: "block", margin: "8px 0" }}
                    onClick={() => setShowProfile(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span style={{ display: "block", marginBottom: "10px" }}>
                    Hello, {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      border: "none",
                      background: "#f44",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/book/:id" element={<BookPackage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
