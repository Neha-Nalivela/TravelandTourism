import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = () => {
    if (!credentials.email || !credentials.password) {
      setMsg("Please enter email and password.");
      return;
    }

    const loggedInUser = {
      name: credentials.email.split("@")[0],
      email: credentials.email,
      token: "dummy-token",
    };

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setMsg("Welcome " + credentials.email);

    // Redirect back if coming from a booking
    if (location.state?.from) {
      if (location.state.booking) {
        const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        localStorage.setItem(
          "bookings",
          JSON.stringify([...existingBookings, { ...location.state.booking, userEmail: loggedInUser.email }])
        );
        window.dispatchEvent(new Event("storage"));
        alert(`✅ Booking confirmed for ${location.state.booking.name}`);
      }
      navigate(location.state.from);
    } else {
      navigate("/");
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
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
