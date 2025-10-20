import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new hotel
router.post("/", async (req, res) => {
  const { name, location, pricePerNight, image, description } = req.body;
  try {
    const newHotel = await Hotel.create({ name, location, pricePerNight, image, description });
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
