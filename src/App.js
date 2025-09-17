// src/App.js
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
export const AppContext = createContext(); // ✅ Create and export context

function Home() {
  return <h2>🏠 Welcome to Travel & Tourism</h2>;
}

function Destinations() {
  return <h2>🌍 Destinations</h2>;
}

function App() {
  const [user, setUser] = useState(null); // ✅ context state

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <nav style={{ display: "flex", gap: "20px", padding: "20px", background: "#eee" }}>
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
