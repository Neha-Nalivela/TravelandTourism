import React, { useState, useEffect, useContext } from "react";
import API from "./api";
import { AppContext } from "../App";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState("flights");
  const [formData, setFormData] = useState({});
  const [dataList, setDataList] = useState([]);
  const [msg, setMsg] = useState("");

  // Fetch data when admin and section changes
  useEffect(() => {
    if (user?.isAdmin) fetchData();
  }, [activeSection, user]);

  // Fetch all items for current section
  const fetchData = async () => {
    try {
      const { data } = await API.get(`/${activeSection}`); // ✅ fixed URL
      setDataList(data);
      setMsg("");
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setMsg("Failed to fetch data. Please check the backend.");
      setDataList([]);
    }
  };

  // Add new item
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let payload = { ...formData };

      // Convert string to proper types for flights
      if (activeSection === "flights") {
        payload.departure = new Date(payload.departure);
        payload.arrival = new Date(payload.arrival);
        payload.price = Number(payload.price);
        if (!payload.totalSeats) payload.totalSeats = 100; // default seats
      }

      // Convert number fields for hotels/packages
      if (activeSection === "hotels" && payload.pricePerNight)
        payload.pricePerNight = Number(payload.pricePerNight);
      if (activeSection === "packages" && payload.price)
        payload.price = Number(payload.price);

      if (!payload.image)
        payload.image = "https://via.placeholder.com/150?text=No+Image";

      await API.post(`/${activeSection}`, payload); // ✅ fixed URL
      setMsg(`${activeSection.slice(0, -1)} added successfully!`);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error("❌ Error adding item:", error);
      setMsg("Failed to add item. Check backend fields.");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await API.delete(`/${activeSection}/${id}`); // ✅ fixed URL
      setMsg("Item deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("❌ Error deleting item:", error);
      setMsg("Failed to delete item.");
    }
  };

  // Render form fields based on section
  const renderForm = () => {
    switch (activeSection) {
      case "flights":
        return (
          <>
            <input placeholder="Airline" value={formData.airline || ""} onChange={(e) => setFormData({ ...formData, airline: e.target.value })} required />
            <input placeholder="From" value={formData.from || ""} onChange={(e) => setFormData({ ...formData, from: e.target.value })} required />
            <input placeholder="To" value={formData.to || ""} onChange={(e) => setFormData({ ...formData, to: e.target.value })} required />
            <input type="datetime-local" placeholder="Departure" value={formData.departure || ""} onChange={(e) => setFormData({ ...formData, departure: e.target.value })} required />
            <input type="datetime-local" placeholder="Arrival" value={formData.arrival || ""} onChange={(e) => setFormData({ ...formData, arrival: e.target.value })} required />
            <input type="number" placeholder="Price" value={formData.price || ""} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            <input type="number" placeholder="Total Seats" value={formData.totalSeats || ""} onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })} />
            <input placeholder="Image URL" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </>
        );

      case "hotels":
        return (
          <>
            <input placeholder="Hotel Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input placeholder="Location" value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
            <input type="number" placeholder="Price per Night" value={formData.pricePerNight || ""} onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })} required />
            <input placeholder="Description" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <input placeholder="Image URL" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </>
        );

      case "packages":
        return (
          <>
            <input placeholder="Package Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="number" placeholder="Price" value={formData.price || ""} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            <input placeholder="Details (comma separated)" value={formData.details ? formData.details.join(",") : ""} onChange={(e) => setFormData({ ...formData, details: e.target.value.split(",") })} />
            <input placeholder="Image URL" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </>
        );

      case "destinations":
        return (
          <>
            <input placeholder="Destination Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input placeholder="Image URL" value={formData.image || ""} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </>
        );

      default:
        return null;
    }
  };

  if (!user?.isAdmin) return <p>Access Denied. Admins only.</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {msg && <p className="message">{msg}</p>}

      {/* Tabs */}
      <div className="admin-tabs">
        {["flights", "hotels", "packages", "destinations"].map((section) => (
          <button key={section} onClick={() => { setActiveSection(section); setFormData({}); }} className={activeSection === section ? "active" : ""}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="admin-form">
        {renderForm()}
        <button type="submit">Add {activeSection.slice(0, -1)}</button>
      </form>

      {/* Table Display */}
      <h3>Existing {activeSection}</h3>
      {dataList.length === 0 ? (
        <p>No items available</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              {Object.keys(dataList[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item._id}>
                {Object.keys(item).map((key) => (
                  <td key={key}>{typeof item[key] === "object" ? JSON.stringify(item[key]) : item[key]}</td>
                ))}
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
