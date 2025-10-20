//frontend/src/components/Login.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const ADMIN_SECRET_CODE = "supersecret"; // Optional UI code

  const handleAdminClick = () => {
    setShowAdminPrompt(true);
  };

  const handleAdminCodeSubmit = () => {
    if (adminCode === ADMIN_SECRET_CODE) {
      alert("Admin code correct! Please login with your admin credentials.");
    } else {
      alert("Wrong code! Access denied.");
    }
    setShowAdminPrompt(false);
  };

  const handleSubmit = async () => {
    if (!credentials.email || !credentials.password) {
      setMsg("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMsg(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();

      // Store user with isAdmin
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setMsg("Welcome " + data.name);

      // Redirect admin to admin dashboard
      if (data.isAdmin) {
        navigate("/admin");
        return;
      }

      // Redirect normal users
      if (location.state?.from) {
        if (location.state.booking) {
          const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
          localStorage.setItem(
            "bookings",
            JSON.stringify([...existingBookings, { ...location.state.booking, userEmail: data.email }])
          );
          window.dispatchEvent(new Event("storage"));
          alert(`✅ Booking confirmed for ${location.state.booking.name}`);
        }
        navigate(location.state.from);
      } else {
        navigate("/"); // normal user home
      }
    } catch (error) {
      console.error(error);
      setMsg("Server error, try again later.");
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="login-box">
      <h3>Login</h3>
      {msg && <p>{msg}</p>}
      <p>
        <input
          type="email"
          placeholder="Email address"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </p>
      <button onClick={handleSubmit}>Login</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>

      {/* Optional Admin Code UI */}
      <p>
        <button onClick={handleAdminClick}>Admin</button>
      </p>

      {showAdminPrompt && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Enter admin code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />
          <button onClick={handleAdminCodeSubmit}>Submit Code</button>
        </div>
      )}
    </div>
  );
}
