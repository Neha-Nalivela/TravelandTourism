import React, { createContext } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const AppContext = createContext();

function Home() {
  return <h2>🏠 Welcome to Travel & Tourism</h2>;
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
