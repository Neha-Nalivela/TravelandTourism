// src/components/AdminDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";

export default function AdminDashboard() {
  const { user } = useContext(AppContext);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [msg, setMsg] = useState("");

  // States for new items
  const [newFlight, setNewFlight] = useState({ airline: "", from: "", to: "", price: "", departure: "", arrival: "", image: "" });
  const [newHotel, setNewHotel] = useState({ name: "", location: "", pricePerNight: "", image: "", description: "" });
  const [newPackage, setNewPackage] = useState({ name: "", price: "", image: "", details: [] });
  const [newDestination, setNewDestination] = useState({ name: "", description: "", image: "" });

  const fetchData = async () => {
    try {
      const flightRes = await API.get("/flights");
      setFlights(flightRes.data);
      const hotelRes = await API.get("/hotels");
      setHotels(hotelRes.data);
      const packageRes = await API.get("/packages");
      setPackages(packageRes.data);
      const destRes = await API.get("/destinations");
      setDestinations(destRes.data);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching data");
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) return;
    fetchData();
  }, [user]);

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await API.delete(`/${type}/${id}`);
      setMsg(`${type.slice(0, -1)} deleted`);
      fetchData();
    } catch (err) {
      console.error(err);
      setMsg("Delete failed");
    }
  };

  const handleAdd = async (type, data) => {
    try {
      await API.post(`/${type}`, data);
      setMsg(`${type.slice(0, -1)} added successfully`);
      // reset form
      if (type === "flights") setNewFlight({ airline: "", from: "", to: "", price: "", departure: "", arrival: "", image: "" });
      if (type === "hotels") setNewHotel({ name: "", location: "", pricePerNight: "", image: "", description: "" });
      if (type === "packages") setNewPackage({ name: "", price: "", image: "", details: [] });
      if (type === "destinations") setNewDestination({ name: "", description: "", image: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      setMsg("Add failed");
    }
  };

  const renderTable = (items, type) => (
    <table border="1" style={{ marginBottom: "20px", width: "100%" }}>
      <thead>
        <tr>
          {Object.keys(items[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {Object.keys(item).map((key) => (
              <td key={key}>{typeof item[key] === "object" ? JSON.stringify(item[key]) : item[key]}</td>
            ))}
            <td>
              <button onClick={() => handleDelete(type, item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (!user?.isAdmin) return <p>Access Denied. Admins only.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      {msg && <p>{msg}</p>}

      {/* Flights */}
      <h3>Flights</h3>
      <div style={{ marginBottom: "10px" }}>
        <input placeholder="Airline" value={newFlight.airline} onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })} />
        <input placeholder="From" value={newFlight.from} onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })} />
        <input placeholder="To" value={newFlight.to} onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })} />
        <input placeholder="Price" value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} />
        <input placeholder="Departure" value={newFlight.departure} onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })} />
        <input placeholder="Arrival" value={newFlight.arrival} onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })} />
        <input placeholder="Image URL" value={newFlight.image} onChange={(e) => setNewFlight({ ...newFlight, image: e.target.value })} />
        <button onClick={() => handleAdd("flights", newFlight)}>Add Flight</button>
      </div>
      {flights.length > 0 ? renderTable(flights, "flights") : <p>No flights available</p>}

      {/* Hotels */}
      <h3>Hotels</h3>
      <div style={{ marginBottom: "10px" }}>
        <input placeholder="Name" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} />
        <input placeholder="Location" value={newHotel.location} onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })} />
        <input placeholder="Price per night" value={newHotel.pricePerNight} onChange={(e) => setNewHotel({ ...newHotel, pricePerNight: e.target.value })} />
        <input placeholder="Image URL" value={newHotel.image} onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })} />
        <input placeholder="Description" value={newHotel.description} onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })} />
        <button onClick={() => handleAdd("hotels", newHotel)}>Add Hotel</button>
      </div>
      {hotels.length > 0 ? renderTable(hotels, "hotels") : <p>No hotels available</p>}

      {/* Packages */}
      <h3>Packages</h3>
      <div style={{ marginBottom: "10px" }}>
        <input placeholder="Name" value={newPackage.name} onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} />
        <input placeholder="Price" value={newPackage.price} onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })} />
        <input placeholder="Image URL" value={newPackage.image} onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })} />
        <input placeholder="Details (comma separated)" value={newPackage.details} onChange={(e) => setNewPackage({ ...newPackage, details: e.target.value.split(",") })} />
        <button onClick={() => handleAdd("packages", newPackage)}>Add Package</button>
      </div>
      {packages.length > 0 ? renderTable(packages, "packages") : <p>No packages available</p>}

      {/* Destinations */}
      <h3>Destinations</h3>
      <div style={{ marginBottom: "10px" }}>
        <input placeholder="Name" value={newDestination.name} onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })} />
        <input placeholder="Description" value={newDestination.description} onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })} />
        <input placeholder="Image URL" value={newDestination.image} onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })} />
        <button onClick={() => handleAdd("destinations", newDestination)}>Add Destination</button>
      </div>
      {destinations.length > 0 ? renderTable(destinations, "destinations") : <p>No destinations available</p>}
    </div>
  );
}
