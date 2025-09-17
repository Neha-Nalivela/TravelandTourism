// src/components/Register.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { setUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setMsg("All fields are required.");
      return;
    }

    // ✅ Fake registration success
    setUser({
      name: newUser.name,
      email: newUser.email,
      token: "dummy-token",
    });

    setMsg("Registered successfully!");
    navigate("/login"); // go to login after register
  };

  return (
    <div className="register-box">
      <h3>Register</h3>
      {msg && <p>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
