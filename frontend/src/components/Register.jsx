//frontend/src/components/Register.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const { setUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setMsg("All fields are required.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", newUser);
      // Save user in context & localStorage
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      setMsg("Registered successfully!");
      navigate("/"); // go to home or wherever
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMsg(error.response.data.message);
      } else {
        setMsg("Something went wrong!");
      }
    }
  };

  return (
    <div className="register-box">
      <h3>Register</h3>
      {msg && <p>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="email"
          placeholder="Email address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
