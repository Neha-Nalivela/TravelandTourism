import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>🏠 Welcome to Travel & Tourism</h2>;
}

function Login() {
  return <h2>🔑 Login Page</h2>;
}

function Destinations() {
  return <h2>🌍 Destinations</h2>;
}

function App() {
  return (
    <Router>
      <nav style={{ padding: "20px", background: "#eee" }}>
        <Link to="/" style={{ margin: "10px" }}>Home</Link>
        <Link to="/destinations" style={{ margin: "520px" }}>Destinations</Link>
        <Link to="/login" style={{ margin: "250px" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
    </Router>
  );
}

export default App;
