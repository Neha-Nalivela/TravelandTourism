import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

// Get all flights
router.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new flight
router.post("/", async (req, res) => {
  const { airline, from, to, price, departure, arrival, image } = req.body;
  try {
    const newFlight = await Flight.create({ airline, from, to, price, departure, arrival, image });
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
