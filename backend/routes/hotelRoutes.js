import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
