// src/App.js
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
export const AppContext = createContext(); // ✅ Create and export context

function App() {
  const [user, setUser] = useState(null); // ✅ context state

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
     
<nav style={{ display: "flex", gap: "20px", padding: "20px", background: "#eee" }}>
  <Link to="/">Home</Link>
  <Link to="/destinations">Destinations</Link>
  {!user ? (
    <Link to="/login">Login</Link>
  ) : (
    <>
      <span>Welcome, {user.name}</span>
      <button
        onClick={() => setUser(null)}
        style={{ background: "none", border: "1px solid #888", padding: "5px 10px" }}
      >
        Logout
      </button>
    </>
  )}
</nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
