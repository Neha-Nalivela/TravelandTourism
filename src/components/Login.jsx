// src/components/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/users/login`, credentials);

      if (!res.data || res.data.message === "Invalid user or password") {
        setMsg("Invalid email or password.");
        return;
      }

      // Success - Set user info from DB
      setUser({
        name: res.data.name,
        email: res.data.email,
        token: res.data.token, // if you later use JWT or token, replace this
      });
      setMsg("Welcome " + res.data.name);
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Server error. Try again later.");
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
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
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