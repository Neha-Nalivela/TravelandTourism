import express from "express";
import Hotel from "../models/Hotel.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET all hotels (anyone logged in or even public if you remove protect)
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD new hotel (admin only)
router.post("/", protect, admin, async (req, res) => {
  const { name, location, pricePerNight, image, description } = req.body;
  try {
    const newHotel = await Hotel.create({ name, location, pricePerNight, image, description });
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE hotel by ID (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    await hotel.remove();
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
