import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

// Attach token automatically if logged in
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("user"); // <-- must match App.jsx storage
  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
