//backend/models/hotelRoutes.js
import express from "express";
import Hotel from "../models/Hotel.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new hotel (Admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE hotel by ID (Admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
