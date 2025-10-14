// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!credentials.email || !credentials.password) {
      setMsg("Please enter email and password.");
      return;
    }

    // ✅ Fake login success
    setUser({
      name: credentials.email.split("@")[0], // just use part of email as name
      email: credentials.email,
      token: "dummy-token",
    });

    setMsg("Welcome " + credentials.email);
    navigate("/"); // redirect to home
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
