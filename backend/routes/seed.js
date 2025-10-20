import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

router.get("/flights", async (req, res) => {
  const sampleFlights = [
    {
      airline: "IndiGo",
      from: "Mumbai",
      to: "Delhi",
      price: 4500,
      departure: "2025-10-21T09:00:00",
      arrival: "2025-10-21T11:00:00",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/IndiGo_logo.png",
    },
    {
      airline: "Air India",
      from: "Bangalore",
      to: "Kolkata",
      price: 5500,
      departure: "2025-10-22T14:00:00",
      arrival: "2025-10-22T18:00:00",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Air_India_Logo.svg",
    },
  ];

  await Flight.deleteMany({});
  const createdFlights = await Flight.insertMany(sampleFlights);
  res.send(createdFlights);
});

export default router;
